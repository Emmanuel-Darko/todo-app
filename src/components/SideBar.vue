<template>
    <div class="container">
        <span @click="toggleSide()" class="close" type="button">x</span>
        <header class="clock">
            <span>⏰</span>
            <h1>COUNT<span style="color:#F03A17">DOWN</span></h1>
        </header>
        <h1 class="timer" :class="{stoppage}">
            <input type="number" :value="timer.hrs" min="0"  disabled/> : 
            <input 
                type="number" 
                :value="timer.min" 
                min="0" 
                max="59"
                oninput=""
                @change="(e)=>increase(e)"
                disabled
            /> : 
            <input type="number" :value="timer.sec" min="0" max="59" disabled/>
        </h1>
        <div class="action-btns">
            <button v-show="!timerActive" @click="decrease()">➖</button>
            <button v-show="!timerActive" @click="start()" style="font-size:20px">▶</button>
            <button v-show="timerActive" @click="stop()">🛑</button>
            <button v-show="!timerActive" @click="increase()">➕</button>
        </div>
        <section class="current">
            <h2>Current <span style="color:#F03A17">Task</span></h2>
            <TaskBar
                v-if="Object.keys(currentTask).length !== 0" 
                :todo="currentTask"
                :sidebar="true"
                :stoppage="stoppage"
            />
            <span v-else>No on-going task</span>
        </section>
        
    </div>
</template>
<script>
    import {mapState, mapActions} from 'pinia'
    import {useTodoStore} from '@/stores/todoStates'
    import TaskBar from '@/components/TaskBar.vue'
    export default {
        props: ['toggleSide'],
        components: {TaskBar},
        data(){
            return{
                timer: {
                    hrs: '00',
                    min: '00',
                    sec: '00'
                },
                timerInterval:null,
                timerActive: false,
                stoppage: false,
                audio: new Audio('/alarm.wav')
            }
        },
        created(){
            this.audio.autoplay = true
            this.audio.src = "data:audio/mpeg;base64,SUQzBAAAAAABEVRYWFgAAAAtAAADY29tbWVudABCaWdTb3VuZEJhbmsuY29tIC8gTGFTb25vdGhlcXVlLm9yZwBURU5DAAAAHQAAA1N3aXRjaCBQbHVzIMKpIE5DSCBTb2Z0d2FyZQBUSVQyAAAABgAAAzIyMzUAVFNTRQAAAA8AAANMYXZmNTcuODMuMTAwAAAAAAAAAAAAAAD/80DEAAAAA0gAAAAATEFNRTMuMTAwVVVVVVVVVVVVVUxBTUUzLjEwMFVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQsRbAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVf/zQMSkAAADSAAAAABVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVVV"
        },
        computed: {
            ...mapState(useTodoStore, ['currentTask'])
        },
        methods: {
            ...mapActions(useTodoStore, ['handleCheck']),
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
                this.timerActive = true
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
                    
                for(let i=maxMins; i>=1; i--) {
                    this.timer.sec = '59'
                    this.timer.min = parseInt(this.timer.min) -1

                    // set stoppage time in the last 60 mins
                    if(this.timer.min == 0){
                        this.stoppage = true
                    } else this.stoppage = false

                    await new Promise((resolve) => {
                        this.timerInterval = setInterval(() => {
                            if(this.timer.sec >= 1){
                                console.log('Second')
                                this.timer.sec = parseInt(this.timer.sec) -1
                            } else {
                                console.log('clear')
                                clearInterval(this.timerInterval)
                                resolve()
                            };
                        }, 1000)
                    })
                    
                    if(i == 1 && this.timer.hrs > 0) {
                        this.timer.hrs = parseInt(this.timer.hrs) -1
                        this.timer.min = '60'
                        i = parseInt(this.timer.min)
                    }

                    if(this.timer.hrs == '00' && this.timer.min == '00' && this.timer.sec == '00' && this.stoppage) {
                        this.playAlarm()
                    }
                }
            },
            stop(){
                clearInterval(this.timerInterval)
                this.timer.hrs = '00'
                this.timer.min = '00'
                this.timer.sec = '00'
                this.stoppage = false
                this.timerActive = false
            },
            playAlarm() {
                this.audio.src = '/alarm.wav';
                // this.audio.play()
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
        gap: 25px;
        font: 30px;
        position: fixed;
        top: 0;
        right: 0;
        padding: 20px;
        padding-top: 100px;
        text-align: center;
        overflow-y: scroll;
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
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .container .clock>span{
        font-size: 40px;
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
        color: #000;
    }
    .timer input:last-child{
        color: #545454;
    }

    .timer.stoppage input{
        color: red;
    }
    .action-btns {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
    }
    .action-btns button {
        padding: 15px;
        outline: none;
        border: 1px solid #FF5631;
        border-radius: 15px;
        font-size: 15px;
        background: #e0dfdf;
        cursor: pointer
    }
    .current{
        margin-top: 40px;
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    @media screen and (min-width: 768px) {
        .container{
            width: 30%;
        }
        .timer input{
            font-size: 50px;
        }
    }

</style>