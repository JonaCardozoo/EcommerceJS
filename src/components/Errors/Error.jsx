import { Flex, Button, Link } from "@chakra-ui/react";
import { useNavigate } from "react-router";

export default function Error() {
  const navigate = useNavigate();

  const HandleNavigate = () => {
    navigate("/");
  };

  return (
    <>
      <Flex flex={1} justifyContent={"center"} alignItems={"center"}>
        <h1>Pagina no encontrada o sin acceso</h1>
        <Button onClick={HandleNavigate}>Volver</Button>
      </Flex>
    </>
  );
}
