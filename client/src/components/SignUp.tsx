import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Signup: React.FC = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useContext(AuthContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await auth?.signup({ email, username, password });
      // Redirect or do something after signup
    } catch (err) {
      console.error("Signup failed:", err);
    }
  };
  const logout = auth?.logout;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
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
      </form>
      <button onClick={logout}>logout</button>
    </>
  );
};

export default Signup;
