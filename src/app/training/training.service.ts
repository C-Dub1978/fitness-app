import { Exercise } from './exercise.model';
import { Subject } from 'rxjs';

export class TrainingService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 120, calories: 69 },
    { id: 'lunges', name: 'Lunges', duration: 75, calories: 60 },
    { id: 'burpees', name: 'Burpees', duration: 45, calories: 80 },
    { id: 'pull-ups', name: 'Pull-ups', duration: 30, calories: 50 }
  ];
  private runningExercise: Exercise;
  exerciseChanged = new Subject<Exercise>();

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
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
}
