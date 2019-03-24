import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { Store } from '@ngrx/store';

import { take } from 'rxjs/operators';

import * as fromTraining from '../training.reducer';
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
    private trainingService: TrainingService,
    private store: Store<fromTraining.State>
  ) {}

  killTimer() {
    this.timer = null;
    this.progress = 0;
  }

  ngOnInit() {
    this.startOrResumeTimer();
  }

  onBack() {
    this.trainingService.completeExercise();
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
    this.store
      .select(fromTraining.getActiveTraining)
      .pipe(take(1))
      .subscribe(ex => {
        const step = (ex.duration / 100) * 1000;
        this.timer = setInterval(() => {
          this.progress += 1;
          if (this.progress >= 100) {
            this.trainingService.completeExercise();
            clearInterval(this.timer);
          }
        }, step);
      });
  }
}
