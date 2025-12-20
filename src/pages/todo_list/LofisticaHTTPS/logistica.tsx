// import { Link } from "react-router-dom";
// import {useCreatNewTasck} from "../zustand";
// import { Modal } from "./Madal";
// import { useState } from "react";
// // import Zadanie from "./zadacha1";
// // import NewsTest from "./Error_404_";
// // import ActiveZadine from "../../active_Zadanie/Active_Zadanie"
// // import Profil from "../../Profil/Profil";
// // import IzminenieFon from "../../../components/BurgerMenu/fon_Izim/foon_izim";
// // import Statistica from "../../statistica/Statistica";
// // // import MainTodoList from "../main_todoList";
// // import Home from "../../Home/Home";

// // import Home from "../../Home/Home";

// export function LogicaHousting() {
//   const masNew = useCreatNewTasck((state) => state.masNew);
//   const [isModalca, setIsModalca] = useState(false);
//   return (
//     <>
//       <button onClick={() => setIsModalca(true)}>+New Task</button>
//       <nav>
//         {masNew.map((ind) => (
//           <Link to={`/${ind.slug}`} key={ind.id}>
//             {ind.name} |
//           </Link>
//         ))}
  // <Routes>
  //           <Route path="*" element={<Home/>} />
  //           <Route path="/:slug" element={<Zadanie />} />
  //           <Route path="*" element={<NewsTest/>} />
  //           <Route path="/profil" element={<Profil/>}/>
  //           <Route path="/statistica" element={<Statistica/>}/>
  //           <Route path="/ceatFon" element={<IzminenieFon/>}/>
  //           <Route path="/activZadanie" element={<ActiveZadine/>}/>
  //         </Routes>
//       </nav>
//       {/* Не трогой это снизу так как он работает для открытий и закрытий приложение  */}
//       {isModalca && <Modal onClose={() => setIsModalca(false)} />}
//         </>
//   );
// }

import { useCreatNewTasck } from "../zustand";
import { Modal } from "../LofisticaHTTPS/Madal";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";

export default function LogicaHousting() {
  const masNew = useCreatNewTasck((state) => state.masNew);
  const [isModalca, setIsModalca] = useState(false);

  return (
    <>
      <button onClick={() => setIsModalca(true)}>+New Task</button>
      <nav className="boxsURlName">
        {masNew.map((ind) => (
          <Link className="URLName" to={`${ind.slug}`} key={ind.id}>
            {ind.name} 
          </Link>
        ))}
      </nav>

      <Outlet />

      {isModalca && <Modal onClose={() => setIsModalca(false)} />}
    </>
  );
}
