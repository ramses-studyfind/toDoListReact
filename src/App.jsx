import React, { useState, useEffect } from 'react';
import FormCom from './components/FormCom';
import './App.css';

function App() {
  const [task, setTask] = useState({
    taskName: '',
    taskDate: '',
    visibility: '',
    completed: ''
  });
  const [taskList, setTaskList] = useState([]);
  const [filterDate, setFilterDate] = useState('');

  useEffect(() => {
    console.log('taskList updated:', taskList);
  }, [taskList, filterDate]);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTaskList(storedTasks);
  }, []);

  const handleTaskSubmit = (newTask) => {
    setTaskList([...taskList, newTask]);
    localStorage.setItem('tasks', JSON.stringify([...taskList, newTask]));
  };

  const handleSortByDate = () => {
    const sortedList = [...taskList].sort((a, b) => {
      return new Date(a.taskDate) - new Date(b.taskDate);
    });
    setTaskList(sortedList);
  };

  const handleSortByName = () => {
    const sortedList = [...taskList].sort((a, b) => {
      return a.taskName.localeCompare(b.taskName);
    });
    setTaskList(sortedList);
  };

  const handleTaskComplete = (index) => {
    const updatedTaskList = [...taskList];
    updatedTaskList[index].completed = !updatedTaskList[index].completed;
    updatedTaskList[index].visibility = !updatedTaskList[index].completed;
    setTaskList(updatedTaskList);
  };

  const handleToggleVisibility = () => {
    const updatedTaskList = taskList.map((task) => {
      if (task.completed) {
        return { ...task, visibility: !task.visibility };
      }
      return task;
    });
    setTaskList(updatedTaskList);
  };

  const handleClearCompleted = () => {
    const updatedTaskList = taskList.filter((task) => !task.completed);
    setTaskList(updatedTaskList);
  };

  const handleFilterTasks = () => {
    const filteredList = taskList.filter((task) => task.taskDate === filterDate);
    setTaskList(filteredList);
  };

  const handleResetFilter = () => {
    setTaskList(JSON.parse(localStorage.getItem('tasks')) || []);
    setFilterDate('');
  };

  const toDos = taskList.map((task, index) => (
    <li
      key={index}
      style={{ display: task.visibility ? 'block' : 'none' }}
      onClick={() => handleTaskComplete(index)}
      id="taskList"
      className={task.completed ? 'completed' : ''}
    >
      Your task: {task.taskName} is due: {task.taskDate}
    </li>
  ));

  return (
    <>
      <div className="fixed-menu">
        <div className="form">
          <FormCom handleTaskSubmit={handleTaskSubmit} />
        </div>
        <div className="button-group">
          <fieldset>
            <label>Sorting Functions:</label>
            <button onClick={handleSortByDate}>Sort by Date</button>
            <button onClick={handleSortByName}>Sort by Name</button>
          </fieldset>
          <fieldset>
            <label>Visibility Functions:</label>
            <button onClick={handleToggleVisibility}>Toggle Visibility</button>
            <button onClick={handleClearCompleted}>Clear Completed</button>
          </fieldset>
          <div className="filter-group">
          <fieldset>
            <label>Filter Tasks:</label>
            <input
              type="date"
              value={filterDate}
              onChange={(e) => setFilterDate(e.target.value)}
            />
            <button onClick={handleFilterTasks}>Apply</button>
            <button onClick={handleResetFilter}>Reset</button>
          </fieldset>
        </div>
        </div>

      </div>
      <div className="todos">
        <h1>Tasks:</h1>
        <ul>{toDos}</ul>
      </div>
    </>
  );
}

export default App;
