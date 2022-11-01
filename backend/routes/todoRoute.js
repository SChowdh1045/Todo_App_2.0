import express from 'express';
import {getTodos, createTodo, deleteTodo, toggleTodoStatus} from '../controllers/todoController.js';

const router = express.Router();

router.get("/todos", getTodos);
router.post("/todo/new", createTodo);
router.get("/todo/toggleStatus/:id", toggleTodoStatus);
router.delete("/todo/delete/:id", deleteTodo);

export default router;