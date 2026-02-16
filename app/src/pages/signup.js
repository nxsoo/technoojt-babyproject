import { useState } from 'react';
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

export default function SignUp() {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const response = await fetch('http://localhost:5000/api/auth/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Registration failed');
            }

            toast({
                title: 'Registration successful!',
                description: 'Welcome to Baby Project',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });

            // Clear form
            setFormData({
                username: '',
                email: '',
                password: ''
            });
        } catch (error) {
            console.error('Registration error:', error);
            toast({
                title: 'Registration failed',
                description: error.message || 'Please try again.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
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
                <Heading as="h1" size="xl" textAlign="center" mb={8} color="gray.700">
                    Sign Up
                </Heading>

                <form onSubmit={handleSubmit}>
                    <VStack spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Username</FormLabel>
                            <Input
                                type="text"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="Enter username"
                                size="lg"
                            />
                        </FormControl>

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
                            isLoading={isLoading}
                            loadingText="Registering..."
                        >
                            Register
                        </Button>
                    </VStack>
                </form>
            </Container>
        </Box>
    );
}
