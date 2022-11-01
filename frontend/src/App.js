import React, {useState, useEffect} from 'react';
import axios from 'axios';
import trash_icon from './images/trash_can1.png';
import './App.modules.css';

const BASE_URL = "http://localhost:5000/api";


function App() {
    const [todo, setTodo] = useState("");
    const [todoItems, setTodoItems] = useState(null);

    useEffect(() => {
        getTodos();
    }, []);

    const getTodos = () => {
        axios
            .get(`${BASE_URL}/todos`)
            .then((res) => setTodoItems(res.data))
            .catch((err) => console.log(err));
    }

    const handleAddTodo = (event) => {
        event.preventDefault();

        if(todo === ""){
            alert("Please enter a todo item.");
        }
        else{
            axios
                .post(`${BASE_URL}/todo/new`, {title: todo})
                .then((res) => {
                    setTodoItems([...todoItems, res.data]);                
                    setTodo("");
                })
                .catch((err) => console.log(err));
        }
    }

    const handleTodoToggle = (id) => {
        axios
            .get(`${BASE_URL}/todo/toggleStatus/${id}`)
            .then((res) => getTodos())
            .catch((err) => console.log(err));
    }

    const handleDeleteTodo = (id) => {
        axios
            .delete(`${BASE_URL}/todo/delete/${id}`)
            .then((res) => {
                setTodoItems(todoItems.filter((todo) => todo._id !== res.data._id)); // _id is the id genereated by MongoDB
            })
            .catch((err) => console.log(err));
    }

    return (
        <div className="App">
            <h1 style={{textAlign: "center"}}>Todo App</h1>
            
            <form onSubmit={handleAddTodo}>
                <div className="todo_input_wrapper">
                    <input 
                        className="todo_input_bar"
                        value={todo}
                        placeholder="Add a todo item..."
                        onChange={(e) => setTodo(e.target.value)}   //Returns the value of the data at the cursor's current position.
                    />
                    
                    <button type="submit" className="add_button">
                        +
                    </button>
                </div>

                <div className="todos_list">
                    {!todoItems || !todoItems.length ? (
                        <h3 style={{textAlign: "center"}}>No Todos Found!</h3>
                    ) : (
                        todoItems.map((todo_item) => {
                            return (
                                <div className="todo" key={todo_item._id}>
                                    <span
                                        onClick={() => handleTodoToggle(todo_item._id)}
                                        className={todo_item.complete ? "complete" : ""}
                                        id="todo_title"
                                    >
                                        {todo_item.title}
                                    </span>

                                    <span
                                        onClick={() => handleDeleteTodo(todo_item._id)}
                                        className="delete_todo"                                
                                    >
                                        <img src={trash_icon} alt="delete" />
                                    </span>                            
                                </div>
                            );                
                        })
                    )}
                </div> 
            </form>
            
        </div>
    );
}


export default App;
