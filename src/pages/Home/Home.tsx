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
import "./Home.css"
export default function Home(){

    return(
            <>
    <div className='mainBoxas'>
      <div className='leftCatologMain'>
        <CatalogMain/>
      </div>
      <div className='rigthCatologMain'>
        <div className='logo_burgerMenu'>
          <img className='logo' alt='logo' src={logo}/>
          <Burgermenu/>
        </div>
        <p className="lain"></p>
        <div className='Seartch_addURl'>
          <div className='boxsSearch'>
            <Searcht/>
          </div>
          <div className='boxsAdd'>
             <LogicaHousting/>
          </div>
        </div>
        <div className='TodoList'>
             <h1>Главный Экран</h1>
             <MainTodoList/>
        </div>
      </div>
    </div>
    <div className="mainBoxs">

    </div>
    </>
        )
}





