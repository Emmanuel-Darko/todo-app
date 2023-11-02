<template>
    <div class="container">
        <h1>{{ title }}</h1>
        <div class="auth" v-if="state =='login'">
            <label for="">Email</label>
            <input v-model="data.email" type="email">
            <label for="">Password</label>
            <input v-model="data.password" type="password">
            <button @click="handleLogin()" type="submit">Login</button>
        </div>

        <form v-else @submit.prevent="handleRegister()">
            <label for="">Username</label>
            <input v-model="data.username" type="text">
            <label for="">Email</label>
            <input v-model="data.email" type="email">
            <label for="">Password</label>
            <input v-model="data.password" type="password">
            <button type="submit">Register</button>
        </form>

        <div>
            <h3 v-if="state=='register'">Have an account? <a @click="toggle('login')" style="color: blue; cursor: pointer">Signin</a></h3>
            <h3 v-else>Don't have an account?  <a @click="toggle('register')" style="color: blue; cursor: pointer">Register</a></h3>
        </div>
    </div>
</template>

<script>
    import axios from 'axios' 
    export default {
        data(){
            return{
                data: {
                    username: '',
                    email: '',
                    password: ''
                },
                state: 'login'
            }
        },
        computed: {
            title(){
                return this.state == 'login' ? 'Login' : 'Register'
            }
        },
        methods: {
            toggle() {
                if(this.state == 'login'){
                    this.state = 'register'
                }else {
                    this.state = 'login'
                }
            },

            handleRegister(){
                axios.post("http://192.168.8.165:3000/user", this.data)
                .then((res) => {
                    console.log(res)
                })
                .catch(error => {
                    console.log(error)
                })
            },

            handleLogin() {
                // const token = JSON.parse(localStorage.getItem('token')) || []
                axios.post('http://192.168.8.165:3000/user/login', this.data)
                .then((res) => {
                    console.log(res)
                    localStorage.setItem('token', res.data.token)
                })
                .catch((error) => {
                    console.log(error)
                })
            }
        }
    }
</script>

<style scoped>
    .container{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        gap: 20px;
        background-color: #f1f1f1;
        height: 100dvh;
    }

    form, div.auth{
        width: 50%;
        display: flex;
        flex-direction: column;
        gap: 20px;
        border-radius: 20px;
    }
    form input, div input {
        padding: 10px;
    }

    form button, div button {
        width: 40%;
        padding: 20px;
        background-color: greenyellow;
    }
</style>