import React from 'react';
import './App.css';
import AppNavbar from './components/AppNavbar/AppNavbar';
import CharacterList from './views/CharacterList/CharacterList';
import Character from './views/Character/Character';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <AppNavbar></AppNavbar>
      <div className="d-flex justify-content-center">
        <Switch>
          <Route path="/character/:id" component={ Character } />
          <Route path="/" component={ CharacterList } />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
