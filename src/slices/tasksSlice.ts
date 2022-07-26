/* eslint no-param-reassign: "off" */
import { createSlice, createEntityAdapter, EntityAdapter } from '@reduxjs/toolkit';
import { RootState } from '.';
import { TaskType } from '../@types/task.d';


const tasksAdapter: EntityAdapter<TaskType> = createEntityAdapter<TaskType>();

const initialState = tasksAdapter.getInitialState();

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addTask: tasksAdapter.addOne,
    removeTasks: tasksAdapter.removeMany,
    updateTask: tasksAdapter.updateOne,
  },
});

export const taskSelectors = tasksAdapter.getSelectors((state: RootState) => state.tasks);

export const {
  addTask, removeTasks, updateTask,
} = tasksSlice.actions;

export default tasksSlice.reducer;
