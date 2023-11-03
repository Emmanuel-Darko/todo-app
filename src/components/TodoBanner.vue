<template>
    <section class="banner">
        <div class="text">
            <h1>Todo Done</h1>
            <h4>Keep it up</h4>
        </div>
        <div>
            <div class="circle">
                <span> {{completedTodos}} / </span>
                <span> {{totalTodos}} </span>
            </div>
        </div>
    </section>
</template>
<script>
    export default {
        props: ['totalTodos', 'completedTodos']
    }
</script>

<style scoped>
    .banner{
        width: 100%;
        background-color: #0D0D0D;
        color: #CEBEA4;
        padding: 10px 30px;
        border: 2px solid #CEBEA4;
        border-radius: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 50px;
    }
    .text {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }
    .text:first-child{ font-size: 20px; }
    .text h4{ font-size: 15px; }
    .circle{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80px;
        width: 80px;
        border-radius: 50%;
        background-color: #FF5631;
        color: #0D0D0D;
        font-size: 30px;
        font-weight: bolder;
    }

    @media screen and (min-width:768px){
        .banner{
            padding: 30px 0px;
            gap: 20px;
            justify-content: space-around;
        }
        .circle{
            height: 150px;
            width: 150px;
            font-size: 50px;
        }
        .text h1 {
            font-size: 30px;
        }
        .text h4{
            font-size: 25px;
        }
    }
</style>