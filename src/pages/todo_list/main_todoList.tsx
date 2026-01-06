import { useCreatTodoList } from "./zustand"
import { useState , useEffect} from "react"
import '../todo_list/LofisticaHTTPS/main_todoList.css'

type Props = {
    folderSlug?: string
}

export default function MainTodoList({ folderSlug }: Props){
    const todos=useCreatTodoList((state)=>state.todos)
    const addTodoText=useCreatTodoList((state)=>state.addTodoText)
    const removeTodoText=useCreatTodoList((state)=>state.removeTodoText)
    const locationStora=useCreatTodoList((state)=>state.locationStor)
    const redactor=useCreatTodoList((state)=>state.redactorText)
    const provActivZadach=useCreatTodoList((state)=>state.provActivZadTodo)

    const filterStatus = useCreatTodoList((state) => state.filterStatus || "all");

    const filterTextMainTodo = useCreatTodoList((state) => state.filterTextMainTodo)

    const [inputText,setInputText]=useState("")
    const [editingId,setEditingId]=useState<number | null>(null);
    const [redactInputText,setRedactInputText]=useState<string>("")
    // const [filterText,setFilterText]=useState<string>("all")

    const todosInFolder = folderSlug 
    ? todos.filter(t => t.folder === folderSlug) 
    : todos.filter(t => !t.folder);

    const finalFilteredTodos = todosInFolder.filter((item) => {
    if (filterStatus === "all") return true;
    if (filterStatus === "active") return item.done === true;
    if (filterStatus === "notActive") return item.done === false; 
    return true;
});

    const startEdit=(id:number,text:string)=>{
        setEditingId(id);
        setRedactInputText(text)
    }
  //     const saveEdit = () => {
  //   if (editingId !== null) {
  //     redactor(redactInputText,editingId,"all");
  //     setEditingId(null);
  //   }
  // };

  const saveEdit = () => {
    if (editingId !== null) {
        redactor(redactInputText, editingId, "all", folderSlug);
        setEditingId(null);
    }
};

  useEffect(() => {
    locationStora(folderSlug);    
    filterTextMainTodo("all", folderSlug);
    
}, [folderSlug, locationStora, filterTextMainTodo]);

  // useEffect(() => {
  //   filterTextMainTodo("all", folderSlug);
  // }, [folderSlug, filterTextMainTodo]); 

  useEffect(()=>{
    locationStora()
  },[])




    // const visibleTodos = folderSlug ? todos.filter(t => t.folder === folderSlug) : todos.filter(t => !t.folder)

//     const todosInFolder = folderSlug 
//     ? todos.filter(t => t.folder === folderSlug) 
//     : todos.filter(t => !t.folder);

//     const finalFilteredTodos = 
//     todosInFolder.filter((item) => {
//     if (filterText === "all") return true;
//     if (filterText === "active") return item.done === true;
//     if (filterText === "notActive") return item.done === false; 
//     return true;
// });

    return(
        <>        
        <div className="boxs_mainTodoList">
        <input className="inputAddText" placeholder="Создать задачу" type="text" value={inputText}
        onChange={e=>setInputText(e.target.value)}/>
        <button className="BtnAdd" onClick={()=>{addTodoText(inputText, folderSlug); setInputText('')}}
        disabled={!inputText.trim()}>Добавить</button>
        <ul className="UlBoxs">
  {finalFilteredTodos.map((ind) => {
    const isDuplicate = todos.filter(todo => todo.text === ind.text).length > 1;

    return (
      <li key={ind.id} className="boxsLi">
        {editingId === ind.id ? (
          <input
            className="inputRedactor"
            value={redactInputText}
            onChange={(e) => setRedactInputText(e.target.value)}
            placeholder="Редактировать"
          />
        ) : (
          <>
            <span className={"todo_Text" + `${ind.done}`}>
              {isDuplicate ? (
                <span className="error">Ошибка повторяется: {ind.text}</span>
              ) : (
                ind.text
              )}
            </span>
            {ind.done === false ? (
              <p className="notParagrafActive">Не сделан</p>
            ) : (
              <p className="paragravActive">Сделан</p>
            )}
          </>
        )}

        <div className="BtnBoxs">
          <button className="BtnDelayt" onClick={() => removeTodoText(ind.id,"all",folderSlug)}>Удалить</button>
          <button className="BtnActive" onClick={() => provActivZadach(ind.id,"all",folderSlug)}>Сделан</button>
          {editingId === ind.id ? (
            <button className="BtnSave" onClick={saveEdit}>Сохранить</button>
          ) : (
            <button className="BtnRedactor" onClick={() => startEdit(ind.id, ind.text)}>Редактировать</button>
          )}
        </div>
      </li>
    );
  })}
</ul>
            </div>
        </>
    )
}
