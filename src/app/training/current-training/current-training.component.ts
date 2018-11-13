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
  dialogRef: MatDialogRef<StopTrainingComponent>;

  constructor(private dialog: MatDialog) {}

  killTimer() {
    this.timer = null;
    this.progress = 0;
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  onStop() {
    clearInterval(this.timer);
    this.dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.stopTraining.emit();
        this.killTimer();
      } else if (!result) {
        this.startOrResumeTimer();
      }
    });
  }

  startOrResumeTimer() {
    this.timer = setInterval(() => {
      this.progress += 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }
}
