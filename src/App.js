import React from 'react';
import ReactDOM from 'react-dom';
import './App.scss';
import UserForm from './Form.js';

function App() {
  return (
    <div className="App">
     <UserForm />
    </div>
  );
}

export default App;

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);