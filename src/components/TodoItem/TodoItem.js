import React from "react";
import styles from "./ToDoItem.module.css";

const TodoItem = ({ todo, removeHandler, updateTodo }) => {
    return (
        <div className={styles.itemContainer}>
            <div>
                <input
                    type="checkbox"
                    name={`checkbox-${todo.id}`}
                    checked={todo.completed}
                    data-testid={`checkbox-${todo.id}`}
                    onChange={() => updateTodo(todo.id)}
                />
            </div>
            <label
                htmlFor={`checkbox-${todo.id}`}
                onClick={() => updateTodo(todo.id)}
                className={!todo.completed ? "" : styles.completed}
            >
                {todo.title}
            </label>
            <button
                className={styles.closeBtn}
                data-testid={`close-btn-${todo.id}`}
                onClick={() => removeHandler(todo.id)}
            >
                X
            </button>
        </div>
    );
};

export default TodoItem;
