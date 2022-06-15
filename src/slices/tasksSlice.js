/* eslint no-param-reassign: "off" */
import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';

const tasksAdapter = createEntityAdapter();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTasks: tasksAdapter.removeMany,
    updateTask: tasksAdapter.updateOne,
    addToStorage(state, action) {
      localStorage.setItem('taskList', JSON.stringify(action.payload));
    },
  },
});

export const taskSelectors = tasksAdapter.getSelectors((state) => state.tasks);

export const {
  addTask, removeTasks, updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
