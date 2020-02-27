<template>
    <div>
        <header>
            <h1>Todo</h1>
            <input placeholder="what needs to be done?" v-model="newTask" @keyup.enter="addTask($event)"/>
        </header>

        <div>
            <ul>
                <li 
                    v-for="task in tasks"
                    v-bind:key="task.id"
                    :class="{ 'is-done': task.done}"
                >
                    <input type="checkbox" v-model="task.done"/>
                    {{ task.text }}
                </li>
            </ul>
        </div>
    </div>
</template>



<script>
export default {
    data() {
        return {
            newTask: '',
            tasks: [
                {
                    text: "Learn Vue",
                    done: false
                },
                {
                    text: "Become a Software Engineer",
                    done: false
                }
            ]
        }  
    },
    
    methods: {
        addTask(event) {
            event.preventDefault();
            this.tasks.push({text: this.newTask, done: false})
            this.newTask = ''
        },
    }
    
}
</script>



<style scoped>
.is-done {
    text-decoration: line-through
}
</style>