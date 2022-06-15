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
      <input type="checkbox" checked={completed} onChange={() => handleChange(id)} />
      <p className={completed ? 'completed' : ''}>{name}</p>
    </div>
  );
};

export default Task;
