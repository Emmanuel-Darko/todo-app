<template>
    <div class="header">
        <h1>KODE<span>TODO</span></h1>
        <IconEcosystem @click="toggleSide()" style="color: #CEBEA4; cursor:pointer"/>
    </div>
</template>

<script>
    import IconEcosystem from '@/components/icons/IconEcosystem.vue'
    export default {
        components: {
            IconEcosystem
        },
        props: ['toggleSide']        
    }
</script>

<style scoped>
    .header{
        width: 100%;
        color: #fff;
        background-color: #0D0D0D;
        padding: 15px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        position: sticky;
        /* border: 1px solid red; */
        box-shadow: 0px 1px 10px #CEBEA4;
    }
    .header h1 {
        font-size: 25px;
        color: #CEBEA4;
    }
    .header h1 span{
        color: #FF5631;
    }

</style>