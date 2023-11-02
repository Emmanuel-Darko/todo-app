<template>
    <section class="container">
        <TodoBanner :totalTodos="totalTodos" :completedTodos="completedTodos"/>
        <TodoInput :addTask="addTask" :value="editingItem" :totalTodos="totalTodos"/>
        <TaskBar 
            v-for="(todo, index) in todos" 
            :key="index"
            :index="index"
            :todo="todo"
            :editingItem="editingItem" 
            :handleCheck="handleCheck" 
            :handleEdit="handleEdit"
            :handleDelete="handleDelete"
            :handleDoing="handleDoing"
        />
    </section>
</template>
<script>
    import {mapActions, mapState} from 'pinia'
    import {useTodoStore} from '@/stores/todoStates'
    import TodoBanner from '@/components/TodoBanner.vue'
    import TodoInput from '@/components/TodoInput.vue'
    import TaskBar from '@/components/TaskBar.vue'

    export default {
        components: {
            TodoBanner,
            TodoInput,
            TaskBar
        },
        data() {
            return{
               todos:[],
               editing: false,
               doing: false,
               editingItem: {}
            }
        },
        computed:{
            totalTodos() {
                return this.todos?.length || 0;
            },
            completedTodos() {
                let completed = this.todos?.filter((todo) => todo.completed == true)
                return completed?.length || 0;
            },
            ...mapState(useTodoStore, ['currentTask'])
        },
        created(){
            this.todos = JSON.parse(localStorage.getItem("todos")) || []
        },  
        methods: {
            ...mapActions(useTodoStore, ['setCurrentTask']),
            saveLocalStorage(data) {
                localStorage.setItem("todos", JSON.stringify(data))
            },

            addTask(incomingTask){
                if(incomingTask) {
                    // if editing task
                    if(this.editing) {
                        let savedTasks = JSON.parse(localStorage.getItem("todos")) || []
                        savedTasks = savedTasks.map((task) => {
                            if(task.id == this.editingItem.id){
                                return {...task, name: incomingTask}
                            }
                            return task
                        })
                        this.todos = savedTasks
                        localStorage.setItem("todos", JSON.stringify(savedTasks))

                    } else {
                        // if saving task
                        let taskId = Math.floor(Math.random() * 10000000000000)
                        let newTask = {
                            id: taskId,
                            name: incomingTask,
                            completed: false,
                            time: Date.now()
                        }

                        let savedTasks = [newTask, ...JSON.parse(localStorage.getItem("todos")) || []]
                        this.todos = savedTasks;
                        localStorage.setItem("todos", JSON.stringify(savedTasks))
                    }
                }
                // set editing to default
                this.editing = false
                this.editingItem = {}
            },

            handleCheck(id, status) {
                // take the checked items id and current status(to be changed)
                let checkedIndex;
                this.todos = this.todos.map((todo, index) => {
                    if(todo.id == id) {
                        checkedIndex = index
                        return { ...todo, completed: !status }
                    }
                    return todo;
                })
                
                // shuffle recently checked and unchecked items
                let temp = this.todos.splice(checkedIndex, 1)[0]
                const findLastCheckedItem = this.todos.findIndex((todo) => todo.completed == true)

                // if a last checked item is found
                if(findLastCheckedItem !== -1){
                    // insert the item in question to the index of last checked item
                    this.todos.splice(findLastCheckedItem, 0, temp)
                    return this.saveLocalStorage(this.todos) 
                }
                // if no checked item is found
                else{
                    // item to be checked is pushed to the last
                    if(status == !true){
                        this.todos.push(temp)
                        return this.saveLocalStorage(this.todos) 
                    }
                    else {
                        // item to be unchecked is maintained at the current index
                        this.todos.splice(checkedIndex, 0, temp)
                        return this.saveLocalStorage(this.todos)
                    }
                }
            },

            handleEdit(id) {
                // set current editing item to editingItem object
                let foundItem = this.todos.find((todo) => todo.id == id)
                if(foundItem && this.editingItem.id !== id){
                    this.editingItem = foundItem
                    this.editing = true
                } else {
                    // if the same item is clicked twice, unset and clear the editingItem
                    this.editingItem = {}
                    this.editing = false
                }
            },

            handleDelete(id){
                if(confirm("Are you sure of this DELETE action?")) {
                    let savedTasks = JSON.parse(localStorage.getItem("todos")) || []
                    savedTasks = savedTasks?.filter((task) => task.id !== id)
                    localStorage.setItem("todos", JSON.stringify(savedTasks))
                    this.todos = savedTasks;

                    // clear the currently editing item if it's deleted
                    if(this.editingItem.id == id) {
                        this.editingItem = {}
                        this.editing = false
                    }
                }
            },

            handleDoing(id) {
                let doing = this.todos.find((todo) => todo.id == id)
                console.log(doing, this.currentTask)
                if(doing){
                    this.doing = true
                    this.setCurrentTask(doing)
                } else{
                    alert(doing)
                    this.doing = false
                    this.setCurrentTask({})
                }
                this.$emit('toggleSide')
            }
        },
        
    }
</script>
<style scoped>
    .container{
        width: 100%;
        position: relative;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 50px;
        height: 100%;
        /* border: 1px solid red; */
    }

    /* @media screen and (max-width: 480px){

    } */
</style>