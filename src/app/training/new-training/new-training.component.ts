import { NgForm } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { Exercise } from './../exercise.model';
import { TrainingService } from '../training.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnDestroy, OnInit {
  exercises: Exercise[];
  exercisesSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnDestroy() {
    this.exercisesSubscription.unsubscribe();
  }

  ngOnInit() {
    this.trainingService.fetchAvailableExercises();
    this.exercisesSubscription = this.trainingService.exercisesChanged.subscribe(
      (exercises: Exercise[]) => {
        this.exercises = exercises;
      }
    );
  }

  onStartTraining(form: NgForm) {
    this.trainingService.startExercise(form.value.exercise);
  }
}
