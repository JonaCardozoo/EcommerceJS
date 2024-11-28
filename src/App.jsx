import { ChakraProvider, theme } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar/NavBar";
import IniciarSesion from "./components/Account/IniciarSesion";
import Help from "./components/Help/Help";
import InformacionPersonal from "./components/Account/InformacionPersonal";
import Carousel from "./components/Carousel/Carousel";
import Productos from "./components/Products/Productos";
import Error from "./components/Errors/Error";

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);

  return (
    <ChakraProvider theme={theme} height="1440px">
      <Router>
        <NavBar user={user} setUser={setUser} />
        <Routes>
          <Route path="/IniciarSesion" element={<IniciarSesion setUser={setUser} />} />
          <Route path="/Help" element={<Help />} />
          <Route path="/InformacionPersonal" element={<InformacionPersonal />} />
          <Route path="/Error" element={<Error />} />
        </Routes>
      </Router>
      <Carousel />
      <Productos />
    </ChakraProvider>
  );
}

export default App;
