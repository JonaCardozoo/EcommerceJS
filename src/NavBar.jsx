"use client";
import { UserSection } from "./components/NavBar/UserSection";
import { DesktopNav } from "./components/NavBar/DesktopNav";
import { MobileNav } from "./components/NavBar/MobileNav";

import {
  Box,
  Flex,
  IconButton,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  useToast,
  Image,
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { googleLogout } from "@react-oauth/google";
import "./App.css";

export default function NavBar({ user, setUser }) {
  const { isOpen, onToggle } = useDisclosure();
  const toast = useToast();

  const logOut = () => {
    googleLogout();
    setUser(null);
    localStorage.removeItem("user");
    toast({
      title: "Sesión cerrada",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box>
      <Flex
        bg={useColorModeValue("black", "black")}
        color={useColorModeValue("white", "white")}
        minH={"50px"}
        w="full"
        wrap={"wrap"}
        direction={{ base: "column", md: "row" }}
        justify={{ base: "center", lg: "space-between" }}
        fontSize={"1.1rem"}
        py={{ base: 2 }}
        px={{ base: 4 }}
        align={"center"}>
        <Link to="/">
          <Image
            src={"/LOGOECOMMERCEPNG.png"}
            alt={"logo"}
            width={"60px"}
            height={"60px"}
            onClick={onToggle}
            objectFit={"cover"}
          />
        </Link>

        <Flex flex={{ base: 1, md: "auto" }} display={{ base: "flex", lg: "none" }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} color={"white"} />}
            variant={"ghost"}
            display={{ base: "flex", lg: "none" }}
            aria-label={"Toggle Navigation"}
            mx={"auto"}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: "center", md: "start" }}>
          <Flex display={{ base: "none", lg: "flex" }} ml={10}>
            <DesktopNav logOut={logOut} user={user} />
          </Flex>
        </Flex>

        <UserSection user={user} logOut={logOut} />

        <Stack
          flex={{ base: 1, md: 0 }}
          justify={{ base: "center", md: "flex-end" }}
          direction={{ base: "column", md: "row" }}
          alignItems={"center"}
          spacing={6}>
          {!user ? (
            <Flex direction={{ base: "column", md: "row" }} gap={4}>
              <Button
                as={Link}
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                padding={"20px"}
                bg={"transparent"}
                border={"1px solid white"}
                _hover={{
                  color: "black",
                  bg: "white",
                }}>
                Registrate
              </Button>
              <Button
                as={Link}
                to="/IniciarSesion"
                fontSize={"sm"}
                fontWeight={600}
                color={"white"}
                bg={"transparent"}
                border={"1px solid white"}
                _hover={{
                  color: "black",
                  bg: "white",
                }}>
                Iniciar Sesión
              </Button>
            </Flex>
          ) : null}
        </Stack>
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav logOut={logOut} user={user} />
      </Collapse>
    </Box>
  );
}
