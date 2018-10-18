import { Pedometer } from 'expo'

export default class StepCounter {
  
  subscribe = () => {
    this._subscription = Pedometer.watchStepCount(result => {
      if (result.steps === parseInt(result.steps, 10)) {
        this.setState({
          stepsSinceLastUpdate: result.steps - this.state.stepsSinceLastUpdate
        });
      }
    });
  };

  unsubscribe = () => {
    this._subscription && this._subscription.remove();
    this._subscription = null;
  };

  updateSteps = (result) => {
    var stepcount = this.state.stepsSinceLastUpdate;
    let stepTaken = stepcount + item.stepTaken;
    if (item.stepGoal <= stepTaken) {
      item.stepTaken = item.stepGoal;
    } else {
      item.stepTaken = stepTaken;
    }

    AsyncStorage.mergeItem(item.id, JSON.stringify({stepTaken: item.stepTaken}));
  }

}

