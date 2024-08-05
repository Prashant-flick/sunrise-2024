import React, { useCallback, useState } from 'react'
import { updateTask, deleteTask} from '@/modules/taskManager';

const TaskCard = ({task:{ title, description, id, persona, completed, group}, parent, handleTaskDone, rerender } : {task: { title: string, description: string, id: number, persona: string, completed: boolean, group: number}, parent: string, handleTaskDone:(title: string)=>void, rerender:()=>void }) => {
  const [showupdatetask, setshowupdatetask] = useState<boolean>(false);
  
  const handleEdit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    let {title, description, persona, group} = e.target as HTMLFormElement;
    
    const titleValue: string = title.value;
    
    if(titleValue===''){
      console.error("all feilds are required")
      alert("All Feilds are Required")
    }else{      
      updateTask(id, {title: titleValue});
      setshowupdatetask(false)
      rerender()
    }
  },[id, rerender])

  const handleDelete = useCallback(() => {
    deleteTask(id);
    rerender()
  },[rerender, id])

  return (
    <div className='bg-white flex flex-col h-full'>
      <div className='flex justify-between items-center border-b-2 border-light-1 px-6 py-3'>
      {
        showupdatetask &&
        <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault()
            setshowupdatetask(false)
          }}
        >
          <div className="h-fit w-1/3 bg-white py-4 flex flex-col justify-center shadow-md shadow-slate-800"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h1 className="text-center text-black pt-4 pb-5 text-xl font-bold border-b-4 border-b-gray-1">UPDATE TASK</h1>
            <form 
              className="flex flex-col gap-4 w-full items-center px-10 pt-4"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleEdit(e)
              }}  
            >
              <input type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Title" name="title"/>
              <button className="bg-blue-1 text-white w-1/2 py-2 text-bold text-xl">
                Submit
              </button>
            </form>
          </div>
        </div>
      }

        <h2 className='font-medium'>Task {id}</h2>
        { (parent==='To-Do' || parent==='In Progress') &&
            <button className={`
            text-white pr-3 pl-2 gap-1 py-[3px] font-normal flex justify-between
              ${parent==='To-Do' ? 'bg-gray-1 text-gray-3 border-2 border-gray-2' : parent==='In Progress'? 'bg-blue-1 border-2 border-blue-1 text-white' : 'bg-[#52C41A]'} 
            `}
              disabled={parent==='To-Do'}  
              onClick={(e) => {      
                if(id){
                  handleTaskDone(title);
                }        
              }}
            >
              <span class="material-symbols-outlined">
                check
              </span>
              Done
            </button>
          }
      </div>
      <div className='flex flex-col px-6 py-3 gap-2'>
        <h2 className='font-medium'>{title}</h2>
        <p className='text-black-1' >{description}</p>
      </div>
      <div className='flex flex-row justify-between px-6 pb-2'>
        <button
          onClick={(e) => {
            e.preventDefault()
            setshowupdatetask(true)
          }}
        >
          <span class="material-symbols-outlined">
            edit_square
          </span>
        </button>
        <button
          onClick={(e) => {
            e.preventDefault()
            handleDelete()
          }}
        >
          <span class="material-symbols-outlined">
            delete
          </span>
        </button>
      </div>
    </div>
)}

export default TaskCard
