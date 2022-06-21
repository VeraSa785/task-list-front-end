import React, { useState } from 'react';
import PropTypes from 'prop-types';

import './Task.css';

const Task = ({
  id,
  title,
  isComplete,
  toggleComplete,
  deleteTaskCallback,
}) => {
  // const [complete, setComplete] = useState(isComplete);

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  const deleteTask = () => {
    deleteTaskCallback(id);
  };

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={() => toggleComplete(id)}
      >
        {title}
      </button>
      <button onClick={deleteTask} className="tasks__item__remove button">
        x
      </button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  toggleComplete: PropTypes.func.isRequired,
  deleteTaskCallback: PropTypes.func.isRequired,
};

export default Task;
