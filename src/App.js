import React from 'react';
import TaskList from './components/TaskList.js';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import NewTaskForm from './components/NewTaskForm.js';

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
    getTasksFromAPI();
  }, []);

  const getTasksFromAPI = () => {
    axios
      .get('https://task-list-api-c17.herokuapp.com/tasks')
      .then((response) => {
        setTasks(response.data);
      })
      .catch((error) => {
        console.log('Oh no where are the tasks???');
      });
  };

  const toggleComplete = (id) => {
    const updatedTasks = [...tasks];
    let targetTask;
    let endpoint;

    for (let task of updatedTasks) {
      if (task.id === id) {
        targetTask = task;
        if (targetTask.isComplete) {
          endpoint = 'mark_incomplete';
        } else {
          endpoint = 'mark_complete';
        }
      }
    }

    axios
      .patch(
        `https://task-list-api-c17.herokuapp.com/tasks/${targetTask.id}/${endpoint}`
      )
      .then((response) => {
        targetTask.isComplete = !targetTask.isComplete;
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

  const makeNewTask = (data) => {
    axios
      .post('https://task-list-api-c17.herokuapp.com/tasks', data)
      .then((response) => {
        getTasksFromAPI();
      })
      .catch((error) => {
        console.log('Oh no! Cant make new task!');
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <NewTaskForm handleFormSubmission={makeNewTask} />
          {/* <NewTaskForm /> */}
          <TaskList
            tasks={tasks}
            toggleComplete={toggleComplete}
            deleteTaskCallback={deleteTask}
          />
        </div>
      </main>
    </div>
  );
};

export default App;
