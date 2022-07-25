/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React from 'react';
import { useDispatch } from 'react-redux';
import { updateTask } from '../slices/tasksSlice.js';

const Task = ({ id, name, completed }) => {
  const dispatch = useDispatch();
  const handleChange = (taskId) => {
    dispatch(updateTask({ id: taskId, changes: { completed: !completed } }));
  };

  return (
    <div className="task">
      <div className={completed ? 'checkbox checked' : 'checkbox'} onClick={() => handleChange(id)} />
      <p className={completed ? 'completed' : ''}>{name}</p>
    </div>
  );
};

export default Task;
