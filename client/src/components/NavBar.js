import { useLocation,NavLink } from "react-router-dom"
import linkedin from "../img/linkedin2.jpg"
import github from "../img/github1.png"

export const NavBar= ()=>{
    let {pathname}=useLocation();
    let reloadFoodPage=()=>{
        if(pathname==="/food") document.location.reload();
    }
    return (
        <div className="navFather">
            <div className="navContainer">
                <a className="linkedin" href="https://www.linkedin.com/in/marcelogottardini"><img src={linkedin}/></a>
                <a className="github" href="https://github.com/Galaximar"><img src={github}/></a>
                <nav className="nav">
                    <NavLink to="/food" onClick={reloadFoodPage}><h2>Foods</h2></NavLink>
                    <NavLink to="/"><h1>Food Api</h1></NavLink>
                    <NavLink to="/create"><h2>Agree a Food</h2></NavLink>
                </nav>
            </div>
        </div>
    )
}