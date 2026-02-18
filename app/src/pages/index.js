import { Box, Container, Heading, SimpleGrid, Card, CardBody, Text, Icon, Button } from '@chakra-ui/react';
import { AddIcon, LockIcon } from '@chakra-ui/icons';
import Link from 'next/link';

export default function Home() {
  return (
    <Box
      minH="100vh"
      bg="blue.900"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
      position="relative"
    >
      <Container maxW="container.md" textAlign="center">
        <Heading
          as="h1"
          size="2xl"
          color="white"
          mb={12}
        >
          Simple CRUD System
        </Heading>

        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
          <Link href="/signup" style={{ textDecoration: 'none' }}>
            <Card
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
              h="full"
            >
              <CardBody textAlign="center">
                <Icon as={AddIcon} w={8} h={8} color="#667eea" mb={4} />
                <Heading size="md" color="#667eea" mb={4}>
                  Sign Up
                </Heading>
                <Text color="gray.600">Create a new account</Text>
              </CardBody>
            </Card>
          </Link>

          <Link href="/login" style={{ textDecoration: 'none' }}>
            <Card
              cursor="pointer"
              transition="all 0.3s"
              _hover={{ transform: 'translateY(-5px)', shadow: 'xl' }}
              h="full"
            >
              <CardBody textAlign="center">
                <Icon as={LockIcon} w={8} h={8} color="#667eea" mb={4} />
                <Heading size="md" color="#667eea" mb={4}>
                  Login
                </Heading>
                <Text color="gray.600">Access your account</Text>
              </CardBody>
            </Card>
          </Link>
        </SimpleGrid>
      </Container>
    </Box>
  );
}

