import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderRequestForm from './components/forms/orderRequestForm';
import NavBar from './components/nav-bar/navBar';
function App() {
  return (
     <Router> 
    <div className="App">
      <NavBar/>
      <OrderRequestForm/>
    </div>
    </Router> 
  );
}

export default App;
