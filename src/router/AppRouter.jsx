import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Home from './../pages/Home';
import Brands  from "../pages/Brands";
import Firms from './../pages/Firms';
import Purchases from './../pages/Purchases';
import  Sales  from './../pages/Sales';
import  Products  from './../pages/Products';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          <Route path="" element={<Dashboard />}>
              {/* <Route path="" element= {<Home/>}  />   */}
              {/* Yukarıdaki yada aşağıdaki şekilde nested route içindeki ilk sayfa belirtilebilir */}
              <Route index element= {<Home/>}  />


              {/* Absolute path tanımlama */}
              {/* <Route path="/stock/brands" element={ <Brands/> }   />   */}
              {/* Relative Path tanımlama */}
              <Route path="brands" element={ <Brands/> }   />  
              <Route path="firms" element= {<Firms/>  }/>
              <Route path="purchases" element= {<Purchases/>  }/>
              <Route path="sales" element= {<Sales/>  }/>
              <Route path="products" element= { <Products/> }/>
          
          </Route>
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
