import React, { useContext,useState } from "react";
import { Redirect } from "react-router-dom";
import { AuthContext } from "./Auth";
import firebaseConfig from "../config.js";
import {db} from "../config.js";
import "./Dashboard.css";
function Todo({ todo, index, completeTodo, removeTodo }) {
    return (
      <div
        className="todo"
        style={{ textDecoration: todo.isCompleted ? "line-through" : "" ,margin:'20px'}}
      >
          <button style={{position:'relative',top:'-20px'}}>{index}</button>
          <textarea>
        {todo.text}
        </textarea>
        <div>
          <button disabled={false} onClick={() => completeTodo(index)}>Complete</button>
          <button onClick={() => removeTodo(index)}>Delete</button>
        </div>
      </div>
    );
  }
  
  function TodoForm({ addTodo }) {
    const [value, setValue] = React.useState("");
  
    const handleSubmit = e => {
      e.preventDefault();
      if (!value) return;
      addTodo(value);
      setValue("");
    };
  
    return (
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="input"
          value={value}
          onChange={e => setValue(e.target.value)}
        />
      </form>
    );
  }
const Dashboard = () => {
    db.collection("CardInfo")
.doc('card')
.get()
.then(doc => {
  const data = doc.data();
  console.log(data);
});
    const [todos, setTodos] = React.useState([
        {
          text: "Learn about React",
          isCompleted: false
        },
        {
          text: "Meet friend for lunch",
          isCompleted: false
        },
        {
          text: "Build really cool todo app",
          isCompleted: false
        }
      ]);
  const { currentUser } = useContext(AuthContext);
  if (!currentUser) {
    return <Redirect to="/login" />;
  }
  

  const addTodo = text => {
    const newTodos = [...todos, { text }];
    setTodos(newTodos);
    db.collection("NewCard")
.where("email", "==", "spandey548@gmail.com")
.get()
.then(querySnapshot => {
    console.log('Query Snapshot',querySnapshot);
  const data = querySnapshot.docs.map(doc => doc.data());
  console.log(data); // array of cities objects
});
    db.collection("NewCard").doc(`user0`).update({
        value:text
    })
    .then(function() {
        console.log("Document successfully written!");
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });
    
   
  };

  const completeTodo = index => {
    const newTodos = [...todos];
    newTodos[index].isCompleted = true;
    setTodos(newTodos);
  };

  const removeTodo = index => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  return (
    <div className="app">
        <div >
        <button style={{position:'relative',left:'90%',backgroundColor:'white',height:'40px',width:'100px',color:'#209cee'}} onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
        </div>
      <div className="todo-list" style={{position:'relative',left:'30%'}}>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            index={index}
            todo={todo}
            completeTodo={completeTodo}
            removeTodo={removeTodo}
          />
        ))}
        <TodoForm addTodo={addTodo} />
      </div>
      
    </div>
  );
//   return (
//     // <div>
//     //   <h1>Welcome</h1>
//     //   <p>This is the dashboard, if you can see this you're logged in.</p>
//     //   <button onClick={() => firebaseConfig.auth().signOut()}>Sign out</button>
//     // </div>
    
//   );
};

export default Dashboard;