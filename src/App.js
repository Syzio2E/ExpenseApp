import './App.css';
import Signup from './components/layout/Signup'
import Login from './components/layout/Login'
import Home from './components/layout/Home'
import { Routes,Route } from 'react-router-dom';
import Header from './components/layout/Header';
import React from 'react';


function App() {
  return (
    <React.Fragment>
      <Header/>
     <div className='main_body'>
    <Routes>
      <Route exact path='/' Component={Signup}/>
      <Route  path='/login' Component={Login}/>
      <Route path='home' Component={Home}/>
    </Routes>
    </div>
    </React.Fragment>
    
  );
}

export default App;
