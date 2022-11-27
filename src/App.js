import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Emplisting from './Emplisting';
import EmpEdit from './EmpEdit';

function App() {
  return (
    <>
      <div className="App"> 
        <div>
        <h1>Courses Information</h1>
        </div>
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Emplisting/>}></Route>
          <Route path='/employee/edit/:empid' element={<EmpEdit/>}></Route>
        </Routes>
      </BrowserRouter>
      </div>
    </>
  );

}

export default App;
