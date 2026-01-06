import { useState, useEffect, useRef } from "react";
import "../BurgerMenu/BurgerMenu.css";
import ActiveBurger from "./activBurger";


export default function BurgerMenu() {
    const [active, setActive] = useState<string>("");
    
    const menuRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const toggleMenu = () => {
        setActive(prev => (prev === "" ? "active" : ""));
    };
    useEffect(() => {
        const handleClickOutside = (event:any) => {
            if (
                active === "active" &&
                menuRef.current && !menuRef.current.contains(event.target) &&
                buttonRef.current && !buttonRef.current.contains(event.target)
            ) {
                setActive(""); 
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [active]);

    return (
        <>
        <div className="buregerMain">
            <button 
                ref={buttonRef} 
                className={`burger_meny ${active}`} 
                onClick={toggleMenu} 
                aria-label="Открыть меню"
            >
                <div>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </button>
            <div ref={menuRef} className={`active_Https ${active}`}>
                <ActiveBurger />
            </div>
            </div>
        </>
    );
}