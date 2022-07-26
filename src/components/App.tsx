/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { useState, useEffect, useRef, FormEvent } from 'react';
import uniqueId from 'lodash.uniqueid';
import { useSelector, useDispatch } from 'react-redux';
import { taskSelectors, addTask, removeTasks } from '../slices/tasksSlice';
import Task from './Task';
import { TaskType } from '../@types/task.d';

enum Sort {
  ALL = 'all',
  ACTIVE = 'active',
  COMPLETED = 'completed',
}

const App: React.FC = () => {
  const dispatch = useDispatch();
  const dropdown = useRef<HTMLDivElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const taskList = useSelector(taskSelectors.selectAll);
  const tasks = {
    all: taskList,
    active: taskList.filter((task) => !task.completed),
    completed: taskList.filter((task) => task.completed),
  };
  const [taskName, setText] = useState('');
  const [isActive, setIsActive] = useState(false);
  const [sort, setSort] = useState<Sort>(Sort.ALL);

  const addTaskHandler = (e: FormEvent) => {
    e.preventDefault();
    dispatch(
      addTask({ id: uniqueId('tk_'), name: taskName, completed: false }),
    );
    setText('');
    input.current?.focus();
  };

  const dropdownHandler = () => {
    setIsActive(!isActive);
    if (!isActive && dropdown.current) {
      dropdown.current.style.transform = 'rotate(90deg)';
    }
    if (isActive && dropdown.current) {
      dropdown.current.style.transform = 'rotate(0deg)';
    }
  };

  useEffect(() => {
    const tasksInStorage: Array<TaskType> = JSON.parse(localStorage.getItem('taskList') || '[]');
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
            />
          ))}
        </div>
        <div className="foot">
          <form onSubmit={(e: FormEvent) => addTaskHandler(e)}>
            <label htmlFor="textField">
              You can add a task below:
              <input
                ref={input}
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
                onClick={() => setSort(Sort.ALL)}
              >
                All
              </button>
              <button
                className={sort === 'active' ? 'btn-active' : 'btn'}
                type="button"
                onClick={() => setSort(Sort.ACTIVE)}
              >
                Active
              </button>
              <button
                className={sort === 'completed' ? 'btn-active' : 'btn'}
                type="button"
                onClick={() => setSort(Sort.COMPLETED)}
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
