import { Component, EventEmitter, Output, OnInit } from '@angular/core';

import { Exercise } from './../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrls: ['./new-training.component.scss']
})
export class NewTrainingComponent implements OnInit {
  exercises: Exercise[];
  @Output()
  trainingStart = new EventEmitter<void>();

  constructor(private trainingService: TrainingService) {}

  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
  }

  onStartTraining() {
    this.trainingStart.emit();
  }
}
