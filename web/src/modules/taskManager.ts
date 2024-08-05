
import Task from "@/model/Task";
import { initialTasks } from "@/utils/TaskList";

let tasks: Task[] = [...initialTasks];

export function initializeTasks() {
  //sorting the tasks by group so first group will complete their task then next
  tasks.sort((a, b) => a.group - b.group);
}

export function getActiveTasks(): Task[] {
  let activeTasks: Task[] = [];
  if(activeTasks.length==0){
    const nonCompletedTasks: Task[] = tasks.filter((task) => task.completed!==true)
    for(let i=0; i<nonCompletedTasks.length; i++){
      if(nonCompletedTasks[i].group === nonCompletedTasks[0].group){
        activeTasks = [...activeTasks, nonCompletedTasks[i]]
      }
    }  
  }
  return activeTasks;
}

export function getCompletedTasks(): Task[] {
  const completedTasks: Task[] = tasks.filter((task) => task.completed===true)
  return completedTasks;
}

export function getAllTasks(): Task[] {
 return tasks;
}

export function getToDoTasks(): Task[] {
  const nonCompletedTasks: Task[] = tasks.filter((task) => task.completed!==true)
  let TodoTasks: Task[] = [];
  for(let i=1; i<nonCompletedTasks.length; i++){
    if(nonCompletedTasks[i].group !== nonCompletedTasks[0].group){
      TodoTasks = [...TodoTasks, nonCompletedTasks[i]];
    }
  } 

  return TodoTasks;
}

export function completeTask(taskTitle: string): void {  
  tasks.map((task) => {
    if(task?.title === taskTitle){
      task.completed=true;
      return;
    }
  })
  return;
}

export function createTask(title: string, description: string, persona: string, group: number): void {
  let newid = 0;
  tasks.map((task) => {
    if(task?.id > newid){
      newid=task?.id;
    }
  })
  newid = newid+1;
  const task: Task = new Task(newid, title, description, persona, group, false);
  tasks = [...tasks, task];
  tasks.sort((a, b) => a.group - b.group);
  return;
}

export function updateTask(taskId: number, taskDetails:{title: string}): void {
  let isIdtrue: boolean = false;
  isIdtrue = tasks.some((task) => {
      if(task?.id === taskId){
        if(taskDetails.title!==''){
          task.title =  taskDetails.title
        }
        return true;
      }
  })
  tasks.sort((a, b) => a.group - b.group);
}

export function deleteTask(taskId: number): void {
  tasks = tasks.filter((task) => task?.id!==taskId)
  return;
}
