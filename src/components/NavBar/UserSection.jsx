import { Flex, Text, Avatar } from "@chakra-ui/react";
export const UserSection = ({ user }) => {
  return (
    <Flex align="center">
      {user ? (
        <>
          <Avatar
            name={user.name || `${user.given_name} ${user.family_name}`}
            src={user.picture}
            w={"50px"}
            h={"50px"}
          />
          <Text ml={"10px"}>Bienvenido, {user.name || user.given_name}!</Text>
        </>
      ) : null}
    </Flex>
  );
};
