<template>
  <div>
    <header>
      <h1>Todo - Solution</h1>
      <input placeholder="what needs to be done?" v-model="newTask" @keyup.enter="addTask" />
    </header>

    <div>
      <ul>
        <li v-for="task in tasks" :key="task.id" :class="{ 'is-done': task.done}">
          <input type="checkbox" v-model="task.done" @click="task.done = !task.done; editTask(task)" />
          <span v-if="!task.isEditing" @click="task.isEditing = !task.isEditing">{{task.text}}</span>
          <input
            type="text"
            v-model="task.text"
            v-if="task.isEditing"
            @keyup.enter="task.isEditing = !task.isEditing; editTask(task)"
          />
        </li>
      </ul>
    </div>
  </div>
</template>



<script>
import * as db from "firebase/database";
import * as firebase from "firebase/app";

export default {
  data() {
    return {
      newTask: "",
      tasks: [],
      firestore: firebase.firestore()
    };
  },
  mounted() {
    this.fetchData();
  },

  methods: {
    fetchData() {
      let tasks = this.firestore
        .collection("tasks")
        .get()
        .then(snapshot => {
          snapshot.forEach(doc => {
            const rest = doc.data();
            this.tasks.push({
              id: doc.id,
              text: rest.text,
              done: rest.done,
              isEditing: rest.isEditing
            });
          });
        });
    },
    addTask() {
      let task = {
        text: this.newTask,
        done: false,
        isEditing: false
      };
      this.firestore
        .collection("tasks")
        .add(task)
        .then(doc => {
          this.tasks.push(task);
        });
      this.newTask = "";
    },
    editTask(task) {
      this.firestore
        .collection("tasks")
        .doc(task.id)
        .set(task)
    },
  }
};
</script>



<style scoped>
.is-done {
  text-decoration: line-through;
}
</style>