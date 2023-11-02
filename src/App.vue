<script>
import MainLayout from '@/layouts/MainLayout.vue'
import HeaderComponent from './components/HeaderComponent.vue';
import SideBar from '@/components/SideBar.vue'
export default {
  components:{
    MainLayout,
    HeaderComponent,
    SideBar
  },
  data(){
    return{
      sideBtnState: false
    }
  },
  methods: {
    toggleSide(state) {
      if(state) {
        this.sideBtnState = state
      } else {
        this.sideBtnState = !this.sideBtnState
      }
    }
  },
}
</script>

<template>
  <div class="app-container">
    <main-layout>
      <template #header>
        <HeaderComponent :toggleSide="toggleSide"/>
      </template>
      <template #body>
        <RouterView @toggleSide="()=>toggleSide(true)"/>
      </template>
      <template #sidebar>
        <SideBar v-show="sideBtnState" :sideBtnState="sideBtnState" :toggleSide="toggleSide"/>        
      </template>
    </main-layout>
  </div>
</template>

<style>
  *{
    margin: 0;
    box-sizing: border-box;
  }
  
  ::-webkit-scrollbar{
    width: 10px;
  }
  /* Track */
  ::-webkit-scrollbar-track {
    box-shadow: inset 0 0 5px #CEBEA4; 
    border-radius: 10px;
  }
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #FF5631; 
    border-radius: 10px;
  }
  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #a1321a; 
  }
</style>
