import "./LoginForm.css";
import GoogleIcon from "@mui/icons-material/Google";
import * as api from "../api";
import { useState } from "react";
import { useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";

function LoginForm() {

  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError,setLoginError]=useState(false);

  const emailChangeHandler = (event) => {
    setEmail(event.target.value);
  };

  const passwordChangeHandler = (event) => {
    setPassword(event.target.value);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    console.log({email,password});
    try{
       const response=await api.signIn({email,password});
       const token=response.data;
       dispatch({type:'LOGIN',payload:{token}});
       navigate('/configure');

       
    }catch(error){
        setLoginError(true);
        console.log(error);
    }
    
  };
  return (
    <div className="card">
      <div className="card_title">
        <h1>Sign In</h1>
      </div>
      <div className="form">
        <form onSubmit={submitHandler}>
          <input
            type="email"
            name="email"
            placeholder="Email"
            id="email"
            value={email}
            onChange={emailChangeHandler}
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="password"
            value={password}
            onChange={passwordChangeHandler}
          />
          {loginError && <p className="login-error">Wrong credentials</p>}
          <button>Sign In</button>
          <p>OR</p>
          <button>
            <div>
              <GoogleIcon
                style={{
                  fontSize: "1.3rem",
                  marginTop: "0.1rem",
                  marginRight: "0.5rem",
                }}
              />
              <p>Continue with Google</p>
            </div>
          </button>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
