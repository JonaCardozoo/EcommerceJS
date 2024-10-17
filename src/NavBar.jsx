'use client'

import {
    Box,
    Flex,
    Text,
    IconButton,
    Button,
    Stack,
    Collapse,
    Popover,
    PopoverTrigger,
    PopoverContent,
    useColorModeValue,
    useBreakpointValue,
    useDisclosure,
    Input,
    useToast,
    Avatar,
    Icon,
    Image

} from '@chakra-ui/react'
import {
    HamburgerIcon,
    CloseIcon,
    ChevronDownIcon,
    SearchIcon,
    ChevronRightIcon
} from '@chakra-ui/icons'
import { Link } from 'react-router-dom'
import { googleLogout } from '@react-oauth/google'
import './App.css'


export default function NavBar({ user, setUser }) {
    const { isOpen, onToggle } = useDisclosure()
    const toast = useToast()




    const logOut = () => {
        googleLogout()
        setUser(null);
        localStorage.removeItem('user')
        toast({
            title: "Sesión cerrada",
            status: "success",
            duration: 4000,
            isClosable: true
        })
    }


    return (
        <Box>
            <Flex
                bg={useColorModeValue('black', 'black')}
                color={useColorModeValue('white', 'white')}
                minH={'50px'}
                w="full"
                wrap={'wrap'}
                direction={{ base: 'column', md: 'row' }}
                justify={{ base: 'center', lg: 'space-between' }}
                fontSize={'1.1rem'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                align={'center'}
            >


                <Link to="/">
                    <Image
                        src={'/LOGOECOMMERCEPNG.png'}
                        alt={'logo'}
                        width={'60px'}
                        height={'60px'}
                        onClick={onToggle}
                        objectFit={'cover'}

                    />
                </Link>


                <Flex
                    flex={{ base: 1, md: 'auto' }}

                    display={{ base: 'flex', lg: 'none' }}

                >
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} color={'white'} />}
                        variant={'ghost'}
                        display={{ base: 'flex', lg: 'none' }}
                        aria-label={'Toggle Navigation'}
                        mx={'auto'}
                    />

                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>

                    <Flex display={{ base: 'none', lg: 'flex' }} ml={10}>
                        <DesktopNav logOut={logOut} user={user} />
                    </Flex>
                </Flex>

                <UserSection user={user} logOut={logOut} />

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={{ base: 'center', md: 'flex-end' }}
                    direction={{ base: 'column', md: 'row' }}
                    alignItems={'center'}
                    spacing={6}
                >
                    {!user ? (
                        <Flex direction={{ base: 'column', md: 'row' }} gap={4} >
                            <Button
                                as={Link}
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                padding={'20px'}
                                bg={'transparent'}
                                border={'1px solid white'}
                                _hover={{
                                    color: 'black',
                                    bg: 'white'
                                }}
                            >
                                Registrate
                            </Button>
                            <Button
                                as={Link}
                                to="/IniciarSesion"
                                fontSize={'sm'}
                                fontWeight={600}
                                color={'white'}
                                bg={'transparent'}
                                border={'1px solid white'}
                                _hover={{
                                    color: 'black',
                                    bg: 'white'
                                }}
                            >
                                Iniciar Sesión
                            </Button>
                        </Flex>
                    ) : null}
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav logOut={logOut} user={user} />
            </Collapse>
        </Box >
    )
}

const UserSection = ({ user }) => {
    return (
        <Flex align="center">
            {user ? (
                <>
                    <Avatar name={user.name || `${user.given_name} ${user.family_name}`} src={user.picture} w={'50px'} h={'50px'} />
                    <Text ml={'10px'}>Bienvenido, {user.name || user.given_name}!</Text>
                </>
            ) : null}
        </Flex>
    )
}

