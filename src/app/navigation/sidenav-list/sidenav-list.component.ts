import { AuthService } from './../../auth/auth.service';
import {
  Component,
  OnDestroy,
  OnInit,
  EventEmitter,
  Output
} from '@angular/core';

import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnDestroy, OnInit {
  isAuth = false;
  @Output()
  closeSidenav = new EventEmitter<void>();
  subscription: Subscription;

  constructor(private authService: AuthService) {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {
    this.subscription = this.authService.authChange.subscribe(authStatus => {
      this.isAuth = authStatus;
    });
  }

  onClose() {
    this.closeSidenav.emit();
  }

  onLogout() {
    this.closeSidenav.emit();
    this.authService.logout();
  }
}
