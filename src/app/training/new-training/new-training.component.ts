import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Subscription } from 'rxjs';

import { Exercise } from './../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnDestroy, OnInit {
  exercises: Exercise[];
  exercisesSubscription: Subscription;
  isLoading = true;

  constructor(private trainingService: TrainingService) {}

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        if (!exercises) {
          this.isLoading = true;
        } else {
          this.exercises = exercises;
          this.isLoading = false;
        }
      }
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
