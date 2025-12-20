// import ErrorBoundary from '../src/pages/Error';
// import { LogicaHousting } from '../src/pages/todo_list/LofisticaHTTPS/logistica';
// // import HostingHTTPS from '../src/pages/todo_list/LofisticaHTTPS/hosting';
// import Burgermenu from './components/BurgerMenu/BergerMenu';
// import CatalogMain from './pages/CategoryScroller/categoryMain';
import { BrowserRouter } from 'react-router-dom';
// import logo from "../src/assets/planly-logo 1.png"
// import Searcht from '../../todo-list-app/src/pages/todo_list/LofisticaHTTPS/Search';
// import { Modal } from '../src/pages/todo_list/LofisticaHTTPS/Madal';
import { Routes, Route } from "react-router-dom";
import NewsTest from "../src/pages/todo_list/LofisticaHTTPS/Error_404_";
import ActiveZadine from "../src/pages/active_Zadanie/Active_Zadanie"
import Profil from "../src/pages/Profil/Profil";
import Zadanie from './pages/todo_list/LofisticaHTTPS/zadacha1';
import IzminenieFon from "../src/components/BurgerMenu/fon_Izim/foon_izim";
import Statistica from "../src/pages/statistica/Statistica";
// import MainTodoList from "../main_todoList";
import Home from "../src/pages/Home/Home";
import './App.css';
    {/* <Burgermenu/>
      <div>
        <HostingHTTPS/>
        <h1>Начинаем верстку</h1>
            <ErrorBoundary>
          <LogicaHousting />
        </ErrorBoundary>
      </div> */}

function App() {
  return (
    <>
    <BrowserRouter>
          <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/:slug" element={<Zadanie />} />
            <Route path="*" element={<NewsTest/>} />
            <Route path="/profil" element={<Profil/>}/>
            <Route path="/statistica" element={<Statistica/>}/>
            <Route path="/ceatFon" element={<IzminenieFon/>}/>
            <Route path="/activZadanie" element={<ActiveZadine/>}/>
          </Routes>

    </BrowserRouter>
    {/* <div className='mainBoxas'>
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
          <Searcht/>

          <LogicaHousting/>
        </div>
        <div className='TodoList'>
        </div>
      </div>
    </div>
     {/* <ErrorBoundary>
          <LogicaHousting />
        </ErrorBoundary> */}

    </>
  );
}

export default App;
