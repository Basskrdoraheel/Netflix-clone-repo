import { Link, useNavigate , useLocation} from "react-router-dom";
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,
        createUserWithEmailAndPassword } from "firebase/auth";
import { firebaseConfig } from "./firebaseConfig";
import { useState, useEffect } from "react";

const Login = () => {
  const app = initializeApp(firebaseConfig);
  const navigate = useNavigate();
  const location = useLocation();
  const page = location.pathname === "/login" ? true : false;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = getAuth();
  const [isUserExist, setIsUserExist] = useState(false);
  const [isEmailExist, setIsEmailExist] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [validPassword, setValidPassword] = useState(true);


  const validation = (fieldName, value) => {
    switch(fieldName) {
      case 'email':
        return value.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i);
      case 'password':
        return value.length >= 6;
      default:
        break;
    }
  };

  
  const ctaClickHandler = (e) => {
    e.preventDefault();
    
    if (!validation('email', email) || !validation('password', password)) {
        setValidEmail(validation('email', email));
        setValidPassword(validation('password', password));
        return;
    }


    if (page) {
      signInWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
        .catch((err) => {
          setIsUserExist(true);
          console.log(err.message);
        });
    } else {
      createUserWithEmailAndPassword(auth, email, password)
        .then((auth) => {
          if (auth) {
            navigate("/dashboard");
          }
        })
       
        .catch((err) =>{
          setIsEmailExist(true);
          console.log(err.message);
        })
    }
  };
  
  
  

  const emailOnChangeHandler = (e) => {
    setEmail(e.target.value);
  };

  const passOnChangeHandler = (e) => {
    setPassword(e.target.value);
  };

  useEffect(() => {
    setIsUserExist(false);
    setIsEmailExist(false);
  },[location])

  return (
    <div className="login">
      <div className="holder">
        <h1 className="text-white">{page ? "Sign In" : "Register"}</h1>
        <br />
        <form>
          <input
            className="form-control"
            value={email}
            onChange={emailOnChangeHandler}
            type="email"
            placeholder="Email"/>
            {!validEmail && <p className="text-danger">Email is invalid/blank</p>}
          
          <input
            className="form-control"
            value={password}
            onChange={passOnChangeHandler}
            type="password"
            placeholder="Password"/>

            {!validPassword && <p className="text-danger">Password is invalid/blank </p>}
          
          <button
            className="btn btn-danger btn-block"
            onClick={ctaClickHandler}
          >
            {page ? "Sign In" : "Register"}
          </button>
          <br />
        {page &&   <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              value=""
              id="flexCheckDefault"
            />
            <label
              className="form-check-label text-white"
              htmlFor="flexCheckDefault"
            >
              Remember Me
            </label>
          </div>}
        </form>
        <br />
        <br />
        {isUserExist && <p className="text-danger">user not found | go for Sign in</p>}
        {isEmailExist && <p className="text-danger">Email already in use | go for Sign in</p>}
        
        <div className="login-form-other">
          <div className="login-signup-now">
            {page ? "New to Netflix? " : "Existing User "}
            <Link className="" to={page ? "/register" : "/login"}>
              {page ? " Sign Up Now" : "Sign In "}
            </Link>
          </div>
        </div>
      </div>
      <div className="shadow"></div>
      <img
        className="concord-img vlv-creative"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/6e32b96a-d4be-4e44-a19b-1bd2d2279b51/ee068656-14b9-4821-89b4-53b4937d9f1c/IN-en-20220516-popsignuptwoweeks-perspective_alpha_website_small.jpg"
        alt=""
      />
    </div>
  );
};

export default Login;
