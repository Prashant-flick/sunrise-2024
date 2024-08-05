import TaskSectionCard from "@/components/TaskSectionCard";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { completeTask, createTask, initializeTasks } from "../modules/taskManager"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [render, setRender] = useState<boolean>(false);
  const [showaddtodo, setShowaddtodo] = useState<boolean>(false);
  const [title , setTitle] = useState<string>('')
  const [description , setDescription] = useState<string>('')
  const [persona , setPersona] = useState<string>('')
  const [group , setGroup] = useState<number>(0)

  useEffect(() => {
    initializeTasks()
  },[render])

  const rerender = useCallback(() => {
    setRender(prev=>!prev)
  },[])

  const handleTaskDone = useCallback((title: string) => {
    completeTask(title); 
    setRender(prev=>!prev);
  },[])

  const handleAddTodo = useCallback(() => {
    if(title==='' || description=='' || persona==='' || !group){
      console.error("all feilds are required")
      alert("All Feilds are Required")
    }else{      
      createTask(title, description, persona, group);
      setShowaddtodo(false)
      setDescription('');
      setTitle('')
      setGroup(NaN);
      setPersona('')
      setRender(prev=>!prev)
    }
  },[title, description, persona, group])

  const renderEdit = useCallback(() => {
    if(showaddtodo){
      return(
        <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-sm flex items-center justify-center">
          <div className="h-fit w-1/3 bg-white py-4 flex flex-col justify-center shadow-md shadow-slate-800"
          >
            <div className='flex justify-end pr-3'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  setShowaddtodo(false)
                }}
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <h1 className="text-center text-black pt-4 pb-5 text-xl font-bold border-b-4 border-b-gray-1">ADD TODO</h1>
            <form 
              className="flex flex-col gap-4 w-full items-center px-10 pt-4"
              onSubmit={() => {
                handleAddTodo()
              }}  
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Title" name="title"/>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Description" name="description"/>
              <input 
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Persona" name="persona"/>
              <input 
                value={group}
                onChange={(e) => {
                  const value1:number = parseInt(e.target.value)
                  setGroup(value1)
                }}
                type="number" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Group" name="group"/>
              <button className="bg-blue-1 text-white w-1/2 py-2 text-bold text-xl">
                Submit
              </button>
            </form>
          </div>
        </div>
      )
    }
  },[description, group, handleAddTodo, persona, showaddtodo, title])

  return (
    <main className="min-h-screen w-full bg-white">
      {renderEdit()}
      <nav className="h-[8vh] flex px-10 justify-between items-center">
        <h1 className="font-semibold text-xl">Task Board</h1>
        <button className="bg-blue-1 px-3 py-2 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault()            
            setShowaddtodo(prev=>!prev);
          }}
        >
          Add To-Do
        </button>
      </nav>
      <div className="bg-light-1 h-full w-full pt-4 px-10 flex flex-row gap-10 min-h-[92vh]">
        <TaskSectionCard 
          title="To-Do"
          className=""
          render={render}
          handleTaskDone={handleTaskDone}
          rerender={rerender}
        />
        <TaskSectionCard 
          title="In Progress"
          className=""
          render={render}
          handleTaskDone={handleTaskDone}
          rerender={rerender}
        />      
        <TaskSectionCard 
          title="Completed"
          className=""
          render={render}
          handleTaskDone={handleTaskDone}
          rerender={rerender}
        />
      </div>
    </main>
  );
}
