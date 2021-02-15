import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
const LogIn = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = e.target.elements;
    try {
      firebaseConfig.auth().signInWithEmailAndPassword(email.value, password.value);
    } catch (error) {
      alert(error);
    }
  };
  const { currentUser } = useContext(AuthContext);
  if (currentUser) {
    return <Redirect to="/dashboard" />;
  }
  return (
    <div style={{backgroundColor:'#209cee',position:'relative',top:'30%',left:'30%',height:'200px',width:'300px',margin:'40px',padding:'40px'}}>
      <h1 style={{color:'white'}}>Log In</h1>
      <form onSubmit={handleSubmit}>
        <label for="email">Email</label>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="email" name="email" placeholder="Email" />
        <br/>
        <label for="password">Password</label>&nbsp;&nbsp;&nbsp;&nbsp;
        <input type="password" name="password" placeholder="Password" />
        <br/>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default LogIn;