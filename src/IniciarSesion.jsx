import {
    Button,
    Checkbox,
    Flex,
    Text,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    Image,
    useToast,
    Avatar,
} from '@chakra-ui/react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

export default function IniciarSesion({ setUser }) {
    const toast = useToast();
    const navigate = useNavigate();

    const responseMessage = (credentialResponse) => {
        try {
            const userToken = credentialResponse.credential;


            const base64Url = userToken.split('.')[1];
            const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
            const jsonPayload = decodeURIComponent(
                atob(base64)
                    .split('')
                    .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
                    .join('')
            );

            const decodedUser = JSON.parse(jsonPayload);


            if (decodedUser) {
                setUser(decodedUser);  // Actualizar el usuario en el estado global

                toast({
                    title: "Inicio de sesión con éxito",
                    status: "success",
                    duration: 4000,
                    isClosable: true,
                });

                navigate('/'); // Redireccionar a la página principal
            } else {
                throw new Error("Error al decodificar el token.");
            }
        } catch (error) {

            toast({
                title: "Error al decodificar el token",
                description: "Ocurrió un error al procesar el token de inicio de sesión.",
                status: "error",
                duration: 4000,
                isClosable: true,
            });
        }
    };

    const errorMessage = (error) => {

        toast({
            title: "Error al iniciar sesión",
            status: "error",
            duration: 4000,
            isClosable: true
        });
    };

    return (
        <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Iniciar sesión con tu cuenta</Heading>
                    <FormControl id="email">
                        <FormLabel>Usuario</FormLabel>
                        <Input type="text" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Contraseña</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                            <Checkbox>Recuérdame</Checkbox>
                            <Text color={'blue.500'}>¿Olvidaste tu contraseña?</Text>
                        </Stack>
                        <Button
                            backgroundColor={'black'}
                            variant={'solid'}
                            color={'white'}
                            _hover={{ backgroundColor: 'gray.700', color: 'white' }}
                        >
                            Iniciar Sesión
                        </Button>

                        <Flex justify={'center'}>
                            <GoogleLogin onSuccess={responseMessage} onError={errorMessage} />
                        </Flex>
                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'}
                />
            </Flex>
        </Stack>
    );
}
