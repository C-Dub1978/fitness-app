import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import * as fromRoot from '../app.reducer';
import * as Auth from '../auth/auth.actions';
import * as UI from '../shared/ui.actions';
import { AngularFireAuth } from 'angularfire2/auth';

import { AuthData } from './auth-data.model';
import { TrainingService } from '../training/training.service';
import { UIService } from './../shared/ui.service';

@Injectable()
export class AuthService {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private trainingService: TrainingService,
    private uiService: UIService,
    private store: Store<fromRoot.State>
  ) {}

  initAuthListener() {
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.store.dispatch(new Auth.SetAuthenticated());
        this.router.navigate(['/training']);
      } else {
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.trainingService.cancelSubscriptions();
        this.router.navigate(['']);
      }
    });
  }

  registerUser(authData: AuthData) {
    // this.uiService.loadingStateChanged.next(true);
    /** Here we start with NgRx, when we are loading during login events,
     * we dispatch a state event to the reducer*/
    // An action to dispatch is always an object with a 'type' property,
    // who's value is the action type to dispatch
    // don't forget to subscribe to this dispatch action somewhere, here it's
    // in the login component
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .createUserWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        // An action to dispatch is always an object with a 'type' property,
        // who's value is the action type to dispatch
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  login(authData: AuthData) {
    this.store.dispatch(new UI.StartLoading());
    this.afAuth.auth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then(result => {
        // this.uiService.loadingStateChanged.next(false);
        // An action to dispatch is always an object with a 'type' property,
        // who's value is the action type to dispatch
        this.store.dispatch(new UI.StopLoading());
      })
      .catch(error => {
        // this.uiService.loadingStateChanged.next(false);
        // An action to dispatch is always an object with a 'type' property,
        // who's value is the action type to dispatch
        this.store.dispatch(new UI.StopLoading());
        this.store.dispatch(new Auth.SetUnauthenticated());
        this.uiService.showSnackBar(error.message, null, 3000);
      });
  }

  logout() {
    this.afAuth.auth.signOut();
  }
}
