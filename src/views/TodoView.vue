<template>
    <section class="container">
        <TodoBanner :totalTodos="totalTodos" :completedTodos="completedTodos"/>
        <TodoInput :addTask="addTask" :value="editingItem" :totalTodos="totalTodos"/>
        
        <TransitionGroup name="list">
            <TaskBar 
                v-for="(todo, index) in allTodos" 
                :key="index"
                :index="index"
                :todo="todo"
                :editingItem="editingItem"
                :handleEdit="handleEdit"
                :handleDelete="handleDelete"
                :handleDoing="handleDoing"
            />
        </TransitionGroup>
        <img v-if="allTodos.length==0" class="scroll" src="/img/scroll.png" alt="scroll">
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
            ...mapState(useTodoStore, ['allTodos', 'currentTask']),
            totalTodos() {
                return this.allTodos?.length || 0;
            },
            completedTodos() {
                let completed = this.allTodos?.filter((todo) => todo?.completed == true)
                return completed?.length || 0;
            }
        },
        created(){
            this.fetchTodos()
            .then(() => {
                this.todos = this.allTodos
            })
        },
        methods: {
            ...mapActions(useTodoStore, ['fetchTodos', 'setTodos', 'setCurrentTask', 'saveLocalStorage']),
            addTask(incomingTask){
                if(incomingTask) {
                    // if editing task
                    if(this.editing) {
                        let savedTasks = this.allTodos
                        savedTasks = savedTasks.map((task) => {
                            if(task.id == this.editingItem.id){
                                return {...task, name: incomingTask}
                            }
                            return task
                        })
                        this.setTodos(savedTasks)
                        this.saveLocalStorage(savedTasks)

                    } else {
                        // if saving task
                        let taskId = Math.floor(Math.random() * 10000000000000)
                        let newTask = {
                            id: taskId,
                            name: incomingTask,
                            completed: false,
                            time: Date.now()
                        }

                        let savedTasks = [newTask, ...this.allTodos]
                        this.setTodos(savedTasks)
                        this.saveLocalStorage(savedTasks)
                    }
                }
                // set editing to default
                this.editing = false
                this.editingItem = {}
            },

            handleEdit(id) {
                // set current editing item to editingItem object
                let foundItem = this.allTodos.find((todo) => todo.id == id)
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
                    let savedTasks = this.allTodos
                    savedTasks = savedTasks?.filter((task) => task.id !== id)
                    this.setTodos(savedTasks)

                    // clear the currently editing item if it's deleted
                    if(this.editingItem.id == id) {
                        this.editingItem = {}
                        this.editing = false
                    }
                }
            },

            handleDoing(id) {
                let doing = this.allTodos.find((todo) => todo.id == id)
                if(this.currentTask.id == id){
                    if(confirm('Remove task from doing')){
                        this.doing = false
                        this.setCurrentTask(doing)
                    }
                } else{
                    this.doing = true
                    this.setCurrentTask(doing)
                    this.$emit('toggleSide')
                }
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
        min-height: 70dvh;
        /* border: 1px solid red; */
    }
    .scroll {
        position: absolute;
        width: 30%;
        top: 70%
    }

    /* transitions */
    .list-enter-active,
    .list-leave-active {
        transition: all 0.5s ease;
    }
    .list-enter-from,
    .list-leave-to {
        opacity: 0;
        transform: translateX(30px);
    }
</style>