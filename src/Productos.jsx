import { SimpleGrid, Box, Text, Image } from "@chakra-ui/react";
import { useEffect, useState } from "react";

function Productos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8000/productos")
      .then((response) => response.json())
      .then((data) => setProductos(data))
      .catch((error) => console.error("No se pudo recuperar los productos"));
  }, []);
  useEffect(() => {
    if (productos?.length > 0) {
      console.log(productos);
    }
  }, [productos]);
  return (
    <>
      <SimpleGrid columns={4}>
        {productos.map((producto, index) => (
          <Box key={index} p="1" w="100%" h="500%" bg="gray.100">
            <Text>{producto.nombreproducto}</Text>
            <Text>${producto.precio}</Text>
            <img
              src="https://drive.usercontent.google.com/download?id=1rZC18RXebt9bI8q2hoyRc5-b7YHnVUzD&export=view&authuser=0"
              alt="Imagen de Google Drive"
            />
          </Box>
        ))}
      </SimpleGrid>
    </>
  );
}

export default Productos;
