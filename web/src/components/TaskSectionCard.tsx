import React, { useCallback, useEffect, useState } from 'react'
import TaskCard from './TaskCard'
import { getActiveTasks, getCompletedTasks, getToDoTasks } from '../modules/taskManager'
import Task from '@/model/Task'
import { v4 as uuidv4 } from 'uuid';

const TaskSectionCard = ({ title="", className="", render, handleTaskDone, rerender} : {title: string, className: string, render:boolean, handleTaskDone: (title: string) => void, rerender:()=>void }) => {
  const [todoTasks, setTodoTasks] = useState<Task[]>([])
  const [activeTasks, setActiveTasks] = useState<Task[]>([])
  const [completedTasks, setCompletedTasks] = useState<Task[]>([])
  const [className1, setClassName1] = useState<string>('')
  const [noOfTasks, setNoOfTasks] = useState<number>(0)

  useEffect(() => {
    const activetasks = getActiveTasks();
    const completedtasks = getCompletedTasks();
    const todoTasks = getToDoTasks();
    setActiveTasks(activetasks);
    setTodoTasks(todoTasks);
    setCompletedTasks(completedtasks);
  },[render])  

  useEffect(() => {
    if(title==='To-Do'){
      setClassName1('bg-[#D9D9D9] text-[#00000073]')
      setNoOfTasks(todoTasks?.length)
    }else if(title==='In Progress'){
      setClassName1('bg-[#E6F7FF] text-[#1890FF]')
      setNoOfTasks(activeTasks?.length)
    }else{
      setClassName1('bg-[#52C41A] text-[#FFFFFF]')
      setNoOfTasks(completedTasks?.length)
    }
  },[activeTasks?.length, completedTasks?.length, title, todoTasks?.length])

  const renderTasks = useCallback(() => {   
    if(title === "To-Do"){
      return(
        <>
          {
            todoTasks && todoTasks.length>0 &&
            
            todoTasks.map((task, index) => {
              const uniqueId = uuidv4();
              return(
                <TaskCard key={uniqueId} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
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
            const uniqueId = uuidv4();
            return(
              <TaskCard key={uniqueId} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
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
              const uniqueId = uuidv4();
              return(
                <TaskCard key={uniqueId} task={task} parent={title} handleTaskDone={handleTaskDone} rerender={rerender}/>
              )
            })
          }
        </>
      )
    }
  },[todoTasks, activeTasks, completedTasks, handleTaskDone, rerender, title])

  return (
    <div className='flex flex-col h-full w-1/3 pb-4'>
      <div className='flex justify-start items-center gap-2 mb-3'>
        <h1 className='text-lg font-semibold'>{title}</h1>
        <button 
          disabled={true}
          className={`h-5 w-5 rounded-full text-sm font-semibold flex items-center justify-center ${className1}}`}  
        >
          {noOfTasks}
        </button>
      </div>
      <div className='grid grid-cols-2 gap-3'>
        {renderTasks()}
      </div>
    </div>
  )
}

export default TaskSectionCard
