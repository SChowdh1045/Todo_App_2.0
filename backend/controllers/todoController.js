import Todo from '../models/todoModel.js';

const getTodos = async (req,res) => {
    const todos = await Todo.find();
    res.json(todos);    
}

const createTodo = (req,res) => {    
    const todo = new Todo({
        title: req.body.title
    });     
    todo.save();
    res.json(todo);
}

const toggleTodoStatus = async (req, res) => {
    const toggledTodo = await Todo.findById(req.params.id);
    toggledTodo.complete = !toggledTodo.complete;
    
    toggledTodo.save();
    res.json(toggledTodo);
}

const deleteTodo = async (req, res) => {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    res.json(deletedTodo);
}

export {getTodos, createTodo, deleteTodo, toggleTodoStatus};