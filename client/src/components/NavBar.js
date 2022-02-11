import { useLocation,NavLink } from "react-router-dom"

export const NavBar= ()=>{
    let {pathname}=useLocation();
    let reloadFoodPage=()=>{
        if(pathname==="/food") document.location.reload();
    }
    return (
        <div className="navFather">
            <nav className="nav">
                <NavLink to="/food" onClick={reloadFoodPage}><h2>Foods</h2></NavLink>
                <NavLink to="/"><h1>Food Api</h1></NavLink>
                <NavLink to="/create"><h2>Agree a Food</h2></NavLink>
            </nav>
        </div>
    )
}