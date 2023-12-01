<template>
    <div class="container">
        <h1 class="header">HubTel<span style="color: #FF5631;">API</span></h1>
        <h2 class="sub-head"><i>Enter a number</i></h2>
        <form @submit.prevent="callApi()">
            <input type="number" v-model="number">
            <button type="submit">Make Call</button>
        </form>
        <hr>
        <span class="resp-container">
            <h2 class="resp-head"><i>All Requests</i></h2>
            <div v-if="(apiRes.length !== 0)" class="resp-body">
                <div
                    v-for="(res, index) in apiRes" :key="index" 
                    class="resp" 
                >
                    <h1>
                        <span>
                            {{ res.type }}
                            <i>{{' ' + '('+ res.number +')'}}</i>
                        </span>
                        <div @click="removeRes(index)">x</div>
                    </h1>
                    <h3>{{ res.text }}</h3>
                </div>
            </div>
            <p v-if="(apiRes.length == 0)" class="no-resp">No request made...</p>
        </span>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data(){
        return{
            number: null,
            apiRes: []
        }
    },
    created(){
        
    },
    methods: {
        callApi(){
            axios.get(`http://numbersapi.com/${this.number}/trivia?json`)
            .then((res) => {
                console.log(res)
                this.apiRes = [ res.data, ...this.apiRes ]
            })
        },
        removeRes(removeIndex){
            this.apiRes = this.apiRes.filter((res, index) => index !== removeIndex )
        }
    }
}
</script>

<style lang="css" scoped>
    .container {
        background: #ffff;
        width: 100%;
        margin-top: -40px;
        padding: 50px 40px;
        border-radius: 20px;
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .header {
        border: 1px solid black;
        padding: 10px;
        border-radius: 10px;
    }
    .sub-head, .resp-head {
        color: #FF5631;
    }
    form {
        display: flex;
        justify-content: space-between;
        gap: 10
    }
    input {
        width: 40%;
        padding: 15px;
        font-size: 25px;
        text-align: center;
        background: #f1f1f1;
        border-radius: 15px;
        outline: 1px solid #000;
        border: none;
    }
    input:focus{
        outline: 2px solid #FF5631;
    }

    button {
        width: 50%;
        background: #f1f1f1;
        padding: 20px;
        border-radius: 10px;
        cursor: pointer;
        outline: none;
        border: none;
        align-self: center;
        box-shadow: 0px 2px 5px grey;
        font-size: 15px;
    }
    button:hover {
        box-shadow: none;
        background: #FF5631;
        color: #fff;
    }
    .resp-container {
        display: flex;
        flex-direction: column;
        gap: 20px;
    }
    .resp-body{
        display: flex;
        flex-direction: column;
        gap: 15px;
        height: 300px;
        padding: 10px;
        overflow-y: scroll;
    }
    .resp {
        border: 1px solid #FF5631;
        border-radius: 0 0 10px 10px;
        transition: 0.4s ease-in-out;
    }
    
    .resp h1 {
        font-size: 18px;
        padding: 10px 20px;
        background-color: #000;
        color: #f1f1f1;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: relative;
    }
    .resp h1 div {
        background: red;
        height: 30px;
        width: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 50%;
        position: absolute;
        right: 10px;
        cursor: pointer;
    }
    .resp h3{
        padding: 20px;
    }
    .no-resp{
        font-size: 18px;
        margin-top: 20px;
    }

</style>