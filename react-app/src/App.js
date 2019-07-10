import React from 'react';
import { Route, Link } from 'react-router-dom';
import UsersList from './components/UsersList';
import User from './components/User';

import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Link to="/">
          <h1>Blog</h1>
        </Link>
      </header>
      <main>
        <Route path="/" exact component={UsersList} />
        <Route path="/users/:id" component={User} />
      </main>
    </div>
  );
}

export default App;
