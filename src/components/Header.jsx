
import NavLogo from "../assests/img1.png"
import {Link, useNavigate} from "react-router-dom";




const Header = () => {

  const  navigate = useNavigate();

  const clickHandler= (e) =>{
    e.preventDefault();
    navigate("/login");
  }
    return ( 
        <header className="topNav">
        <nav className="navbar navbar-expand-md navbar-dark">
          <div className="container-fluid">
            <Link className="navbar-brand" to="/">
              <img className="nav__logo" src={NavLogo} alt="" />
            </Link>
            
            <div className="navbar">
              <form className="d-flex" role="search">
                <select>
                  <option>English</option>
                  <option>Hindi</option>
                </select>
                <button className="btn btn-danger" onClick={clickHandler}>Signin</button>
              </form>
            </div>
          </div>
        </nav>
      </header>
     );
}
 
export default Header;