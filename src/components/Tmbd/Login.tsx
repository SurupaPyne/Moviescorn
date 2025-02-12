import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

interface LoginProps {
    setIsauthenticate: (value: boolean) => void;
}// This definition means setIsauthenticate is a function that takes a boolean as input and doesn't return anything (void).

const Login:React.FC<LoginProps> = ({ setIsauthenticate }) => {
    const [username,setUsername] = useState<string>("");
    const[password,setPassword] = useState<string>("");
    const navigate = useNavigate();

    const handleLogin = () => {
        if(username==="surupa" && password==="suru"){
            setIsauthenticate(true);
            navigate('/');
        }
        else{
            alert("Invalid username or password");
        }    
    }
    return (
        <>
            <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: "75vh" }}>
                <div className="card" style={{ backgroundColor: "#F5AD42", width: "300px" }}>
                    <div className="card-header">
                        <h3>Login</h3>
                    </div>
                    <div className="card-body">
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Username</label>
                                    <input type="text" className="form-control" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <label htmlFor="">Password</label>
                                    <input type="password" className="form-control" value={password} onChange={(e)=>{setPassword(e.target.value)}}/>
                                </div>
                            </div>
                        </div>
                        <div className="form-group">
                            <div className="row">
                                <div className="col">
                                    <input type="button" className="btn btn-dark form-control" value="login" onClick={handleLogin} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Login;