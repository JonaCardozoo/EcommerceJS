import { ChakraProvider, theme } from '@chakra-ui/react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './NavBar';
import IniciarSesion from './IniciarSesion';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Router>
        <NavBar />
        <Routes>

          <Route path="/IniciarSesion" element={<IniciarSesion />} />

        </Routes>
      </Router>
    </ChakraProvider>
  );
}

export default App;
