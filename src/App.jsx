import React, { useState, useEffect } from 'react';
import FormCom from './components/FormCom';
import './App.css';

function App() {
  const [taskList, setTaskList] = useState([]);

  useEffect(() => {
    const storedTaskList = JSON.parse(localStorage.getItem('taskList'));
    if (storedTaskList) {
      setTaskList(storedTaskList);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(taskList));
  }, [taskList]);

  const handleTaskSubmit = (newTask) => {
    setTaskList([...taskList, newTask]);
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

  const toDos = taskList.map((task, index) => (
    <p
      key={index}
      style={{ display: task.visibility ? 'block' : 'none' }}
      onClick={() => handleTaskComplete(index)}
      className={task.completed ? 'completed' : ''}
    >
      Task Name: {task.taskName} is Due: {task.taskDate}
    </p>
  ));

  return (
    <>
      <FormCom handleTaskSubmit={handleTaskSubmit} />
      <div>
        <div>
          <fieldset>
            <label>Sorting Functions: </label>
            <button onClick={handleSortByDate}>Sort by Date</button>
            <button onClick={handleSortByName}>Sort by Name</button>
          </fieldset>
          <fieldset>
            <label>Visibility Functions: </label>
            <button onClick={handleToggleVisibility}>Toggle Visibility</button>
            <button onClick={handleClearCompleted}>Clear Completed</button>
          </fieldset>
        </div>
        {toDos}
      </div>
    </>
  );
}

export default App;


