import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import store from './app/store';
import { Provider } from 'react-redux'; // 여기서 Provider를 임포트

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>,
);
