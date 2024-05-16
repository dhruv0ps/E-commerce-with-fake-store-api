
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from './container/Header';
import ProductListing from './container/ProductListing';
import ProductDetails from './container/ProductDetails';

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min";
import Section from './container/Section';
import ProductLimit from './container/ProductLimit';
import Productcategories from './container/Productcategories';
import Carting from './container/Carting';
import Login from './container/Login';
import Usercarting from './container/Usercarting';
import PayPage from './container/PayPage';
import Invoice from './container/Invoice';
function App() {
  return (
    <div className="App">
    <Router>
    <Header/>
   
      <Routes>
        <Route path='' element={<ProductLimit/>}/>
        <Route path='/productlisting' element={<ProductListing/>}/>
        <Route path='/product/:productId' element={<ProductDetails/>}/>
        <Route path='/productcategories/:category' element={<Productcategories/>}/>
        <Route path='/carting/:productId' element={<Carting/>}/>
        <Route path='/login/:productId' element={<Login/>}/>
        <Route path='/usercarting' element={<Usercarting/>}/>
        <Route path='/paypage' element={<PayPage/>}/>
        <Route path='/invoice' element={<Invoice/>}/>
        <Route>404 not found</Route>
      </Routes>
    </Router>
    </div>
  );
}

export default App;
