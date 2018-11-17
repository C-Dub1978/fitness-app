import { Exercise } from './exercise.model';

export class TrainingService {
  availableExercises: Exercise[] = [
    { id: 'crunches', name: 'Crunches', duration: 120, calories: 69 },
    { id: 'lunges', name: 'Lunges', duration: 75, calories: 60 },
    { id: 'burpees', name: 'Burpees', duration: 45, calories: 80 },
    { id: 'pull-ups', name: 'Pull-ups', duration: 30, calories: 50 }
  ];

  getAvailableExercises(): Exercise[] {
    return this.availableExercises.slice();
  }
}
