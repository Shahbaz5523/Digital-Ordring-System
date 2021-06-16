import './App.css';
import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import CheifPanel from './components/KitchenPanel/CheifPanel';
import Admin from './components/AdminPanel/Admin.jsx';
import Bills from "./components/AdminPanel/Bills/Bills.jsx"; 
import AddTables from './components/AdminPanel/AddTables/AddTables';
import AddDish from './components/AdminPanel/AddDish/AddDish';
import Feedback from './components/AdminPanel/feedback/Feedback';
import Report from './components/AdminPanel/Report/Report';

// Import Components
import LoginContainer from './components/LoginPanel/LoginContainer/LoginContiainer';
import UserContainer from './components/UserPanel/UserContainer/UserContainer';

// Import React router
import {
  BrowserRouter as Router, Routes, Route
} from 'react-router-dom';


function App() {

  return (

    <Router>
      <div className="App">
        <Routes>
          <Route path='/' element={<LoginContainer />} />
          <Route path='/userpanel' element={<UserContainer />} />
          <Route path='/chefpanel' element={<CheifPanel />} />

          <Route path='/admin/*' element={<Admin />}>
            <Route path="/" element={<Bills />} />
            <Route path="/addtables" element={<AddTables />} />
            <Route path="/adddishes" element={<AddDish />} />
            <Route path="/feedback"  element={<Feedback/>} />
            <Route path="/report"  element={<Report/>} />
          </Route>

        </Routes>
        
      </div>
      <ToastContainer />
    </Router>
    

  );
}

export default App;
