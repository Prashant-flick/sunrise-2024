import TaskSectionCard from "@/components/TaskSectionCard";
import { Inter } from "next/font/google";
import { useCallback, useEffect, useState } from "react";
import { completeTask, createTask, initializeTasks } from "../modules/taskManager"

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [render, setrender] = useState<boolean>(false);
  const [showaddtodo, setshowaddtodo] = useState<boolean>(false);

  useEffect(() => {
    initializeTasks()
  },[render])

  const rerender = useCallback(() => {
    setrender(prev=>!prev)
  },[])

  const handleTaskDone = useCallback((title: string) => {
    completeTask(title); 
    setrender(prev=>!prev);
  },[])

  const handleAddTodo = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    let {title, description, persona, group} = e.target as HTMLFormElement;
    
    const titleValue: string = title.value;
    const descriptionValue: string = description.value;
    const personaValue: string = persona.value;
    const groupValue: number = parseInt(group.value);   
    
    if(titleValue==='' || descriptionValue=='' || personaValue==='' || !groupValue){
      console.error("all feilds are required")
      alert("All Feilds are Required")
    }else{      
      createTask(titleValue, descriptionValue, personaValue, groupValue);
      setshowaddtodo(false)
      setrender(prev=>!prev)
    }
  },[])

  return (
    <main className="min-h-screen w-full bg-white">
      {
        showaddtodo &&
        <div className="fixed top-0 left-0 h-screen w-full backdrop-blur-sm flex items-center justify-center"
          onClick={(e) => {
            e.preventDefault()
            setshowaddtodo(false)
          }}
        >
          <div className="h-fit w-1/3 bg-white py-4 flex flex-col justify-center shadow-md shadow-slate-800"
            onClick={(e) => {
              e.stopPropagation()
            }}
          >
            <h1 className="text-center text-black pt-4 pb-5 text-xl font-bold border-b-4 border-b-gray-1">ADD TODO</h1>
            <form 
              className="flex flex-col gap-4 w-full items-center px-10 pt-4"
              onSubmit={(e) => {
                e.preventDefault()
                e.stopPropagation()
                handleAddTodo(e)
              }}  
            >
              <input type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Title" name="title"/>
              <input type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Description" name="description"/>
              <input type="text" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Persona" name="persona"/>
              <input type="number" className="w-full h-12 pl-3 border-2 border-gray-2" placeholder="Group" name="group"/>
              <button className="bg-blue-1 text-white w-1/2 py-2 text-bold text-xl">
                Submit
              </button>
            </form>
          </div>
        </div>
      }
      <nav className="h-[8vh] flex px-10 justify-between items-center">
        <h1 className="font-semibold text-xl">Task Board</h1>
        <button className="bg-blue-1 px-3 py-2 text-white font-semibold"
          onClick={(e) => {
            e.preventDefault()            
            setshowaddtodo(prev=>!prev);
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
