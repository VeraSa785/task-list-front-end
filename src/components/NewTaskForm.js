import React from 'react';
import './NewTaskForm.css';
import PropTypes from 'prop-types';
import { useState } from 'react';

const defaultTask = { description: '', title: '', isComplete: false };

const NewTaskForm = (props) => {
  const [taskData, setTasksData] = useState(defaultTask);

  const handleFormInput = (event) => {
    const inputElement = event.target;
    const name = inputElement.name;
    const value = inputElement.value;

    const newListData = { ...taskData };
    newListData[name] = value;
    // newListData['isComplete'] = false;
    setTasksData(newListData);
  };

  const handleFormSubmission = (event) => {
    event.preventDefault();
    props.handleFormSubmission(taskData);
  };

  return (
    <form onSubmit={handleFormSubmission}>
      <label htmlFor="description">Description</label>
      <input
        name="description"
        type="text"
        value={taskData.description}
        onChange={handleFormInput}
      />
      <label htmlFor="title">Title</label>
      <input
        name="title"
        type="text"
        value={taskData.title}
        onChange={handleFormInput}
      />
      <input type="submit" />
    </form>
  );
};

NewTaskForm.propTypes = { handleFormSubmission: PropTypes.func.isRequired };

export default NewTaskForm;
