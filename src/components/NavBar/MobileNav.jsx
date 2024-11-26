import { NAV_ITEMS } from "./utils/NavItems";
import { Box, Stack, useColorModeValue } from "@chakra-ui/react";
import { MobileNavItem } from "../../components/NavBar/MobileNavItem";

export const MobileNav = ({ logOut, user }) => {
  const notAccesible = 4;
  return (
    <Stack bg={useColorModeValue("white", "gray.800")} p={4} display={{ lg: "none" }}>
      {NAV_ITEMS.map((navItem, index) => (
        <Box key={navItem.label}>
          {!user && index === notAccesible ? null : (
            <MobileNavItem navItem={navItem} logOut={logOut} user={user} />
          )}
        </Box>
      ))}
    </Stack>
  );
};
