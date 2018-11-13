import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  @Output()
  stopTraining = new EventEmitter<void>();
  progress = 0;
  timer: any;
  // dialogRef: MatDialogRef;

  constructor(private dialog: MatDialog) {}

  ngOnInit() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    this.dialog.open(StopTrainingComponent, {});
    // this.stopTraining.emit();
  }
}
