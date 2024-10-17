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
    useToast
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
                title: "Error al iniciar sesion, intente mas tarde",
                description: "Ocurrió un error al iniciar sesión.",
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
                    src={'/LOGOECOMMERCE.png'}
                    bg={'black'}
                    borderRadius={'60px'}
                    width={'90%'}
                    height={'90%'}
                    marginTop={'5%'}
                    ml={{ base: '5%', md: '0%' }}

                />
            </Flex>
        </Stack>
    );
}
