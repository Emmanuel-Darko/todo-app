<template>
    <div class="container">
        <span @click="toggleSide()" class="close" type="button">x</span>
        <h1 class="clock">⏰</h1>
        <h1>Countdown Timer </h1>
        <h1 class="timer">
            <input type="number" :value="timer.hrs" min="0" /> : 
            <input 
                type="number" 
                :value="timer.min" 
                min="0" 
                max="59"
                oninput=""
                @change="(e)=>increase(e)" 
            /> : 
            <input type="number" :value="timer.sec" min="0" max="59" disabled/>
        </h1>
        <div class="action-btns">
            <button @click="decrease()">-</button>
            <button @click="start()">▶</button>
            <button @click="increase()">+</button>
        </div>
        <section class="current">
            <h2>Current Task</h2>
            {{ currentTask.name }}
        </section>
        
    </div>
</template>
<script>
    import {mapState} from 'pinia'
    import {useTodoStore} from '@/stores/todoStates'
    export default {
        props: ['toggleSide'],
        data(){
            return{
                timer: {
                    hrs: '00',
                    min: '00',
                    sec: '00'
                }
            }
        },
        computed: {
            ...mapState(useTodoStore, ['currentTask'])
        },
        methods: {
            increase(event){
                if(event){
                    this.timer.min = event.target.value
                } else {
                    if(this.timer.min == 59){
                        this.timer.min = '00'
                        this.timer.hrs = parseInt(this.timer.hrs) + 1
                    } else {
                        this.timer.min = parseInt(this.timer.min) + 1
                    }
                }
            },
            decrease(){
                this.timer.min == 0 ? 0 : this.timer.min = parseInt(this.timer.min) - 1
            },
            async start(){
                let maxMins;
                // if hours is greater than 0 and mins is equal to 0, reset mins to 60
                if(this.timer.hrs > 0 && this.timer.min == 0) {
                    this.timer.min = '59'
                    // subtract one hour from current hours
                    this.timer.hrs = parseInt(this.timer.hrs) -1
                    maxMins = 59
                } else {
                    maxMins = parseInt(this.timer.min)
                }
                let timerInterval;
                    
                for(let i=maxMins; i>=1; i--) {
                    this.timer.sec = '59'
                    this.timer.min = parseInt(this.timer.min) -1
                    await new Promise((resolve) => {
                        timerInterval = setInterval(() => {
                            if(this.timer.sec >= 1){
                                console.log('Second')
                                this.timer.sec = parseInt(this.timer.sec) -1
                            } else {
                                console.log('clear')
                                clearInterval(timerInterval)
                                resolve()
                            };
                        }, 1000)
                    })
                    
                    if(i == 1 && this.timer.hrs > 0) {
                        this.timer.hrs = parseInt(this.timer.hrs) -1
                        this.timer.min = '60'
                        i = parseInt(this.timer.min)
                    }
                }
            }
        }
    }
</script>
<style scoped>
    .container{
        width: 90%;
        height: 100dvh;
        background-color: #CEBEA4;
        display: flex;
        flex-direction: column;
        justify-content: start;
        align-items: center;
        gap: 20px;
        font: 30px;
        position: fixed;
        top: 0;
        right: 0;
        padding: 20px;
        padding-top: 200px;
        text-align: center;
    }
    .close{
        color: #FF5631;
        font-size: 50px;
        font-weight: bold;
        position: absolute;
        top: 2%;
        right: 10%;
        cursor: pointer;
        font-family: monospace;
    }
    .close:hover{
        color: #FF5631
    }
    .container .clock{
        font-size: 50px;
    }
    .timer {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px
    }
    .timer input{
        width: 20%;
        font-size: 30px;
        text-align: center;
        background: transparent;
        border: none;
        outline: none;
    }
    .action-btns {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .action-btns button {
        padding: 10px;
    }
    .current{
        margin-top: 50px;
    }

</style>