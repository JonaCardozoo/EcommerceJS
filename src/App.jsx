import { ChakraProvider, theme } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import IniciarSesion from './IniciarSesion';
import Help from './Help';
import InformacionPersonal from './InformacionPersonal';

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
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/IniciarSesion" element={<IniciarSesion setUser={setUser} />} />
          <Route path="/Help" element={<Help />} />
          <Route path='/InformacionPersonal' element={<InformacionPersonal />} />
        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
