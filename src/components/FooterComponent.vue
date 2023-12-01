<template>
    <div class="container">
        <h2> <span style="color:#FF5631">&copy;</span> KODE <i>{{ date }}</i></h2>
    </div>
</template>

<script>
    export default {
        data(){
            return {
                date: new Date().getFullYear()
            }
        }
    }
</script>

<style scoped>
    .container{
        /* background-color: #CEBEA4; */
        padding: 5px;
        font-family: monospace;
        text-align: center;
        color: #fff;
    }
</style>