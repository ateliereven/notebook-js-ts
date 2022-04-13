import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { store } from './state';
import 'bulmaswatch/slate/bulmaswatch.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import App from './App';


ReactDOM.render(
  <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);


