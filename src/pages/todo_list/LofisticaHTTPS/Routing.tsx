import { Route,Routes } from "react-router-dom"
import NewsTest from "../LofisticaHTTPS/Error_404_";
import ActiveZadine from "../../active_Zadanie/Active_Zadanie"
import Profil from "../../Profil/Profil";
import Zadanie from './zadacha1';
import IzminenieFon from "../../../components/BurgerMenu/fon_Izim/foon_izim";
import Statistica from "../../statistica/Statistica";
import Home from "../../Home/Home";
import { useEffect } from "react";
import { useDarkMode } from "../zustand";
export  default function AppRoutes(){
    let bagColor=useDarkMode((ind)=>ind.bakColor)
    useEffect(()=>{
    document.body.style.background = bagColor ? "#212529" : "#767e92";
    },[bagColor])
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