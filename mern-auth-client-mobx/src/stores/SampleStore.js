import { observable, computed, action, decorate } from "mobx";

class SampleStore {
  counter = 0
  start = new Date()

  get elapsedTime() {
    return this.current - this.start + "milliseconds";
  }

  increment() {
    this.counter++;
    return this.counter;
  }

  decrement() {
    this.counter--;
    return this.counter;
  }
}

decorate(SampleStore, {
  counter: observable,
  elapsedTime: computed,
  increment: action.bound,
  decrement: action.bound,
});

export default SampleStore;
