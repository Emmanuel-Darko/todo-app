<template>
    <div class="bar" :class="{showDoing, showEditing, sidebar, stoppage}">
        <div @click="handleCheck(todo.id, todo.completed)" class="check" :class="{'check-active': todo?.completed}"></div>
        <div class="task" :class="{'strike': todo?.completed}">{{ todo?.name }}</div>
        <div class="actions">
            <button v-if="!sidebar" @click="handleDoing(todo.id)" class="blink"><span>⏳</span></button>
            <button v-if="!sidebar" @click="handleEdit(todo.id)">✍</button>
            <button v-if="sidebar" @click="removeTask()">❌</button>
            <button v-else @click="handleDelete(todo.id)">❌</button>
        </div>
    </div>
</template>
<script>
    import {mapState, mapActions} from 'pinia'
    import {useTodoStore} from '@/stores/todoStates'
    export default {
        props: ['todo', 'handleEdit', 'handleDelete', 'handleDoing', 'editingItem', 'index', 'sidebar', 'stoppage'],
        data() {
            return {
                checked: false,
                showEditing: false,
                showDoing: false
            };
        },
        computed: {
            ...mapState(useTodoStore, ['currentTask'])
        },
        created(){
            this.checked = this.todo?.completed
        },
        watch: {
            //watch current item being edited by comparing the value of the saved editingItem details with the current item's id
            editingItem(newValue, oldValue) {
                if(newValue !== oldValue) {
                    // if id is the same, show a red border on the item being edited
                    if(this.editingItem.id == this.todo.id) {
                        this.showEditing = true
                    } else {
                        this.showEditing = false
                    }
                }
            },

            currentTask(newValue, oldValue) {
                if(newValue !== oldValue) {
                    if(this.currentTask.id == this.todo.id) {
                        this.showDoing = true
                    } else {
                        this.showDoing = false
                    }
                }
            }
        },
        methods: {
            ...mapActions(useTodoStore, ['handleCheck', 'setCurrentTask']),
            // toggle function to check and uncheck items done 
            async handleCheckLocal() {
                await Promise.resolve(this.checked = !this.checked)
                .then(() => {
                    this.handleCheck(this.todo.id, this.checked)
                })
            },
            removeTask(){
                if(confirm('Remove task from doing')){
                    this.setCurrentTask(this.currentTask)
                }
            }
        },
    }
</script>

<style scoped>
    .bar {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 10px;
        padding: 20px;
        background-color: #1E1E1E;
        color: #CEBEA4;
        border: 1px solid #CEBEA4;
        outline: none;
        border-radius: 10px;
        position: relative;
    }
    .bar div{
        position: relative;
    }
    .showEditing {
        border: 2px solid #FF5631 !important;
    }
    .showDoing {
        border: 2px solid green;
        animation: doing 3s infinite ease-in-out;
    }
    @keyframes doing {
        0% {border-color: #CEBEA4;}
        50% {border-color: green;}
        100% {border-color: #CEBEA4}
    }
    .showDoing .actions button:first-child,
    .sidebar .actions button.blink {
        background-color: #57CB4C;
        border:none
    }
    .showDoing .actions button:first-child span, 
    .sidebar .actions button:first-child span {
        animation: moving 3s infinite ease-in-out;
    }
    @keyframes moving {
        0% {opacity: 0;}
        50% {opacity: 0.5}
        100% {opacity: 1}
    }
    .sidebar{
        /* background: #fff; */
        border: 2px solid #FF5631;
        animation: doing-side 3s infinite ease-in-out;
    }
    @keyframes doing-side {
        0% {border-color: #FF5631;}
        50% {border-color: green;}
        100% {border-color: #FF5631}
    }
    .sidebar.stoppage{
        background: red;
        color:#fff
    }
    .sidebar.stoppage .check{
        border: 1px solid #fff
    }
    .check{
        padding: 20px;
        border-radius: 50%;
        border: 1px solid #FF5631;
        cursor: pointer;        
    }
    .check-active{
        background-color: #57CB4C;
        border: none;
    }
    .task {
        width: 100%;
        font-size: 25px;
        flex-wrap: wrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    .strike {
        text-decoration: line-through;
        text-decoration-thickness: 3px;
        /* text-decoration-color: #57CB4C; */
    }
    .actions {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 5px;
    }
    .actions button {
        width: 100%;
        border: none;
        outline: none;
        border-radius: 10px;
        background-color: #fff;
        padding: 10px;
        cursor: pointer;
        border: 1px solid #FF5631;
    }
    .actions button:first-child{
        /* border: 2px solid green; */
    }
    .actions button:last-child .side{
        width: 100%;
    }

    @media screen and (max-width: 480px){
        .bar{
            padding: 10px;
        }
    }
</style>