import { Pedometer } from 'expo';
import Database from './Database.js';


// Handles the Expo Pedometer lib
// Keeps the TodoItem stepcounts updated
export default class StepCounter {

  constructor(callback){
    this.callback = callback;
    this.lastStep = 0;
  }
  
  // Subscribes to step count updates
  // Provides a callback function that keeps track of the steps
  subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if (result.steps === parseInt(result.steps, 10)) {
        this.updateSteps(result.steps);
      }
    });
  };

  unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  // Updates the step count for all the TodoItems
  // Calls the callback and updates the last step
  // if Database.getAllItems is successful  
  updateSteps = (steps) => {
    Database.getAllItems().then((fetchedItems) => {
      fetchedItems.forEach((item) => {
        let newSteps = item.stepTaken + steps - this.lastStep;
        // We don't want the step count to go over the step goal
        if (item.stepGoal <= newSteps) {
          item.stepTaken = item.stepGoal;
        } else {
          item.stepTaken = newSteps;
        }
        Database.mergeItem(item.id, JSON.stringify({stepTaken: item.stepTaken}));
      });
      this.lastStep = steps;
      this.callback();
    });
  }
}

