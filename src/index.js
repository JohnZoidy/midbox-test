import ReactDOM from 'react-dom/client';
import runApp from './main.jsx';
import '../assets/app.scss';

const run = () => {
  const app = runApp();
  ReactDOM.createRoot(document.getElementById('tasklist')).render(app);
};

run();
