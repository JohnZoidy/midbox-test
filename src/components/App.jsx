/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef } from 'react';
import { uniqueId } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import { taskSelectors, addTask, removeTasks } from '../slices/tasksSlice.js';
import Task from './Task.jsx';

const App = () => {
  const dispatch = useDispatch();
  const dropdown = useRef();
  const taskList = useSelector(taskSelectors.selectAll);
  const tasks = {
    all: taskList,
    active: taskList.filter((task) => !task.completed),
    completed: taskList.filter((task) => task.completed),
  };
  const [taskName, setText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sort, setSort] = useState('all');

  const addTaskHandler = (e) => {
    e.preventDefault();
    dispatch(
      addTask({ id: uniqueId('tk_'), name: taskName, completed: false }),
    );
    setText('');
  };

  const dropdownHandler = () => {
    setIsActive(!isActive);
    if (!isActive) {
      dropdown.current.style.transform = 'rotate(90deg)';
    }
    if (isActive) {
      dropdown.current.style.transform = 'rotate(0deg)';
    }
  };

  useEffect(() => {
    const tasksInStorage = JSON.parse(localStorage.getItem('taskList'));
    window.addEventListener(
      'beforeunload',
      localStorage.setItem('taskList', JSON.stringify(taskList)),
    );
    if (tasksInStorage) {
      tasksInStorage.map((t) => dispatch(
        addTask({ id: uniqueId('tk_'), name: t.name, completed: t.completed }),
      ));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks.all));
  }, [tasks]);

  return (
    <>
      <h1>todos</h1>
      <div className="card">
        <div className="task">
          <div
            ref={dropdown}
            onClick={dropdownHandler}
            type="button"
            className="dropdown"
          >
            &#10095;
          </div>
          <h2>What should I do?</h2>
        </div>
        <div className={isActive ? 'tasklist' : 'tasklist hide'}>
          {tasks[sort].length === 0 ? <div className="task">{`There's nothing ${sort} tasks yet`}</div> : tasks[sort].map(({ id, name, completed }) => (
            <Task
              key={id}
              id={id}
              name={name}
              completed={completed}
              sort={sort}
            />
          ))}
        </div>
        <div className="foot">
          <form onSubmit={(e) => addTaskHandler(e)}>
            <label htmlFor="textField">
              You can add a task below:
              <input
                name="textField"
                type="text"
                required
                placeholder="Enter a task name"
                value={taskName}
                onChange={(e) => setText(e.target.value)}
              />
            </label>
            <button className="btn-active" type="submit">Add task</button>
          </form>
          <div className="filters">
            <div>{`${tasks.active.length} items left`}</div>
            <div>
              <button
                className={sort === 'all' ? 'btn-active' : 'btn'}
                type="button"
                onClick={() => setSort('all')}
              >
                All
              </button>
              <button
                className={sort === 'active' ? 'btn-active' : 'btn'}
                type="button"
                onClick={() => setSort('active')}
              >
                Active
              </button>
              <button
                className={sort === 'completed' ? 'btn-active' : 'btn'}
                type="button"
                onClick={() => setSort('completed')}
              >
                Completed
              </button>
            </div>
            <div>
              <button
                type="button"
                className="btn"
                onClick={() => dispatch(removeTasks(tasks.completed.map((task) => task.id)))}
              >
                Clear completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
