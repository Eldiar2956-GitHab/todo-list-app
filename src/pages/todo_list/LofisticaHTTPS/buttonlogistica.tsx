import { useCreatNewTasck } from "../zustand";
import { Link } from "react-router-dom";
export default function ButtonLogist(){
    const masNew = useCreatNewTasck((state) => state.masNew);
    return(
        <>
           <nav className="boxsURlName">
        {masNew.map((ind) => (
          <Link className="URLName" to={`${ind.slug}`} key={ind.id}>
            {ind.name} 
          </Link>
        ))}
      </nav>
        {/* <Outlet /> */}
        </>
    )
}