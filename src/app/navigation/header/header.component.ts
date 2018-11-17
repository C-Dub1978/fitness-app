import {
  Component,
  OnDestroy,
  OnInit,
  Output,
  EventEmitter
} from '@angular/core';

import { AuthService } from './../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnDestroy, OnInit {
  isAuth = false;
  @Output()
  sidenavToggle = new EventEmitter<void>();
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

  onLogout() {
    this.isAuth = false;
    this.authService.logout();
  }

  onToggleSidenav() {
    this.sidenavToggle.emit();
  }
}
