import { Provider } from "./components/ui/provider"
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import IniciarSesion from './IniciarSesion';
import Help from './Help';
import InformacionPersonal from './InformacionPersonal';
import Carousel from './Carousel';
import Productos from './Productos';
import Error from './Error';
import { defaultSystem } from '@chakra-ui/react';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem('user', JSON.stringify(user));
    }
  }, [user]);

  return (
    <Provider value={defaultSystem} height="1440px">
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/IniciarSesion" element={<IniciarSesion setUser={setUser} />} />
          <Route path="/Help" element={<Help />} />
          <Route path='/InformacionPersonal' element={<InformacionPersonal />} />
          <Route path='/Error' element={<Error />} />
          <Route path='/' element={<><Carousel /><Productos /></>}></Route>
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
