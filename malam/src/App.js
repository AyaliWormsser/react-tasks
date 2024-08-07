import React, { useState, useEffect } from 'react';
import './App.css';
import TaskList from './components/TaskList';
import AddTask from './components/AddTask';
import EditTask from './components/EditTask';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [taskToEdit, setTaskToEdit] = useState(null);


  const fetchTasks = async () => {
    try {
      const response = await axios.get('https://localhost:7074/api/Task');
      console.log('Response data:', response.data); 
      setTasks(response.data);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  // const addTask = (newTask) => {
  //   setTasks([...tasks, newTask]);
  // };

  const addTask = async (newTask) => {
    try {
      await axios.post('https://localhost:7074/api/Task', newTask);
      fetchTasks();
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // const editTask = (index, updatedTask) => {
  //   const updatedTasks = tasks.map((task, i) => (i === index ? updatedTask : task));
  //   setTasks(updatedTasks);
  // };

  const editTask = async (index, updatedTask) => {
    try {
      await axios.put(`https://localhost:7074/api/Task/${updatedTask.id}`, updatedTask);
      fetchTasks();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<TaskList tasks={tasks} setTasks={setTasks} setTaskToEdit={setTaskToEdit} fetchTasks={fetchTasks} />} />
        <Route path="/add" element={<AddTask onAdd={addTask} />} />
        <Route path="/edit" element={<EditTask task={taskToEdit} onEdit={editTask} />} />
      </Routes>
    </Router>
  );
}

export default App;