const DesktopNav = ({ logOut, user }) => {
    const linkColor = useColorModeValue('black', 'black');
    const linkHoverColor = useColorModeValue('gray.800', 'black');
    const popoverContentBgColor = "black";
    const notAccesible = 4;

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem, index) => {
                if (!user && index === notAccesible) {
                    return null;
                }
                return (
                    <Box key={navItem.label}>
                        {navItem.hasInput ? (
                            <Flex>
                                <Input placeholder="Buscar..." size="sm" w="300px" h="35px" mr={1} style={{ color: 'white' }} />
                                <Button colorScheme="blue" size="sm">
                                    <Icon as={SearchIcon} />
                                </Button>
                            </Flex>
                        ) : (
                            <Popover trigger={'hover'} placement={'bottom-start'}>
                                <PopoverTrigger>
                                    <Link to={navItem.to}
                                        p={3}
                                        fontSize={'sm'}
                                        fontWeight={500}
                                        color={linkColor}
                                        _hover={{
                                            textDecoration: 'none',
                                            color: linkHoverColor
                                        }}>
                                        {navItem.label}
                                    </Link>
                                </PopoverTrigger>
                                {navItem.children && (
                                    <PopoverContent
                                        border={0}
                                        boxShadow={'xl'}
                                        bg={popoverContentBgColor}
                                        p={4}
                                        rounded={'xl'}
                                        minW={'sm'}>
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


const DesktopSubNav = ({ label, href, subLabel, logOut }) => {
    return (
        <Box
            as="div"
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            _hover={{ bg: useColorModeValue('gray.500', 'gray.700') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    {label === 'Cerrar sesión' ? (
                        <Text
                            onClick={logOut}
                            fontWeight={500}
                            transition={'all .3s ease'}
                            cursor="pointer"
                        >
                            {label}
                        </Text>
                    ) : (
                        <Link to={label === 'Informacion personal' ? '/InformacionPersonal' : href} style={{ textDecoration: 'none' }}>
                            <Text
                                transition={'all .3s ease'}
                                _groupHover={{ color: 'black.200' }}
                                fontWeight={500}>
                                {label}
                            </Text>
                        </Link>
                    )}
                    {subLabel && <Text fontSize={'sm'}>{subLabel}</Text>}
                </Box>
            </Stack>
        </Box>
    );
};

const MobileNav = ({ logOut, user }) => {
    const notAccesible = 4;
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ lg: 'none' }}>
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

const MobileNavItem = ({ navItem, logOut }) => {
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Stack spacing={4} onClick={navItem.children && onToggle}>
            {navItem.hasInput ? (
                <Flex>
                    <Input placeholder="Buscar..." size="sm" w="300px" h="35px" mr={1} style={{ color: 'black' }} />
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
                        textDecoration: 'none',
                    }}
                >
                    <Text
                        fontWeight={600}
                        color={useColorModeValue('gray.600', 'gray.200')}
                        cursor="pointer"
                        onClick={() => {
                            if (navItem.label === 'Cerrar sesión') {
                                logOut();
                            }
                        }}
                    >
                        {navItem.label}
                    </Text>
                    {navItem.children && (
                        <Icon
                            as={ChevronDownIcon}
                            transition={'all .25s ease-in-out'}
                            transform={isOpen ? 'rotate(180deg)' : ''}
                            w={6}
                            h={6}
                        />
                    )}
                </Box>
            )}

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={10}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}
                >
                    {navItem.children &&
                        navItem.children.map((child) => (
                            <Box
                                key={child.label}
                                py={2}
                                as={Link}
                                to={child.to}
                                onClick={child.label === 'Cerrar sesión' ? logOut : null}
                            >
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    );
};


const NAV_ITEMS = [
    {
        label: 'Ayuda',
        to: '/Help'
    },
    {
        label: 'Buscar',
        hasInput: true
    },
    {
        label: 'Productos',

        children: [
            {
                label: 'Teclados',
                to: '/teclados',
            },
            {
                label: 'Mouses',
                to: '/mouses',
            },
            {
                label: 'Monitores',
                to: '/monitores',
            },
            {
                label: 'Notebooks',
                to: '/notebooks',
            }
        ]
    },
    {
        label: 'PC armada',
        to: '/pc-armada',
    },
    {
        label: 'Mi Cuenta',
        children: [
            {
                label: 'Informacion personal',
                subLabel: 'todo sobre su informacion personal',
                to: '/InformacionPersonal',
            },
            {
                label: 'Facturas',
                subLabel: 'todo sobre sus facturas',
                to: '/facturas',
            },
            {
                label: 'Compras',
                subLabel: 'todo sobre sus compras',
                to: '/compras',
            },
            {
                label: 'Cerrar sesión',
                subLabel: '',
                onClick: (e) => e.preventDefault()
            }
        ]
    }
]
