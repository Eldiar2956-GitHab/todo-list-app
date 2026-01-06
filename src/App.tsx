// import ErrorBoundary from '../src/pages/Error';
// import { LogicaHousting } from '../src/pages/todo_list/LofisticaHTTPS/logistica';
// // import HostingHTTPS from '../src/pages/todo_list/LofisticaHTTPS/hosting';
// import Burgermenu from './components/BurgerMenu/BergerMenu';
// import CatalogMain from './pages/CategoryScroller/categoryMain';
import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './pages/todo_list/LofisticaHTTPS/Routing';

// import logo from "../src/assets/planly-logo 1.png"
// import Searcht from '../../todo-list-app/src/pages/todo_list/LofisticaHTTPS/Search';
// import { Modal } from '../src/pages/todo_list/LofisticaHTTPS/Madal';


// const bagColo=useDarkMode((state)=>state.bakColor)
// const savedTheme = localStorage.getItem({bagColo})==="true";
// document.body.dataset.theme = savedTheme ? "Dark_Mode" : "Light_Mode";


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
    {/* <div className={bakColor ? 'Light_Mode' : 'Dark_Mode'}> */}


    <BrowserRouter>
    <AppRoutes/>

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
        {/* </div> */}

    </>
  );
}

export default App;
