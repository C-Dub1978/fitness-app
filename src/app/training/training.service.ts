import { Injectable } from '@angular/core';

import * as UI from '../shared/ui.actions';
import * as fromTraining from './training.reducer';
import * as Training from './training.actions';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { Subject, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './exercise.model';
import { UIService } from 'src/app/shared/ui.service';

@Injectable()
export class TrainingService {
  private fbSub: Subscription[] = [];

  constructor(
    private db: AngularFirestore,
    private uiService: UIService,
    private store: Store<fromTraining.State>
  ) {}

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }

  completeExercise() {
    this.store.select(fromTraining.getActiveTraining).subscribe(ex => {
      this.addDataToDatabase({
        ...ex,
        date: new Date(),
        state: 'completed'
      });
    });
    this.store.dispatch(new Training.StopTraining());
  }

  cancelExercise(progress: number) {
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        this.addDataToDatabase({
          ...ex,
          calories: ex.calories * (progress / 100),
          duration: ex.duration * (progress / 100),
          date: new Date(),
          state: 'canceled'
        });
      });
    this.store.dispatch(new Training.StopTraining());
  }

  cancelSubscriptions() {
    this.fbSub.forEach(sub => sub.unsubscribe());
  }

  fetchAvailableExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSub.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map(docArray => {
            return docArray.map(doc => {
              return {
                id: doc.payload.doc.id,
                name: doc.payload.doc.data()['name'],
                duration: doc.payload.doc.data()['duration'],
                calories: doc.payload.doc.data()['calories']
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new UI.StopLoading());
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            this.uiService.showSnackBar(
              'Error fetching exercises....',
              null,
              3000
            );
          }
        )
    );
  }

  fetchCompletedOrCanceledExercises() {
    this.store.dispatch(new UI.StartLoading());
    this.fbSub.push(
      this.db
        .collection('finishedExercises')
        .valueChanges()
        .subscribe(
          (exercises: Exercise[]) => {
            this.store.dispatch(new Training.SetFinishedTrainings(exercises));
            this.store.dispatch(new UI.StopLoading());
          },
          error => {
            this.store.dispatch(new UI.StopLoading());
            console.log('error');
          }
        )
    );
  }

  startExercise(id: string) {
    this.store.dispatch(new Training.StartTraining(id));
  }
}
