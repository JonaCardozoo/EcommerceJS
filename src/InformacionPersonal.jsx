import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

import {
    Box,
    Button,
    Grid,
    FormControl,
    FormLabel,
    Input,
    RadioGroup,
    Radio,
    Stack,
    Text,
    GridItem
} from "@chakra-ui/react";

export default function InformacionPersonal() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true); // Estado de carga
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [dni, setDni] = useState('');
    const [email, setEmail] = useState('');
    const [area, setArea] = useState('');
    const [telefono, setTelefono] = useState('');
    const [condicion, setCondicion] = useState('');
    const [direccion, setDireccion] = useState('');
    const [numeracion, setNumeracion] = useState('');
    const [piso, setPiso] = useState('');
    const [codigoPostal, setCodigoPostal] = useState('');
    const [provincia, setProvincia] = useState('');
    const [localidad, setLocalidad] = useState('');

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
        setLoading(false); // Después de cargar el usuario, establecer el estado de carga en falso
    }, []);


    if (loading) {
        return <div>Cargando...</div>; // Mostrar un mensaje de carga mientras se carga el usuario
    }


    if (!user) {
        return <Navigate to="/IniciarSesion" />; // Si el usuario no está logueado, redirigir a la página de inicio de sesión
    }

    // Si el usuario está logueado, mostrar la información personal
    return (
        <Box p={5}>


            <Grid templateColumns="repeat(2, 1fr)" gap={10} >
                <GridItem colSpan={{ base: 2, md: 1 }}>


                    <Box p={5} borderWidth="1px" borderRadius="lg">
                        <Text fontSize="2xl" mb={5} color={'red.500'}>
                            Datos Personales
                        </Text>
                        <FormControl mb={4}>
                            <FormLabel>ID Cliente</FormLabel>
                            <Input value={user.sub} disabled />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Nombre y Apellido</FormLabel>
                            <Input
                                placeholder="Nombre y Apellido"
                                value={user.name}
                                onChange={(e) => setNombre(e.target.value)}
                            />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>DNI</FormLabel>

                            <Input value={dni} placeholder="DNI" onChange={(e) => setDni(e.target.value)} />

                        </FormControl>
                        <FormControl mb={4}>
                            <FormLabel>Email</FormLabel>
                            <Input placeholder="Email" value={user.email} onChange={(e) => setEmail(e.target.value)} disabled />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Teléfono de contacto</FormLabel>
                            <Grid templateColumns="1fr 2fr" gap={4}>
                                <Input value={telefono} placeholder="Teléfono" onChange={(e) => setTelefono(e.target.value)} />
                            </Grid>
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel >Condición Fiscal</FormLabel>
                            <RadioGroup defaultValue="Consumidor Final">
                                <Stack direction="column">
                                    <Radio value="Responsable Inscripto" >Responsable Inscripto</Radio>
                                    <Radio value="Consumidor Final">Consumidor Final</Radio>
                                    <Radio value="Responsable no Inscripto">Responsable no Inscripto</Radio>
                                    <Radio value="Monotributo">Monotributo</Radio>
                                    <Radio value="Exento">Exento</Radio>
                                </Stack>
                            </RadioGroup>
                        </FormControl>
                    </Box>
                </GridItem>

                <GridItem colSpan={{ base: 2, md: 1 }}>


                    <Box p={5} borderWidth="1px" borderRadius="lg">

                        <Text fontSize="2xl" mb={5} color={'red.500'}>
                            Facturacion
                        </Text>
                        <FormControl mb={4}>
                            <FormLabel>Dirección Fiscal</FormLabel>
                            <Input placeholder="Dirección Fiscal" onChange={(e) => setDireccion(e.target.value)} />
                        </FormControl>

                        <Grid templateColumns="2fr 1fr" gap={4} mb={4}>
                            <FormControl>
                                <FormLabel>Numeración</FormLabel>
                                <Input placeholder="Numeración" onChange={(e) => setNumeracion(e.target.value)} />
                            </FormControl>

                            <FormControl>
                                <FormLabel>Piso/depto</FormLabel>
                                <Input placeholder="Piso/depto" onChange={(e) => setPiso(e.target.value)} />
                            </FormControl>
                        </Grid>

                        <FormControl mb={4}>
                            <FormLabel>Código Postal</FormLabel>
                            <Input placeholder="Código Postal" onChange={(e) => setCodigoPostal(e.target.value)} />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Provincia</FormLabel>
                            <Input placeholder="Provincia" onChange={(e) => setProvincia(e.target.value)} />
                        </FormControl>

                        <FormControl mb={4}>
                            <FormLabel>Localidad</FormLabel>
                            <Input placeholder="Localidad" onChange={(e) => setLocalidad(e.target.value)} />
                        </FormControl>
                    </Box>
                </GridItem>
            </Grid>

            <Box display="flex" justifyContent="flex-end" mt={5}>
                <Button colorScheme="blackAlpha">Guardar Datos</Button>
            </Box>
        </Box>
    );
}
