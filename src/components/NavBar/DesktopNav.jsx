import { NAV_ITEMS } from "./utils/NavItems";
import {
  Box,
  Flex,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Input,
  Icon
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { DesktopSubNav } from "./DesktopSubNav";

export const DesktopNav = ({ logOut, user }) => {
  const linkColor = "black";
  const linkHoverColor = "gray.800";
  const popoverContentBgColor = "black";
  const notAccesible = 4;  // Index de los elementos que no son accesibles sin login

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem, index) => {
        // Evitar mostrar ciertos elementos si no hay un usuario autenticado
        if (!user && index === notAccesible) {
          return null;
        }

        // Si el item tiene input de búsqueda
        if (navItem.hasInput) {
          return (
            <Flex key={navItem.label}>
              <Input
                placeholder="Buscar..."
                size="sm"
                w="300px"
                h="35px"
                mr={1}
                style={{ color: "white" }}
              />
              <Button colorScheme="blue" size="sm">
                <Icon as={SearchIcon} />
              </Button>
            </Flex>
          );
        }

        // Si el item tiene una función onClick
        if (navItem.onClick) {
          return (
            <Button key={navItem.label} onClick={navItem.onClick} p={3}>
              {navItem.label}
            </Button>
          );
        }

        // Elemento con o sin children (submenú)
        return (
          <Box key={navItem.label}>
            <Popover trigger={"hover"} placement={"bottom-start"}>
              <PopoverTrigger>
                <Link
                  to={navItem.to || "#"}  // Si no tiene ruta, usar #
                  p={3}
                  fontSize={"sm"}
                  fontWeight={500}
                  color={linkColor}
                  _hover={{
                    textDecoration: "none",
                    color: linkHoverColor,
                  }}
                >
                  {navItem.label}
                </Link>
              </PopoverTrigger>
              {navItem.children && (
                <PopoverContent
                  border={0}
                  boxShadow={"xl"}
                  bg={popoverContentBgColor}
                  p={4}
                  rounded={"xl"}
                  minW={"sm"}
                >
                  <Stack>
                    {/* Renderiza los submenús */}
                    {navItem.children.map((child) => (
                      <DesktopSubNav key={child.label} {...child} />
                    ))}
                  </Stack>
                </PopoverContent>
              )}
            </Popover>
          </Box>
        );
      })}
    </Stack>
  );
};
