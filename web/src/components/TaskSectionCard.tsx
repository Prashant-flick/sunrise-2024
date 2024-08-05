import React, { useCallback, useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import { getActiveTasks, getCompletedTasks, getToDoTasks } from '../modules/taskManager'
import Task from '@/model/Task'

const TaskSectionCard = ({ title="", className="", render, handleTaskDone, rerender} : {title: string, className: string, render:boolean, handleTaskDone: (title: string) => void, rerender:()=>void }) => {
  const [TodoTasks, setTodoTasks] = useState<Task[]>([])
  const [activeTasks, setActiveTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])

  useEffect(() => {
    const activetasks = getActiveTasks();
    const completedtasks = getCompletedTasks();
    const todoTasks = getToDoTasks();
    setActiveTasks(activetasks);
    setTodoTasks(todoTasks);
    setCompletedTasks(completedtasks);
  },[render])  

  const renderTasks = useCallback(() => {   
    if(title === "To-Do"){
      return(
        <>
          {
            TodoTasks && TodoTasks.length>0 &&
            
            TodoTasks.map((task, index) => {
              return(
                <TaskCard key={index} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
              )
            })
          }
        </>
      )
    }    
    else if(title === "In Progress"){
      return(
        <>
        {
          activeTasks && activeTasks.length>0 &&
          activeTasks.map((task, index) => {
            return(
              <TaskCard key={index} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
            )
          })
        }
        </>
      )
    }    
    else if(title === "Completed"){
      return(
        <> 
          {
            completedTasks && completedTasks.length>0 &&
            completedTasks.map((task, index) => {
              return(
                <TaskCard key={index} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
              )
            })
          }
        </>
      )
    }
  },[TodoTasks, activeTasks, completedTasks, handleTaskDone, rerender, title])

  return (
    <div className='flex flex-col h-full w-1/3 pb-4'>
      <div className='flex justify-start items-center gap-2 mb-3'>
        <h1 className='text-lg font-semibold'>{title}</h1>
        <button 
          disabled={true}
          className={`h-5 w-5 rounded-full text-sm font-semibold flex items-center justify-center
            ${title==='To-Do' ? 'bg-[#D9D9D9]' : title==='In Progress'? 'bg-[#E6F7FF]' : 'bg-[#52C41A]'} 
            ${title==='To-Do' ? 'text-[#00000073]' : title==='In Progress'? 'text-[#1890FF]' : 'text-[#FFFFFF]'}`}  
        >
          {
            title==='To-Do' ?
            `${TodoTasks?.length}` :
              title==='In Progress' ?
              `${activeTasks?.length}`:
              `${completedTasks?.length}` 
          }
        </button>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {renderTasks()}
      </div>
    </div>
  )
}

export default TaskSectionCard
