import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './index.scss';
import './styles/icons/icons.scss';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store';

const container = document.getElementById('root');

if (container !== null) {
  const root = createRoot(container);

  root.render(
    <StrictMode>
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </StrictMode>
  );
}
