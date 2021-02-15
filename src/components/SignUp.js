import React, {useEffect,useState,useContext} from "react";
import { Redirect } from "react-router-dom";
import firebaseConfig from "../config";
import {db} from "../config.js";
const SignUp = () => {
  const [currentUser, setCurrentUser] = useState(null);    
  const [currentEmail,setCurrentEmail]=useState("");
  const [count, setCount] = useState(0);
  const handleSubmit = (e) => {
    e.preventDefault();    
    const { email, password } = e.target.elements;
    try {
        setCount(count => count + 1);
      firebaseConfig.auth().createUserWithEmailAndPassword(email.value, password.value);      
      db.collection("NewCard").doc(`user${count}`).set({
          email:email.value,
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
      setCurrentUser(true);
      setCurrentEmail(email.value);
    } catch (error) {
      alert(error);
    }
  };
  if (currentUser) {
      return <Redirect to="/dashboard" />;
  }
  return (
    <div style={{backgroundColor:'#209cee',position:'relative',top:'30%',left:'30%',height:'200px',width:'300px',margin:'40px',padding:'40px'}}>
      <h1 style={{color:'white'}}>Sign Up</h1>
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

export default SignUp;