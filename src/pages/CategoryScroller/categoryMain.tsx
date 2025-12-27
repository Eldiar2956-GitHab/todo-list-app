import { useState } from "react";
import profil from '../../assets/oregisterPeople.png';
import "../CategoryScroller/categoryMain.css";
import { Link } from "react-router-dom";

export default function CatalogMain() {
    const [activCatolog, setActivCatolog] = useState<string>("");

    function toggleMenu() {
        setActivCatolog(activCatolog === '' ? "active" : '');
    }

    return (
        <>
            {!activCatolog && (
                <button className="openCatalog" onClick={toggleMenu}>Menu</button>
            )}

            <div className={`boxsMainCatalog ${activCatolog}`}>
                <div className="profile_section">
                    <div className="img_boxs">
                        <img className="imgProfil" alt="imgPeople" src={profil} />
                    </div>
                    <h5>Тут будет имя пользователя</h5>
                    <div className="lain"></div>
                </div>

                <div className="boxsUrl" onClick={toggleMenu}>
                    <Link to="/" className="catalogText">Home</Link>
                    <Link to="/activZadanie" className="catalogText">Заделанные задачи</Link>
                    <Link to="/statistica" className="catalogText">Статистика</Link>
                    <Link to="/ceatFon"  className="catalogText">Изменить фон</Link>
                </div>

                <button onClick={toggleMenu} className="btnClose">Закрыть меню</button>
            </div>
        </>
    );
}