import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
    useToast
} from '@chakra-ui/react';

const API_BASE_URL = 'http://localhost:5000/api/auth';

export default function Home() {
    const [user, setUser] = useState(null);
    const [updateData, setUpdateData] = useState({
        username: '',
        email: '',
        password: ''
    });
    const router = useRouter();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    useEffect(() => {
        // Get user data from localStorage
        const userData = localStorage.getItem('user');
        if (!userData) {
            // Redirect to login if not logged in
            router.push('/login');
        } else {
            const parsedUser = JSON.parse(userData);
            setUser(parsedUser);
            setUpdateData({
                username: parsedUser.username || '',
                email: parsedUser.email || '',
                password: ''
            });
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

    const handleUpdateChange = (e) => {
        const { name, value } = e.target;
        setUpdateData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleUpdateAccount = async () => {
        if (!user?.id && !user?._id) {
            toast({
                title: 'Please log in first',
                status: 'warning',
                duration: 3000,
                isClosable: true
            });
            return;
        }

        const userId = user.id || user._id;
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updateData)
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Update failed');
            }

            localStorage.setItem('user', JSON.stringify(data.user));
            setUser(data.user);
            setUpdateData((prev) => ({
                ...prev,
                password: ''
            }));
            toast({
                title: 'Account updated',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            onClose();
        } catch (error) {
            toast({
                title: 'Update failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    const handleDeleteAccount = async () => {
        if (!user?.id && !user?._id) {
            toast({
                title: 'Please log in first',
                status: 'warning',
                duration: 3000,
                isClosable: true
            });
            return;
        }

        if (!window.confirm('Delete your account? This cannot be undone.')) {
            return;
        }

        const userId = user.id || user._id;
        try {
            const response = await fetch(`${API_BASE_URL}/users/${userId}`, {
                method: 'DELETE'
            });

            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message || 'Delete failed');
            }

            localStorage.removeItem('user');
            toast({
                title: 'Account deleted',
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            onClose();
            router.push('/');
        } catch (error) {
            toast({
                title: 'Delete failed',
                description: error.message,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
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
                maxW="lg"
                bg="white"
                p={8}
                borderRadius="lg"
                boxShadow="xl"
            >
                <VStack spacing={6}>
                    <Heading as="h1" size="lg" color="gray.700">
                        Welcome back, <Text as="span" fontWeight="bold" color="#667eea">{user.username}</Text>
                    </Heading>

                    <Box textAlign="center">
                        <Text fontSize="md" color="gray.500">
                            {user.email}
                        </Text>
                    </Box>

                    <Button
                        width="full"
                        size="lg"
                        variant="outline"
                        colorScheme="blue"
                        onClick={onOpen}
                    >
                        Update Account
                    </Button>
                    
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
            <Modal isOpen={isOpen} onClose={onClose} isCentered>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4} align="stretch">
                            <FormControl>
                                <FormLabel>Username</FormLabel>
                                <Input
                                    name="username"
                                    value={updateData.username}
                                    onChange={handleUpdateChange}
                                    placeholder="Enter username"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Email</FormLabel>
                                <Input
                                    type="email"
                                    name="email"
                                    value={updateData.email}
                                    onChange={handleUpdateChange}
                                    placeholder="Enter email"
                                />
                            </FormControl>
                            <FormControl>
                                <FormLabel>Password</FormLabel>
                                <Input
                                    type="password"
                                    name="password"
                                    value={updateData.password}
                                    onChange={handleUpdateChange}
                                    placeholder="Enter new password"
                                />
                            </FormControl>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={handleUpdateAccount}>
                            Save Changes
                        </Button>
                        <Button colorScheme="red" variant="outline" mr={3} onClick={handleDeleteAccount}>
                            Delete Account
                        </Button>
                        <Button variant="ghost" mr={3} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
}
