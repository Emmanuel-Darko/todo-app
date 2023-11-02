import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  const currentTask = ref('')
  function setCurrentTask(task: any) {
    currentTask.value = task
  }

  return { currentTask, setCurrentTask }
})
