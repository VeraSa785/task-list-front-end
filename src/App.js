import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState } from 'react';

const App = () => {
  const TASKS = [
    {
      id: 1,
      title: 'Mow the lawn',
      isComplete: false,
    },
    {
      id: 2,
      title: 'Cook Pasta',
      isComplete: true,
    },
  ];

  const [tasks, setTasks] = useState(TASKS);

  const toggleComplete = (id) => {
    console.log('toggled', id);
    const updatedTasks = [...tasks];

    for (let task of updatedTasks) {
      if (task.id === id) {
        task.isComplete = !task.isComplete;
      }
    }
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>{<TaskList tasks={tasks} toggleComplete={toggleComplete} />}</div>
      </main>
    </div>
  );
};

export default App;
