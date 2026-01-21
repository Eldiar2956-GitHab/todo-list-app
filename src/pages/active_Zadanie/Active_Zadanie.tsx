import Burgermenu from '../../components/BurgerMenu/BergerMenu'
import ThemeToggle from '../../components/BurgerMenu/dark-mode'
import logo from '../../assets/planly-logo 1.png'
import "./Active_Zadanie.css"
// import { useCreatTodoList } from '../todo_list/zustand'

import { useEffect} from 'react'
import { useState } from 'react'

interface Todo{
    id: number;
    text: string;
    done: boolean;
    folder?: string;
    folderSlug?:string
}

export default function ActiveZadine(){    
    
        const [todos, setTodos] = useState<Todo[]>(() => {
        const saved = localStorage.getItem("todos");
        return saved ? JSON.parse(saved) : [];
    });

    const [activ,setActiv]=useState<boolean>(true)
    const activBtn=()=>{
        setActiv(true)
    }
    const isActiv=()=>{
        setActiv(false)
    }

    useEffect(() => {
        localStorage.setItem("todos", JSON.stringify(todos));
    },[todos]);


    return(
        <>
          <div className="mainContainer">
      <main className="content">
        <header className="topBar">
          <img className="logo" src={logo} alt="logo" />
          <div className="burdermainTimeToggle">
            <ThemeToggle />
            <Burgermenu />
          </div>
        </header>
        <hr className="divider" />
          <div className='BtnISActive'>
            <h1>Всего заданий:{activ ? todos.filter((ind)=>ind.done===true).length : todos.filter((ind)=>ind.done===false).length}</h1>
            <div className='BtnText'>
            <button onClick={activBtn} className='activBtnText'>Active</button>
            <button onClick={isActiv} className='isActiveBtnText'>Not Active</button>
            </div>
          </div>
          <div className='ActivText'>
            <ul>{todos.filter((ind)=>ind.done===activ).map((ind)=>(
                    <li key={ind.id} className="boxsLi">
            <span className={"todo_Text" + `${ind.done}`}>
                {ind.text}
            </span>
            {ind.done === false ? (
              <p className="notParagrafActive">Не сделан</p>
            ) : (
              <p className="paragravActive">Сделан</p>
            )}
      </li>
    ))}</ul>
          </div>
      </main>
    </div>
    </>
    )
}