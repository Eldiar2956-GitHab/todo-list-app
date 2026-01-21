// Не рабочий прототупи который при переходе выводить ошыбку то есть не рабочий https 
import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useCreatTodoList } from '../zustand';
import { useCreatNewTasck } from '../zustand';
import MainTodoList from '../main_todoList';
import logo from '../../../assets/planly-logo 1.png'
import BurgerMenu from '../../../components/BurgerMenu/BergerMenu';
import Searcht from './Search';
function Zadanie() {
  let clearTodos=useCreatTodoList((ind)=>ind.removeTodoText)
  const todos=useCreatTodoList((ind)=>ind.todos)
    const { slug } = useParams();
    const location = useLocation() as { state?: { name?: string; id?:number} };
    const masNew = useCreatNewTasck((s) => s.masNew);
   const removeNewNameText = useCreatNewTasck(s => s.removeNewString);

    const stateName = location.state?.name;
    const navigate=useNavigate()


    const item = slug ? masNew.find((i) => i.slug === slug) : undefined;
    const name = stateName ?? item?.name;

    const https=window.location.pathname.slice(1)

    const stateId = location.state?.id;

    const idToDelate=stateId ?? item?.id


    const handleDeleyt = () => {
    const numericId = Number(idToDelate);
    if (!isNaN(numericId)) {
        todos
            .filter((todo) => todo.folder=== slug)
            .forEach((todo) => {
                clearTodos(todo.id,todo.text);
            });

        removeNewNameText(numericId); 

        navigate('/'); 
    } else {
        console.warn("ID не является числом:", idToDelate);
    }
};

    if (!name) return <div className='notZadanie'>Задача не найдена</div>;
    return (
        <div>
    <div className='mainContainer'>
  <main className='content'>
    <header className='topBar'>
      <img className='logo' alt='logo' src={logo} />
      <BurgerMenu />
    </header>
    <hr className="divider" />
    <section className='actionPanel'>
      <div className='searchWrapper'>
        <Searcht folderSlug={slug}/>
      </div>
    </section>
    <div className='addBtnComit'>


    </div>
    <section className='todoSection'>
            <nav>
            <h1 className='nameZadanie'>Задача:{https}</h1>
            <MainTodoList folderSlug={slug} />
            </nav>
    </section>
  </main>
</div>
     <button className='BtnDelaytString' onClick={handleDeleyt}>Удалить</button>
        </div>
    );
}

export default Zadanie;
