import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddTask = ({ onAdd }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = useNavigate();

  const handleAddTask = (e) => {
    e.preventDefault();

    const newTask = {
      title,
      description,
      dueDate,
      completed: false
    };

    onAdd(newTask);

    setTitle('');
    setDescription('');
    setDueDate('');
    navigate('/');
  };

  return (
    <form onSubmit={handleAddTask}>
      <div>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter title"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Description:
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter description"
            required
          />
        </label>
      </div>
      <div>
        <label>
          Due Date:
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            required
          />
        </label>
      </div>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTask;
