import ReactDOM from 'react-dom/client';
import runApp from './main.jsx';

const run = () => {
  const app = runApp();
  ReactDOM.createRoot(document.getElementById('tasklist')).render(app);
};

run();
