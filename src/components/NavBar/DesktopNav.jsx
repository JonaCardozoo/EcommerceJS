import { NAV_ITEMS } from "./utils/NavItems";
import {
  Box,
  Flex,
  Button,
  Stack,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  Input,
  Icon,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { Link } from "react-router-dom";
import { DesktopSubNav } from "./DesktopSubNav";

export const DesktopNav = ({ logOut, user }) => {
  const linkColor = useColorModeValue("black", "black");
  const linkHoverColor = useColorModeValue("gray.800", "black");
  const popoverContentBgColor = "black";
  const notAccesible = 4;

  return (
    <Stack direction={"row"} spacing={4}>
      {NAV_ITEMS.map((navItem, index) => {
        if (!user && index === notAccesible) {
          return null;
        }
        return (
          <Box key={navItem.label}>
            {navItem.hasInput ? (
              <Flex>
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
            ) : (
              <Popover trigger={"hover"} placement={"bottom-start"}>
                <PopoverTrigger>
                  <Link
                    to={navItem.to}
                    p={3}
                    fontSize={"sm"}
                    fontWeight={500}
                    color={linkColor}
                    _hover={{
                      textDecoration: "none",
                      color: linkHoverColor,
                    }}>
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
                    minW={"sm"}>
                    <Stack>
                      {navItem.children.map((child) => (
                        <DesktopSubNav key={child.label} {...child} logOut={logOut} />
                      ))}
                    </Stack>
                  </PopoverContent>
                )}
              </Popover>
            )}
          </Box>
        );
      })}
    </Stack>
  );
};
