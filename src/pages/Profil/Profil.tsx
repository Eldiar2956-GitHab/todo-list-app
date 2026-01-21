import { useState } from "react";
import logo from "../../assets/oregisterPeople.png";
import ThemeToggle from "../../components/BurgerMenu/dark-mode";
import BurgerMenu from "../../components/BurgerMenu/BergerMenu";
import { useUserStore } from '../todo_list/zustand';
import CustomActiveShapePieChart from "../../components/CustomActivDiohram";
import './profil.css';

export default function Profil() {
  let user = useUserStore((state) => state.user);
  const updateUser = useUserStore((state) => state.updateUser);
  const resetUser = useUserStore((state) => state.resetUser);

  const [close, setClose]=useState<boolean>(true)
  const [newName,setNewName]=useState<string>(user.name)
  const [newCity,setNewCity]=useState<string>(user.city)
  const [newEmail,setNewEmail]=useState<string>(user.email)
  const [newAge,setNewAge]=useState<string>(`${user.age}`)
  const [infoUser,setInfoUSer]=useState<string>(user.infoUser)


  const onClose=()=>{
    setClose(!close)
  }
  return (
    <div className="boxs_profil_main">
      <header className="topBar">
        <img className="imgProfil" alt="logo_User" src={logo} />

        <div className="burdermainTimeToggle">
          <ThemeToggle />
          <BurgerMenu />
        </div>
      </header>
      <hr />
      
      <div className="main_info_User">
        <div className="Dan_user">
          <p>Name: {user.name}</p>
          <p className="userAge">Age: {user.age}</p>
          <p className="userCity">City: {user.city}</p>
          <p className="userEmail">Email: {user.email}</p>
          <p className={`userOnlayn ${user.userOnlayn ? 'online' : 'offline'}`}>
            Status: {user.userOnlayn ? 'Online' : 'Offline'}
          </p>
          <div className={`modal-overlayFilter_${close}`}>
            <div className="modalProfil_cotainer">
                <h1 className="userInfo">Редактировать</h1>
                <p className="userInfo">Name:<input className="inputProfil" value={newName} onChange={(e)=>setNewName(e.target.value)} placeholder={user.name}/></p>
                <p className="userInfo">Age:<input className="inputProfil"  value={newAge} type="string" placeholder={`${user.age}`} onChange={(e)=>setNewAge(e.target.value)}/></p>
                <p className="userInfo">City:<input className="inputProfil"  value={newCity} placeholder={user.city} onChange={(e)=>setNewCity(e.target.value)}/></p>
                <p className="userInfo">Email:<input className="inputProfil"  value={newEmail} placeholder={user.email} type="email" onChange={(e)=>setNewEmail(e.target.value)}/></p>
                <p className="UserInfo"><textarea className="inputInfoUser"  placeholder={user.infoUser} value={infoUser}  onChange={(e)=>setInfoUSer(e.target.value)}/></p>
                <button className="userSave" onClick={()=>{updateUser({name:newName,age:newAge,city:newCity,email:newEmail,infoUser:infoUser}),onClose()}}>Сохранить</button>
            </div>
          </div>
        </div>
        <div className="info_User">
          <h2>User info</h2>
          <p>{user.infoUser}</p>
        </div>
      </div>
      <div className="redactorBoxs">
        <button className="redactorUser" onClick={onClose}>Редактировать</button>
        <button onClick={resetUser} className="redactorUser">Сбросить</button>
      </div>
      <CustomActiveShapePieChart/>
    </div>
  );
}