import { NAV_ITEMS } from "./utils/NavItems";
import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Collapse,
  useColorModeValue,
  useDisclosure,
  Input,
  Icon,
} from "@chakra-ui/react";
import { ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
i;

export const MobileNavItem = ({ navItem, logOut }) => {
  const { isOpen, onToggle } = useDisclosure();

  return (
    <Stack spacing={4} onClick={navItem.children && onToggle}>
      {navItem.hasInput ? (
        <Flex>
          <Input placeholder="Buscar..." size="sm" w="300px" h="35px" mr={1} style={{ color: "black" }} />
          <Button colorScheme="blue" size="sm">
            <Icon as={SearchIcon} />
          </Button>
        </Flex>
      ) : (
        <Box
          py={2}
          as="div"
          justifyContent="space-between"
          alignItems="center"
          _hover={{
            textDecoration: "none",
          }}>
          <Text
            fontWeight={600}
            color={useColorModeValue("gray.600", "gray.200")}
            cursor="pointer"
            onClick={() => {
              if (navItem.label === "Cerrar sesión") {
                logOut();
              }
            }}>
            {navItem.label}
          </Text>
          {navItem.children && (
            <Icon
              as={ChevronDownIcon}
              transition={"all .25s ease-in-out"}
              transform={isOpen ? "rotate(180deg)" : ""}
              w={6}
              h={6}
            />
          )}
        </Box>
      )}

      <Collapse in={isOpen} animateOpacity style={{ marginTop: "0!important" }}>
        <Stack
          mt={10}
          pl={4}
          borderLeft={1}
          borderStyle={"solid"}
          borderColor={useColorModeValue("gray.200", "gray.700")}
          align={"start"}>
          {navItem.children &&
            navItem.children.map((child) => (
              <Box
                key={child.label}
                py={2}
                as={Link}
                to={child.to}
                onClick={child.label === "Cerrar sesión" ? logOut : null}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  );
};
