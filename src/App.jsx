import { BrowserRouter as Router, Routes, Route, } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import NavBar from './components/nav-bar/navBar';
import OrderButton from './components/requestOrderButton/orderButton';
import WhereTobuy from './pages/where_to_buy/whereToBuy';
import OrderPage from './pages/order/orderpage';
import ContactUsPage from './pages/contact_us/ContactUsPage';
import React, { useState, useEffect } from 'react';
import SendRequestPage from './pages/send_request/SendRequestPage';
import PageNotFound from './pages/page_not_found/pageNotFound';

export const Order = React.createContext();

function App() {
  let [order, setOrder] = useState(
    localStorage.getItem('order')
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
          <OrderButton/>
          <Routes>
            <Route path="/" exact element={<LandingPage />} />
            <Route path="locations" element={<WhereTobuy />} />
            <Route path="order" element={<OrderPage />} />
            <Route path={"order/:section/"} element={<OrderPage />} />
            <Route path={"order/:section/:subsection"} element={<OrderPage />} />
            <Route path="send-order-request" element={<SendRequestPage />} />
            <Route path="send-order-request/:section" element={<SendRequestPage />} />
            <Route path="send-order-request/:section/:subsection" element={<SendRequestPage />} />
            <Route path="contact-us" element={<ContactUsPage />} />
            <Route path="/*" element={<PageNotFound />} />
          </Routes>
        </Order.Provider>
      </div>
    </Router>
  );
}

export default App;
