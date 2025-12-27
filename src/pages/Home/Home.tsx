// import MainTodoList from "../main_todoList"
// import ErrorBoundary from '../Error';
// // import HostingHTTPS from '../src/pages/todo_list/LofisticaHTTPS/hosting';
import Burgermenu from '../../components/BurgerMenu/BergerMenu';
import CatalogMain from '../CategoryScroller/categoryMain';
import logo from "../../assets/planly-logo 1.png"
import Searcht from '../todo_list/LofisticaHTTPS/Search';
import MainTodoList from '../todo_list/main_todoList';
// import { Modal } from '../todo_list/LofisticaHTTPS/Madal';
import LogicaHousting  from '../todo_list/LofisticaHTTPS/logistica';
import ButtonLogist from '../todo_list/LofisticaHTTPS/buttonlogistica';
import "./Home.css"
export default function Home(){

    return(
            <>
    <div className='mainContainer'>
  <main className='content'>
    <header className='topBar'>
      <img className='logo' alt='logo' src={logo} />
      <Burgermenu />
    </header>

    <hr className="divider" />
    <section className='actionPanel'>
      <div className='searchWrapper'>
        <Searcht />
        <LogicaHousting />
      </div>
      <div className='addBtnWrapper'>
           <CatalogMain />
      </div>
    </section>
    <div className='addBtnComit'>
      <ButtonLogist/>
    </div>
    <section className='todoSection'>
         <MainTodoList />
    </section>
  </main>
</div>
    </>
        )
}





