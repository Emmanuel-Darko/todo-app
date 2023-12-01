<template>
    <div class="app-container">
        <header class="header-view">
            <slot name="header"></slot>
        </header>
        <main class="body-view">
            <slot name="body"></slot>
        </main>
        <aside class="side-view">
            <slot name="sidebar"></slot>
        </aside>
        <footer class="footer">
            <slot name="footer"></slot>
        </footer>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style lang="css" scoped>
    div.app-container{
        width: 100%;
        min-height: 100dvh;
        background-color: #0D0D0D;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: start;
        gap: 50px;
        position: relative;
        /* padding-top: 20px; */
        /* padding-bottom: 50px; */
    }
    .app-container .header-view{
        width: 100%;
        position: fixed;
        min-height: 5%;
        z-index: 100;
    }
    .app-container .body-view{
        width: 90%;
        position: relative;
        margin-top: 20%;
        /* border: 1px solid red; */
    }
    .app-container .side-view{
        z-index: 200;
    }
    footer.footer{
        width: 100%;
        position: absolute;
        bottom: 0;
    }

    @media screen and (min-width: 768px){
        .app-container .body-view{
            width: 35%;
            margin-top: 10%;
        }
    }
</style>