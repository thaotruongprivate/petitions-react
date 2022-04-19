import React, { FunctionComponent } from 'react';
import './App.css';
import { configureStore } from './store/configureStore';
import { Provider } from 'react-redux';
import BasePage from './components/BasePage';

const App: FunctionComponent = () => {
  const store = configureStore();

  return (
    <>
      <div id="app">
        <Provider store={store}>
          <BasePage />
        </Provider>
      </div>
    </>
  );
};

export default App;
