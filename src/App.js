import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  // const TASKS = [
  //   {
  //     id: 1,
  //     title: 'Mow the lawn',
  //     isComplete: false,
  //   },
  //   {
  //     id: 2,
  //     title: 'Cook Pasta',
  //     isComplete: true,
  //   },
  // ];

  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log('Oh no where are the tasks???');
      });
  }, []);

  const toggleComplete = (id) => {
    const updatedTasks = [...tasks];
    let targetTask;

    for (let task of updatedTasks) {
      if (task.id === id) {
        targetTask = task;
      }
    }

    let endpoint;
    // let mark_complete;
    axios.patch(
      `https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/${endpoint}`
    ),
      {
        description: targetTask.description,
        title: targetTask.title,
        isComplete: targetTask.is_complete,
      }
        .then((response) => {
          targetTask.isComplete = !targetTask.isComplete;
          if (targetTask.isComplete) {
            // let mark_complete = endpoint
            endpoint = 'mark_complete';
          } else {
            endpoint = 'mark_incomplete';
          }
          setTasks(updatedTasks);
        })
        .catch((error) => {
          console.log('Sorry, unable to update task');
        });
    // console.log('toggled', id);
    // const updatedTasks = [...tasks];

    // for (let task of updatedTasks) {
    //   if (task.id === id) {
    //     task.isComplete = !task.isComplete;
    //   }
    // }
    // setTasks(updatedTasks);
  };

  const deleteTask = (id) => {
    // const newTasks = tasks.filter((task) => task.id !== id);
    // setTasks(newTasks);
    axios
      .delete(`https://task-list-api-c17.herokuapp.com/tasks/${id}`)
      .then((response) => {
        const newTasks = tasks.filter((task) => task.id !== id);
        setTasks(newTasks);
      })
      .catch((error) => {
        console.log('Could not delete task');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          {
            <TaskList
              tasks={tasks}
              toggleComplete={toggleComplete}
              deleteTaskCallback={deleteTask}
            />
          }
        </div>
      </main>
    </div>
  );
};

export default App;
