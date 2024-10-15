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
    Icon
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
                minH={'80px'}
                fontSize={'1.1rem'}
                py={{ base: 2 }}
                px={{ base: 4 }}
                borderBottom={1}
                borderStyle={'solid'}
                borderColor={useColorModeValue('black', 'black')}
                align={'center'}>

                <Flex
                    flex={{ base: 1, md: 'auto' }}
                    ml={{ base: -2 }}
                    display={{ base: 'flex', md: 'none' }}>
                    <IconButton
                        onClick={onToggle}
                        icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>
                <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
                    <Link to={'/'}>
                        <Text
                            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
                            fontFamily={'heading'}
                            color={useColorModeValue('white', 'white')}>
                            E-Commerce
                        </Text>
                    </Link>

                    <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
                        <DesktopNav logOut={logOut} />
                    </Flex>
                </Flex>

                <UserSection user={user} logOut={logOut} />

                <Stack
                    flex={{ base: 1, md: 0 }}
                    justify={'flex-end'}
                    direction={'row'}
                    spacing={6}>
                    <Button ml={'350px'} as={'a'} fontSize={'sm'} fontWeight={400} variant={'link'} href={'#'} color={'white'}>
                        Registrate
                    </Button>
                    <Button
                        as={Link}
                        to="/IniciarSesion"
                        display={{ base: 'none', md: 'inline-flex' }}
                        fontSize={'sm'}
                        fontWeight={600}
                        color={'white'}
                        bg={'black'}
                        _hover={{
                            bg: 'gray.800'
                        }}>
                        Iniciar Sesión
                    </Button>
                </Stack>
            </Flex>

            <Collapse in={isOpen} animateOpacity>
                <MobileNav logOut={logOut} />
            </Collapse>
        </Box>
    )
}

const UserSection = ({ user }) => {
    return (
        <Flex align="center">
            {user ? (
                <>
                    <Avatar name={user.name || `${user.given_name} ${user.family_name}`} src={user.picture} />
                    <Text ml={'10px'}>Bienvenido, {user.name || user.given_name}!</Text>
                </>
            ) : null}
        </Flex>
    )
}

const DesktopNav = ({ logOut }) => {
    const linkColor = useColorModeValue('white', 'white')
    const linkHoverColor = useColorModeValue('gray.800', 'black')
    const popoverContentBgColor = "black";

    return (
        <Stack direction={'row'} spacing={4}>
            {NAV_ITEMS.map((navItem) => (
                <Box key={navItem.label}>
                    {navItem.hasInput ? (
                        <Flex>
                            <Input placeholder="Buscar..." size="sm" w="250px" mr={3} style={{ color: 'white' }} />
                            <Button colorScheme="blue" size="sm">
                                <Icon as={SearchIcon} />
                            </Button>
                        </Flex>
                    ) : (
                        <Popover trigger={'hover'} placement={'bottom-start'}>
                            <PopoverTrigger>
                                <Link to={navItem.to}
                                    p={2}
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
            ))}
        </Stack>
    );
};



const DesktopSubNav = ({ label, href, subLabel, onClick, logOut }) => {
    return (
        <Box
            as="a"
            href={href}
            role={'group'}
            display={'block'}
            p={2}
            rounded={'md'}
            onClick={(e) => {
                if (onClick) {
                    onClick(e);
                }
                if (label === 'Cerrar sesión') {
                    logOut();
                }
            }}
            _hover={{ bg: useColorModeValue('gray.500', 'gray.700') }}>
            <Stack direction={'row'} align={'center'}>
                <Box>
                    <Text
                        transition={'all .3s ease'}
                        _groupHover={{ color: 'black.200' }}
                        fontWeight={500}>
                        {label}
                    </Text>
                    {subLabel && <Text fontSize={'sm'}>{subLabel}</Text>}
                </Box>
                <Flex
                    transition={'all .3s ease'}
                    transform={'translateX(-10px)'}
                    opacity={0}
                    _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
                    justify={'flex-end'}
                    align={'center'}
                    flex={1}>
                    <Icon color={'black.200'} w={5} h={5} as={ChevronRightIcon} />
                </Flex>
            </Stack>
        </Box>
    )
}

const MobileNav = ({ logOut }) => {
    return (
        <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
            {NAV_ITEMS.map((navItem) => (
                <MobileNavItem key={navItem.label} {...navItem} logOut={logOut} />
            ))}
        </Stack>
    )
}

const MobileNavItem = ({ label, children, href, logOut }) => {
    const { isOpen, onToggle } = useDisclosure()

    return (
        <Stack spacing={4} onClick={children && onToggle}>
            <Box
                py={2}
                as="a"
                href={href ?? '#'}
                justifyContent="space-between"
                alignItems="center"
                _hover={{
                    textDecoration: 'none'
                }}>
                <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
                    {label}
                </Text>
                {children && (
                    <Icon
                        as={ChevronDownIcon}
                        transition={'all .25s ease-in-out'}
                        transform={isOpen ? 'rotate(180deg)' : ''}
                        w={6}
                        h={6}
                    />
                )}
            </Box>

            <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
                <Stack
                    mt={2}
                    pl={4}
                    borderLeft={1}
                    borderStyle={'solid'}
                    borderColor={useColorModeValue('gray.200', 'gray.700')}
                    align={'start'}>
                    {children &&
                        children.map((child) => (
                            <Box as="a" key={child.label} py={2} href={child.href} onClick={child.onClick}>
                                {child.label}
                            </Box>
                        ))}
                </Stack>
            </Collapse>
        </Stack>
    )
}

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
                href: '#',

            },
            {
                label: 'Mouses',
                href: '#'
            },
            {
                label: 'Monitores',
                href: '#'
            },
            {
                label: 'Notebooks',
                href: '#'
            }
        ]
    },
    {
        label: 'PC armada',
        href: '#'
    },
    {
        label: 'Mi Cuenta',
        children: [
            {
                label: 'Facturas',
                subLabel: 'todo sobre sus facturas',
                href: '#'
            },
            {
                label: 'Compras',
                subLabel: 'todo sobre sus compras',
                href: '#'
            },
            {
                label: 'Cerrar sesión',
                subLabel: '',
                href: '#',
                onClick: (e) => e.preventDefault()
            }
        ]
    }
]
