import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';

import { TrainingService } from './../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {
  progress = 0;
  timer: any;
  dialogRef: MatDialogRef<StopTrainingComponent>;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) {}

  killTimer() {
    this.timer = null;
    this.progress = 0;
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  onBack() {
    this.trainingService.finishedExercise();
  }

  onStop() {
    clearInterval(this.timer);
    this.dialogRef = this.dialog.open(StopTrainingComponent, {
      data: { progress: this.progress }
    });
    this.dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress);
        this.killTimer();
      } else if (!result) {
        this.startOrResumeTimer();
      }
    });
  }

  startOrResumeTimer() {
    const step =
      (this.trainingService.getRunningExercise().duration / 100) * 1000;
    this.timer = setInterval(() => {
      this.progress += 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer);
      }
    }, step);
  }
}
