import React, { useState } from 'react';

function FormCom(props) {
  const [taskName, setTaskName] = useState('');

  const handleTaskSubmit = (event) => {
    event.preventDefault();

    let name = document.forms['taskSubmit']['taskName'].value;
    let date = document.forms['taskSubmit']['date'].value;

    const newTask = {
      taskName: name,
      taskDate: date,
      visibility: true,
      completed: false
    };

    props.handleTaskSubmit(newTask);

    setTaskName('');


  };

  return (
    <>
      <form name="taskSubmit" onSubmit={handleTaskSubmit}>
        <fieldset>
          <input
            type="text"
            placeholder="Task Name"
            id="taskName"
            value={taskName}
            onChange={(e) => setTaskName(e.target.value)}
          />
          <br />
          <label htmlFor="date">Due Date for Task: </label>
          <input type="date" id="date" name="date" />
        
          <button type="submit">Submit</button>
        </fieldset>
      </form>
    </>
  );
}

export default FormCom;

