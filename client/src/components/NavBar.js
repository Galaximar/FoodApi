import { Link, useLocation } from "react-router-dom"

export const NavBar= ()=>{
    let {pathname}=useLocation();
    let reloadFoodPage=()=>{
        if(pathname==="/food") document.location.reload();
    }
    return (
        <div>
            <nav className="nav">
                <Link to="/food" onClick={reloadFoodPage}><h2>Foods</h2></Link>
                <Link to="/"><h1>Food Api</h1></Link>
                <Link to="/create"><h2>Agree a Food</h2></Link>
            </nav>
        </div>
    )
}