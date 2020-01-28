// https://medium.com/@mweststrate/mobx-4-better-simpler-faster-smaller-c1fbc08008da

import SampleStore from './SampleStore';
import UserStore from './UserStore';


export default {
  sampleStore: new SampleStore(),
  userStore: new UserStore(),
};
