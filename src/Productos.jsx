import { SimpleGrid, Box, Text, Image, GridItem,Flex } from "@chakra-ui/react";
import { useEffect, useState } from "react";

const productosArray = [
    {
      id: 1,
      nombreproducto: "Notebook Acer",
      precio: 914000,
      img: "https://www.laeditorial.com.ar/31870-large_default/notebook-acer-aspire-3-a315-59g-156-i5-512gb-ssd-8gb.jpg"
    },
    {
      id: 2,
      nombreproducto: "Notebook Lenovo",
      precio: 845000,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMNfTESWMsD85Hd-QA3x3aymsoOy4QXjI2iA&s"
    },
    {
      id: 3,
      nombreproducto: "Notebook HP",
      precio: 980000,
      img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZf_EKi4SqxNZTosfiWPmY7lB08euncxhUMQ&s"
    },
    {
      id: 4,
      nombreproducto: "Notebook Dell",
      precio: 100000,
      img:"https://www.molex.com.ar/wp-content/uploads/2023/08/dell1.png"
    },
    {
      id: 5,
      nombreproducto: "Notebook Asus",
      precio: 100000,
      img: "https://s3-sa-east-1.amazonaws.com/saasargentina/JyNMe54QqkoWP7UGGiz6/imagen"
    },
]

function Productos() {
  const [productos, setProductos] = useState(productosArray);

//   useEffect(() => {
//     fetch("http://localhost:8000/productos")
//       .then((response) => response.json())
//       .then((data) => setProductos(data))
//       .catch((error) => console.error("No se pudo recuperar los productos"));
      
//   }, []);
//   useEffect(() => {
//     if (productos?.length > 0) {
//       console.log(productos);
//     }
//   }, [productos]);
  return (
    <>
      
      <SimpleGrid columns={{base:1, md:4}} spacing={10} m={10}>
        {productos.map((producto, index) => (
          <Flex justifyContent={'center'} alignItems={'center'}>

          <GridItem colSpan={{base:2,md:1}} key={index} p="10px" w={{base:'30%',md:'80%'}} h="100%" bg="gray.100" >
            <Image src={producto.img} alt={producto.nombreproducto} height={'200x'} width={'200px'}></Image>
            <Text>{producto.nombreproducto}</Text>
              <Text>${producto.precio}</Text>
          </GridItem>
          </Flex>
          
        ))}
      </SimpleGrid>
    </>
  );
}

export default Productos;
