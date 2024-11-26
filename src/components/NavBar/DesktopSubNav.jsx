import { Box, Text, Stack, useColorModeValue } from "@chakra-ui/react";

import { Link } from "react-router-dom";

export const DesktopSubNav = ({ label, href, subLabel, logOut }) => {
  return (
    <Box
      as="div"
      role={"group"}
      display={"block"}
      p={2}
      rounded={"md"}
      _hover={{ bg: useColorModeValue("gray.500", "gray.700") }}>
      <Stack direction={"row"} align={"center"}>
        <Box>
          {label === "Cerrar sesión" ? (
            <Text onClick={logOut} fontWeight={500} transition={"all .3s ease"} cursor="pointer">
              {label}
            </Text>
          ) : (
            <Link
              to={label === "Informacion personal" ? "/InformacionPersonal" : href}
              style={{ textDecoration: "none" }}>
              <Text transition={"all .3s ease"} _groupHover={{ color: "black.200" }} fontWeight={500}>
                {label}
              </Text>
            </Link>
          )}
          {subLabel && <Text fontSize={"sm"}>{subLabel}</Text>}
        </Box>
      </Stack>
    </Box>
  );
};
