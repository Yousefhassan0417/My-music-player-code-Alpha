import React from 'react';
import Search from './Components/Search';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'; 
import Background from './Components/Background';
import{BrowserRouter} from 'react-router-dom';

function App() {
  return (
    <BrowserRouter basename="My-music-player-code-Alpha">
    <div className="App">
      <header className="App-header">
        <h1>My Music Player</h1>
      </header>
      <Search />
      <Background />
    </div>
    </BrowserRouter>
    
  );
}

export default App;

