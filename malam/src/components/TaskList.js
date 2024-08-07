import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const TaskList = ({ tasks, setTasks, setTaskToEdit, fetchTasks }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriterion, setSortCriterion] = useState("date"); // Default to sorting by date
  const navigate = useNavigate();

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleAddTask = () => {
    navigate('/add');
  };

  const handleEditTask = (task, index) => {
    setTaskToEdit({ ...task, index });
    navigate('/edit');
  };

  const handleRemoveTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const handleToggleCompletion = (index) => {
    setTasks(
      tasks.map((task, i) =>
        i === index ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const filteredTasks = tasks.filter(task =>
    (task.title || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
    (task.description || "").toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = filteredTasks.sort((a, b) => {
    if (sortCriterion === "date") {
      return new Date(a.dueDate) - new Date(b.dueDate);
    } else if (sortCriterion === "completion") {
      return a.completed - b.completed;
    }
    return 0;
  });

  return (
    <div>
      <h1>Tasks List</h1>
      
      <input
        type="text"
        placeholder="Search tasks..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      
      <div>
        <label>
          Sort by:
          <select value={sortCriterion} onChange={(e) => setSortCriterion(e.target.value)}>
            <option value="date">Due Date</option>
            <option value="completion">Completion Status</option>
          </select>
        </label>
      </div>
      
      <button onClick={handleAddTask}>Add Task</button>
      
      <ul>
        {sortedTasks.map((task, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleCompletion(index)}
            />
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.title}
            </span>
            <button onClick={() => handleEditTask(task, index)}>Edit Task</button>
            <button onClick={() => handleRemoveTask(index)}>Delete Task</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
