import { Route,Routes } from "react-router-dom"
import NewsTest from "../LofisticaHTTPS/Error_404_";
import ActiveZadine from "../../active_Zadanie/Active_Zadanie"
import Profil from "../../Profil/Profil";
import Zadanie from './zadacha1';
import IzminenieFon from "../../../components/BurgerMenu/fon_Izim/foon_izim";
import Statistica from "../../statistica/Statistica";
import Home from "../../Home/Home";
export  default function AppRoutes(){
    return(
        <>
            <Routes>
            <Route path="*" element={<Home/>} />
            <Route path="/:slug" element={<Zadanie />} />
            <Route path="*" element={<NewsTest/>} />
            <Route path="/profil" element={<Profil/>}/>
            <Route path="/statistica" element={<Statistica/>}/>
            <Route path="/ceatFon" element={<IzminenieFon/>}/>
            <Route path="/activZadanie" element={<ActiveZadine/>}/>
          </Routes>
        </>
    )
}