import React, { useState } from "react";
import "./App.css";
import Header from "./component/Header";




function App() {
  const [todoText, setTodoText] = useState("");
  const [todos, setTodos] = useState([]);
  const [pressEditButton, setPressEditButton] = useState(false);
  const [updatedText, setUpdatedText] = useState("");
  const [updatedTodo1, setUpdatedTodo1] = useState("");


  const formHandler = (event) => {
    event.preventDefault();
    if (todoText === "") {
      alert("Please type your todo!")
      return
    }
    console.log(todoText)
    const newTodo = {
      id: new Date().getTime(),
      title: todoText,
      date: new Date(),
      hasDone: false
    }
    console.log(newTodo);
    setTodos([...todos, newTodo]);
    setTodoText("");
  }

  const deleteTodo = (id) => {
    const filteredTodos = todos.filter(i => i.id !== id)
    setTodos(filteredTodos)

  }

  const changeHasDone = (todo) => {
    console.log(todo)

    let tempTodos = []
    todos.map((item) => {
      if (item.id === todo.id) {
        let updatedTodo = {
          ...todo,
          hasDone: !todo.hasDone
        }
        tempTodos.push(updatedTodo)
      } else {
        tempTodos.push(item)
      }
    })

    setTodos(tempTodos)
  }

  const updatedFormTodo= (event) => {
    event.preventDefault();
    

    if(updatedText===""){
      alert("Todo text can't be empty!")
      return
    }

    let tempTodos =[]
    todos.map(item=>{
      if(item.id===updatedTodo1.id){
        let updatedTodo = {
          ...updatedTodo1,
          title: updatedText
        }
        tempTodos.push(updatedTodo)

      }else{
        tempTodos.push(item)
      }
    })
setTodos(tempTodos);
setPressEditButton(false);
  }

  return (
    <div className="container">
      <Header />
      <form onSubmit={formHandler}>
        <div className="input-group my-3">
          <input style={{backgroundColor: "rgb(214, 218, 235)"}}
            value={todoText}
            onChange={(event) => {
              setTodoText(event.target.value)
            }}
            type="text"
            className="form-control"
            placeholder="Type your todo" />
          <button className="btn btn-danger w-25" type="submit" >ADD</button>
        </div>
      </form>

      {pressEditButton === true && (

        <form onSubmit={updatedFormTodo}>
          <div className="input-group my-3">
            <input value={updatedText} onChange={(event) => { setUpdatedText(event.target.value) }} className="form-control" type={"text"} />
            <button onClick={() => {
              setPressEditButton(false)
            }} className="btn btn-danger w-25" type="button">Cancel</button>
            <button className="btn btn-info w-25" type="submit">Save</button>
          </div>
        </form>
      )

      }


      <div className="container" >
        {
          todos.length === 0 ? (
            <p className="text-center" style={{color: "white"}}> You don't have any todos yet!</p>
          ) : (
            <div style={{backgroundColor: "rgb(214, 218, 235)"}}>
              {
                todos.map((item, index) => (
                  <div key={index} style={{ padding: 10, marginTop: 10, borderBottom: "2px solid gray", boxShadow: "2px 2px 15px  gray" }} className="d-flex justify-content-between align-items-center rounded">
                    <div >
                      <h1 style={{ textDecoration: item.hasDone === true ? "line-through" : "none" }} > {item.title}</h1>
                      <small>{new Date(item.date).toLocaleDateString()}</small>
                    </div>
                    <div>
                      <button
                        onClick={() => { deleteTodo(item.id) }}
                        className="btn btn-sm btn-danger">Delete</button>
                      <button onClick={() => {
                        setPressEditButton(true);
                        setUpdatedText(item.title);
                        setUpdatedTodo1(item);
                      }
                      } className="btn btn-sm btn-primary">Edit</button>
                      <button onClick={() => changeHasDone(item)} className="btn btn-sm btn-success">{item.hasDone === false ? "Done" : "Undone"}</button>
                    </div>

                  </div>
                ))
              }
            </div>
          )
        }

      </div>
    </div>
  );
}

export default App;
