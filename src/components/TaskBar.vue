<template>
    <div class="bar" :class="{showDoing, showEditing}">
        <div @click="handleCheck(todo.id, todo.completed)" class="check" :class="{'check-active': todo?.completed}"></div>
        <div class="task" :class="{'strike': todo?.completed}">{{ todo?.name }}</div>
        <div class="actions">
            <button @click="handleDoing(todo.id)"><span>⏳</span></button>
            <button @click="handleEdit(todo.id)">✍</button>
            <button @click="handleDelete(todo.id)">❌</button>
        </div>
    </div>
</template>
<script>
    import {mapState} from 'pinia'
    import {useTodoStore} from '@/stores/todoStates'
    export default {
        props: ['todo', 'handleCheck', 'handleEdit', 'handleDelete', 'handleDoing', 'editingItem', 'index'],
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
            // toggle function to check and uncheck items done 
            async handleCheckLocal() {
                await Promise.resolve(this.checked = !this.checked)
                .then(() => {
                    this.handleCheck(this.todo.id, this.checked)
                })
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
    .showDoing .actions button:first-child span {
        animation: moving 3s infinite ease-in-out;
    }
    @keyframes moving {
        0% {opacity: 0;}
        50% {opacity: 0.5}
        100% {opacity: 1}
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
        width: 50%;
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
    .actions button:last-child{
        /* border: 2px solid red; */
    }

    @media screen and (max-width: 480px){
        .bar{
            padding: 10px;
        }
    }
</style>