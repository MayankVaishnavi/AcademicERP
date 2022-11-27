import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Emplisting from './Emplisting';
import EmpEdit from './EmpEdit';
import Login from './Login';
import Page404 from './Page404';
function App() {
  return (
    <>
      <div className="App"> 
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/course' element={<Emplisting/>}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit/>}></Route>
          <Route path="*" element={<Page404/>} />
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );

}

export default App;
