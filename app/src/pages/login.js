import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import {
    Box,
    Container,
    VStack,
    Heading,
    FormControl,
    FormLabel,
    Input,
    Button,
    useToast
} from '@chakra-ui/react';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export default function Login() {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const toast = useToast();
    const router = useRouter();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Login failed');
            }

            // Store user data in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));

            toast({
                title: 'Login successful!',
                description: `Welcome back, ${data.user.username}!`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Redirect to home page after successful login
            setTimeout(() => {
                router.push('/home');
            }, 1000);
        } catch (error) {
            toast({
                title: 'Login failed',
                description: error.message || 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };


    return (
        <Box
            minH="100vh"
            bg="blue.900"
            display="flex"
            alignItems="center"
            justifyContent="center"
            p={4}
        >
            <Container
                maxW="md"
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="xl"
            >
                <Box position="absolute" top={4} left={4}>
                    <Link href="./" style={{ textDecoration: 'none' }}>
                        <Button
                            type="button"
                            size="lg"
                            bg="white"
                            color="black"
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                        >
                            Back to Home
                        </Button>
                    </Link>
                </Box>
                <Heading as="h1" size="xl" textAlign="center" mb={8} color="gray.700">
                    Login
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter email"
                                size="lg"
                            />
                        </FormControl>

                        <FormControl isRequired>
                            <FormLabel>Password</FormLabel>
                            <Input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter password"
                                size="lg"
                            />
                        </FormControl>

                        <Button
                            type="submit"
                            width="full"
                            size="lg"
                            bg="green.400"
                            color="white"
                            _hover={{
                                transform: 'translateY(-2px)',
                                boxShadow: 'lg'
                            }}
                            transition="all 0.2s"
                        >
                            Login
                        </Button>
                    </VStack>
                </form>
            </Container>
        </Box>
    );
}
