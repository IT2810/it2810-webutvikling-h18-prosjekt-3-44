import { Pedometer } from 'expo';
import Database from './Database.js';

export default class StepCounter {

  constructor(callback){
    this.callback = callback;
    this.lastStep = 0;
  }
  
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

  updateSteps = (steps) => {
    Database.getAllItems().then((fetchedItems) => {
      fetchedItems.forEach((item) => {
        let newSteps = item.stepTaken + steps - this.lastStep;
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

