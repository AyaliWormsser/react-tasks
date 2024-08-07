import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";


const EditTask = ({ task, onEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const navigate = new useNavigate();

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setDescription(task.dueDate);
    }
  }, [task]);

  const handleEditTask = async (e) => {
    e.preventDefault();

    const updatedTask = {
      ...task,
      title,
      description,
      dueDate
    };

    // onEdit(task.index, updatedTask);
    // navigate('/');
    // if (!task) {
    //   return (
    //     <div>louding...</div>
    //   )
    // }


    try {
      // שלח בקשה לשרת לעדכון המשימה
      await axios.put(`https://localhost:7074/api/Task/${task.id}`, updatedTask);
      // עדכן את רשימת המשימות בצד הלקוח
      onEdit(task.index, updatedTask);
      navigate('/');
    } catch (error) {
      console.error('Error updating task:', error);
    }
  }





  return (
    <form onSubmit={handleEditTask}>
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
      <button type="submit">Save Changes</button>
    </form>
  );
};

export default EditTask;


