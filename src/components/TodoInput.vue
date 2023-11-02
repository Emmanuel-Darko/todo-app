<template>
    <section>
        <input 
            type="text" 
            v-model="task"
            ref="text"
            :placeholder=" isEditing ? 'editing task' : totalTodos == 0 ? 'write your first task' : 'write your next task' "
            @keydown.space.prevent 
        />
        <button @click="addTaskLocal(task)">
            {{ isEditing ? '🖊' : '+' }}
        </button>
    </section>
</template>
<script>
    export default {
        props: ['addTask', 'value', 'totalTodos'],
        data() {
            return {
                task: '',
                isEditing: false
            };
        },
        watch: {
            value(newValue, oldValue){
                if(Object.keys(this.value).length !== 0){
                    this.isEditing = true
                    if(newValue !== oldValue){
                        this.task = this.value.name
                        this.$refs.text.focus()
                    } 
                } else {
                    this.task = ''
                    this.isEditing = false
                }
            }
        },
        methods: {
            addTaskLocal(task){
                let localTask = task.replace(/\s/g, '')
                if(localTask){
                    this.addTask(task)
                    this.task = ''
                } else {
                    alert('Input field is empty!')
                    this.task = ''
                }
            }
        }
    }
</script>
<style scoped>
    section{
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
    }
    input{
        outline: #CEBEA4;
        width: 100%;
        align-self: stretch;
        font-size: 25px;
        background-color: #1E1E1E;
        border-radius: 30px;
        padding: 20px;
        color: #CEBEA4;
    }
    button{
        outline: none;
        border: none;
        padding: 30px;
        border-radius: 50%;
        width: 30px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: #FF5631;
        color: #000;
        font-size: 30px;
        font-weight: bold;
        cursor: pointer;
    }
</style>