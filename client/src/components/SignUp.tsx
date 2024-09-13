import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NavBar from "./NavBar";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.signup({ email, username, password });
      navigate("/all-trips");
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };

  return (
    <>
      <NavBar />
      <div className="auth-container">
        <form onSubmit={handleSubmit} className="auth-form">
          <fieldset>
            <legend>Sign Up</legend>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button type="submit">Sign Up</button>
          </fieldset>
        </form>
      </div>
    </>
  );
};

export default Signup;
