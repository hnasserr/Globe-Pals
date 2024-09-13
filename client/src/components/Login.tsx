import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.login(email, password);
      navigate("/all-trips");
      console.log("login succeed :>> ");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <fieldset>
            <legend>Login</legend>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Log In</button>
            {/* <p>
              Need to <Link to="/signUp">sign up</Link> first ?
            </p> */}
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Login;

//TODO : if the user doesn't have an account redirect to sign up !
