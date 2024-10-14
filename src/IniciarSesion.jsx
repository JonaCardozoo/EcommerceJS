'use client'

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
} from '@chakra-ui/react'

export default function IniciarSesion() {
    return (
        <Stack minH={'90vh'} direction={{ base: 'column', md: 'row' }}>
            <Flex p={8} flex={1} align={'center'} justify={'center'}>
                <Stack spacing={4} w={'full'} maxW={'md'}>
                    <Heading fontSize={'2xl'}>Iniciar sesion con tu cuenta</Heading>
                    <FormControl id="email">
                        <FormLabel>Usuario</FormLabel>
                        <Input type="username" />
                    </FormControl>
                    <FormControl id="password">
                        <FormLabel>Contraseña</FormLabel>
                        <Input type="password" />
                    </FormControl>
                    <Stack spacing={6}>
                        <Stack
                            direction={{ base: 'column', sm: 'row' }}
                            align={'start'}
                            justify={'space-between'}>
                            <Checkbox>Recuerdame</Checkbox>
                            <Text color={'blue.500'}>Olvidaste tu contraseña?</Text>
                        </Stack>
                        <Button backgroundColor={'black'} variant={'solid'} color={'white'} _hover={{ color: 'gray' }}>
                            Iniciar Sesion
                        </Button>

                        <Flex justify={'center'}>
                            <Button
                                size='md'
                                height='48px'
                                width='200px'
                                border='2px'
                                borderColor='green.500'
                            >
                                <Image
                                    mr={10}
                                    boxSize="40px"
                                    src="https://img.icons8.com/?size=512&id=V5cGWnc9R4xj&format=png"
                                    alt="icon"
                                />
                                Usar google
                            </Button>
                        </Flex>

                    </Stack>
                </Stack>
            </Flex>
            <Flex flex={1}>
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    height={'90%'}
                    src={
                        'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
                    }
                />

            </Flex>
        </Stack>
    )
}