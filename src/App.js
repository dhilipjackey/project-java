
import './App.css';
import Adminhomepage from './Pages/Adminhomepage';
import Adminlogin from './Pages/Adminlogin';
import Home from './Pages/Home';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Route, Routes } from 'react-router-dom'
import DataOwner from './Pages/DataOwner';
import DataUser from './Pages/DataUser';
import DataUserLogin from './Pages/Datauserlogin';
import DataOwnerLogin from './Pages/Dataownerlogin';
import Dataownerhomepage from './Pages/Dataownerhomepage';
import DataUserHomepage from './Pages/Datauserhomepage';
import Dataownerupload from './Pages/Dataownerupload';
import Adminmanagefiles from './Pages/Adminmanagefiles';
import Adminfilepermission from './Pages/Adminfilepermission';
import Datauserdownload from './Pages/Datauserdownload';

function App() {
  return (
    <div>
       <Routes>
       <Route path="/" element={<Home/>} />
       <Route path="/admin-login" element={<Adminlogin/>} />
       <Route path="/adminhomepage" element={<Adminhomepage/>} />
       <Route path="/dataowner" element={<DataOwner/>} />
       <Route path="/datauser" element={<DataUser/>} />
       <Route path="/data-user" element={<DataUserLogin/>} />
       <Route path="/data-owner" element={<DataOwnerLogin/>} />
       <Route path="/ownerhomepage" element={<Dataownerhomepage/>} />
       <Route path="/userhomepage" element={<DataUserHomepage/>} />
       <Route path="/upload" element={<Dataownerupload/>} />
       <Route path="/managefiles" element={<Adminmanagefiles/>} />
       <Route path="/filepermission" element={<Adminfilepermission/>} />
       <Route path="/datauserdownload" element={<Datauserdownload/>} />
       </Routes>
    </div>
  );
}

export default App;
