import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import OrderRequestForm from './components/forms/orderRequestForm';
import LandingPage from './pages/landing/LandingPage';
import NavBar from './components/nav-bar/navBar';
import OrderButton from './components/requestOrderButton/orderButton';
import WhereTobuy from './pages/where_to_buy/whereToBuy';
import OrderPage from './pages/order/orderpage';
import React, { useState, useEffect } from 'react';

export const Order = React.createContext();

function App() {

  let [order, setOrder] = useState(localStorage.getItem('order')
    ?
    JSON.parse(localStorage.getItem('order')) :
    {
      standardOrder: {},
      customOrder: {},
    })

  useEffect(() => {
    localStorage.setItem('order', JSON.stringify(order))
  }, [order])


  return (
    <Router>
      <meta name="viewport" content="width=device-width, initial-scale=1.0"></meta>
      <div className="App">
        <Order.Provider value={[order, setOrder]}>
          <NavBar />
          {/* <OrderButton/> */}
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="locations" element={<WhereTobuy />} />
            <Route path="order" element={<OrderPage />} />
          </Routes>
        </Order.Provider>
      </div>
    </Router>
  );
}

export default App;
