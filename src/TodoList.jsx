import React, { useState } from "react";

export default function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [task, setTask] = useState("");
    const [filter, setFilter] = useState("all");

    const addTask = () => {
        if (task.trim() === "") return;
        setTasks([...tasks, { text: task, completed: false, editing: false }]);
        setTask("");
    };

    const toggleComplete = (index) => {
        const newTasks = [...tasks];
        newTasks[index].completed = !newTasks[index].completed;
        setTasks(newTasks);
    };

    const editTask = (index, newText) => {
        const newTasks = [...tasks];
        newTasks[index].text = newText;
        newTasks[index].editing = false;
        setTasks(newTasks);
    };

    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, i) => i !== index);
        setTasks(newTasks);
    };

    const filteredTasks = tasks.filter((t) =>
        filter === "all" ? true : filter === "completed" ? t.completed : !t.completed
    );

    return (
        <div className="todo-container">
            <input
                type="text"
                placeholder="Add a new task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
            />
            <button onClick={addTask}>Add Task</button>
            <div>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("completed")}>Completed</button>
                <button onClick={() => setFilter("pending")}>Pending</button>
            </div>
            <ul>
                {filteredTasks.map((t, index) => (
                    <li key={index} className={t.completed ? "completed" : ""}>
                        {t.editing ? (
                            <input
                                type="text"
                                defaultValue={t.text}
                                onBlur={(e) => editTask(index, e.target.value)}
                                autoFocus
                            />
                        ) : (
                            <span onDoubleClick={() => (t.editing = true)}>{t.text}</span>
                        )}
                        <input type="checkbox" checked={t.completed} onChange={() => toggleComplete(index)} />
                        <button onClick={() => (t.editing = true)}>Edit</button>
                        <button onClick={() => deleteTask(index)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}