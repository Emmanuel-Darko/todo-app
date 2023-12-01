import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todos', () => {
  // states
  const allTodos = ref<any>([])
  const currentTask = ref<any>({})

  // actions
  function setTodos(data: any) {
    allTodos.value = data
    saveLocalStorage(allTodos.value)
  }

  function setCurrentTask(task: any) {
    // checks if the same task is clicked, remove from current task else set it
    if(task.id == currentTask.value?.id) {
      currentTask.value = {}
    } else {
      currentTask.value = task
    }
  }

  async function fetchTodos() {
    const todos = localStorage.getItem('todos')
    allTodos.value = todos ? JSON.parse(todos) : []
    console.log(allTodos.value)
  }

  function handleCheck(id: any, status: boolean) {
    // take the checked items id and current status(to be changed)
    let checkedIndex;
    allTodos.value = allTodos.value?.map((todo: any, index: number) => {
      if(todo?.id == id) {
        checkedIndex = index
        // toggle the completed state of current task on the sidebar also if it exist and equal to the item being checked
        if(currentTask.value.id == todo.id){
          currentTask.value.completed = !status
        }
        return { ...todo, completed: !status }
      }
      return todo;
    })
    
    // shuffle recently checked and unchecked items
    const temp = allTodos.value.splice(checkedIndex, 1)[0]
    const findLastCheckedItem = allTodos.value?.findIndex((todo: any) => todo?.completed == true)
    console.log(temp)
    // if a last checked item is found
    if(findLastCheckedItem !== -1){
      // insert the item in question to the index of last checked item
      allTodos.value.splice(findLastCheckedItem, 0, temp)
      return saveLocalStorage(allTodos.value)
    }
    // if no checked item is found
    else{
      // item to be checked is pushed to the last
      if(status == !true){
        allTodos.value.push(temp)
        return saveLocalStorage(allTodos.value) 
      }
      else {
        // item to be unchecked is maintained at the current index
        allTodos.value.splice(checkedIndex, 0, temp)
        return saveLocalStorage(allTodos.value)
      }
    }
  }
  function saveLocalStorage(data: any) {
    localStorage.setItem("todos", JSON.stringify(data))
  }

  return { allTodos, currentTask, fetchTodos, setTodos, setCurrentTask, handleCheck, saveLocalStorage }
})
