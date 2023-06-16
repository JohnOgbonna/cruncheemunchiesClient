import {BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderRequestForm from './components/forms/orderRequestForm';
import LandingPage from './pages/landing/LandingPage';
import NavBar from './components/nav-bar/navBar';
import OrderButton from './components/requestOrderButton/orderButton';
import WhereTobuy from './pages/where_to_buy/whereToBuy';
import OrderPage from './pages/order/orderpage';
function App() {
  return (
     <Router> 
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="App">
        <NavBar/>
        {/* <OrderButton/> */}
        <Routes>
          <Route path = "/" exact element = {<LandingPage/>}/>
          <Route path = "locations" element = {<WhereTobuy/>}/>
          <Route path = "order" element = {<OrderPage/>}/>
      
      </Routes>
    </div>
    </Router> 
  );
}

export default App;
