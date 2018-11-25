import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class TrainingService {
  private availableExercises: Exercise[];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();
  exercisesChanged = new Subject<Exercise[]>();
  finishedExercisesChanged = new Subject<Exercise[]>();

  constructor(private db: AngularFirestore) {}

  completeExercise() {
    this.addDataToDatabase({
      ...this.runningExercise,
      date: new Date(),
      state: 'completed'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  cancelExercise(progress: number) {
    this.addDataToDatabase({
      ...this.runningExercise,
      calories: this.runningExercise.calories * (progress / 100),
      duration: this.runningExercise.duration * (progress / 100),
      date: new Date(),
      state: 'canceled'
    });
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  fetchAvailableExercises() {
    this.db
      .collection('availableExercises')
      .snapshotChanges()
      .pipe(
        map(docArray => {
          return docArray.map(doc => {
            return {
              id: doc.payload.doc.id,
              name: doc.payload.doc.data().name,
              duration: doc.payload.doc.data().duration,
              calories: doc.payload.doc.data().calories
            };
          });
        })
      )
      .subscribe((exercises: Exercise[]) => {
        this.availableExercises = exercises;
        this.exercisesChanged.next([...this.availableExercises]);
      });
  }

  fetchCompletedOrCanceledExercises() {
    this.db
      .collection('finishedExercises')
      .valueChanges()
      .subscribe((exercises: Exercises[]) => {
        this.finishedExercisesChanged.next(exercises);
      });
  }

  getCompletedOrCanceledExercises() {
    return this.finishedExercises.slice();
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  startExercise(id: string) {
    this.runningExercise = this.availableExercises.find(ex => ex.id === id);
    this.exerciseChanged.next({ ...this.runningExercise });
  }

  finishedExercise() {
    this.runningExercise = null;
    this.exerciseChanged.next(null);
  }

  private addDataToDatabase(exercise: Exercise) {
    this.db.collection('finishedExercises').add(exercise);
  }
}
