import React, { useState, useEffect } from 'react';
import { uniqueId } from 'lodash';
import { useSelector, useDispatch } from 'react-redux';
import {
  taskSelectors, addTask, removeTasks,
} from '../slices/tasksSlice.js';
import Task from './Task.jsx';

const App = () => {
  const dispatch = useDispatch();
  const taskList = useSelector(taskSelectors.selectAll);
  const tasks = {
    all: taskList,
    active: taskList.filter((task) => !task.completed),
    completed: taskList.filter((task) => task.completed),
  };
  const [taskName, setText] = useState('');
  const [sort, setSort] = useState('all');

  const addTaskHandler = (e) => {
    e.preventDefault();
    dispatch(addTask({ id: uniqueId('tk_'), name: taskName, completed: false }));
    setText('');
  };

  useEffect(() => {
    const tasksInStorage = JSON.parse(localStorage.getItem('taskList'));
    window.addEventListener('beforeunload', localStorage.setItem('taskList', JSON.stringify(taskList)));
    if (tasksInStorage) {
      tasksInStorage.map((t) => dispatch(addTask({ id: uniqueId('tk_'), name: t.name, completed: t.completed })));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('taskList', JSON.stringify(tasks.all));
  }, [tasks]);

  return (
    <div className="plate">
      <h1>todos</h1>
      <div className="card">
        <h2>What should I do?</h2>
        <div className="tasklist">
          {tasks[sort]
            .map(({ id, name, completed }) => (
              <Task key={id} id={id} name={name} completed={completed} sort={sort} />
            ))}
        </div>
        <div className="foot">
          <form className="addtask" onSubmit={(e) => addTaskHandler(e)}>
            <label htmlFor="textField">
              You can add a task below:
              <input name="textField" type="text" required placeholder="Enter a task name" value={taskName} onChange={(e) => setText(e.target.value)} />
            </label>
            <button type="submit">Add task</button>
            <span>{`${tasks.active.length} items left`}</span>
          </form>
          <div>
            <button className={sort === 'all' ? 'btn-active' : ''} type="button" onClick={() => setSort('all')}>All</button>
            <button className={sort === 'active' ? 'btn-active' : ''} type="button" onClick={() => setSort('active')}>Active</button>
            <button className={sort === 'completed' ? 'btn-active' : ''} type="button" onClick={() => setSort('completed')}>Completed</button>
            <div className="clear">
              <button type="button" onClick={() => dispatch(removeTasks(tasks.completed.map((task) => task.id)))}>Clear completed</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
