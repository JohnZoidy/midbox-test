/* eslint-disable no-restricted-globals */
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Root from '../src/main.jsx';

test('Work 1', async () => {
  const { container } = render(Root());
  expect(await screen.findByText('todos')).toBeInTheDocument();
  await userEvent.type(screen.getByRole('textbox'), 'test task');
  userEvent.click(screen.getByRole('button', { name: /Add task/i }));

  expect(await screen.findByText('test task')).toBeInTheDocument();
  expect(await screen.findByText('1 items left')).toBeInTheDocument();

  await userEvent.type(screen.getByRole('textbox'), 'test task-2');
  userEvent.click(screen.getByRole('button', { name: 'Add task' }));

  await userEvent.type(screen.getByRole('textbox'), 'test task-3');
  userEvent.click(screen.getByRole('button', { name: 'Add task' }));
  expect(await screen.findByText('3 items left')).toBeInTheDocument();
  expect(await container.getElementsByClassName('checkbox')).toHaveLength(3);

  await userEvent.click(container.getElementsByClassName('checkbox')[1]);
  await userEvent.click(screen.getByRole('button', { name: 'Active' }));
  expect(await container.getElementsByClassName('checkbox')).toHaveLength(2);

  await userEvent.click(screen.getByRole('button', { name: 'Completed' }));
  expect(await container.getElementsByClassName('checkbox')).toHaveLength(1);
  await userEvent.click(screen.getByRole('button', { name: 'All' }));
  await userEvent.click(screen.getByRole('button', { name: 'Clear completed' }));
  expect(await container.getElementsByClassName('checkbox')).toHaveLength(2);
  expect(await screen.findByText('2 items left')).toBeInTheDocument();
});
