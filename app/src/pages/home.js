import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    useToast
} from '@chakra-ui/react';

export default function Home() {
    const [user, setUser] = useState(null);
    const router = useRouter();
    const toast = useToast();

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            // Redirect to login if not logged in
            router.push('/login');
        } else {
            setUser(JSON.parse(userData));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('user');
        toast({
            title: 'Logged out successfully',
            status: 'success',
            duration: 2000,
            isClosable: true,
        });
        router.push('/');
    };

    if (!user) {
        return null; // or a loading spinner
    }

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
                <VStack spacing={6}>
                    <Heading as="h1" size="xl" color="gray.700">
                        Welcome!
                    </Heading>

                    <Box textAlign="center">
                        <Text fontSize="lg" color="gray.600" mb={2}>
                            Hello, <Text as="span" fontWeight="bold" color="#667eea">{user.username}</Text>
                        </Text>
                        <Text fontSize="sm" color="gray.500">
                            {user.email}
                        </Text>
                    </Box>

                    <Button
                        onClick={handleLogout}
                        width="full"
                        size="lg"
                        bg="red.400"
                        color="white"
                        _hover={{
                            transform: 'translateY(-2px)',
                            boxShadow: 'lg'
                        }}
                        transition="all 0.2s"
                    >
                        Logout
                    </Button>
                </VStack>
            </Container>
        </Box>
    );
}
