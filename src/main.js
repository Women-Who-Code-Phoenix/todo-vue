import Vue from 'vue';
import App from './App.vue';

import * as VueFire from 'vuefire';
import firebase from 'firebase';

Vue.use(VueFire);

const config = {
  apiKey: "{key}",
  authDomain: "todo-{id}.firebaseapp.com",
  databaseURL: "https://todo-{id}.firebaseio.com",
  projectId: "todo-{id}",
  storageBucket: "todo-{id}.appspot."
}

firebase.initializeApp(config);

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
