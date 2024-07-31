import React from 'react';
import { Box, Container, Stack, Text, Link, useColorModeValue, Icon } from '@chakra-ui/react';


const Footer = () => {
    return (
        <Box
            bg={useColorModeValue('gray.50', 'gray.900')}
            color={useColorModeValue('gray.700', 'gray.200')}
        >
            <Container
                as={Stack}
                maxW={'6xl'}
                py={4}
                direction={{ base: 'column', md: 'row' }}
                spacing={4}
                justify={{ base: 'center', md: 'space-between' }}
                align={{ base: 'center', md: 'center' }}
            >
                <Text>© 2024 Your Company Name. All rights reserved</Text>
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>Home</Link>
                    <Link href={'#'}>About</Link>
                    <Link href={'#'}>Contact</Link>
                </Stack>
                <Stack direction={'row'} spacing={6}>
                    <Link href={'#'}>

                    </Link>
                    <Link href={'#'}>

                    </Link>
                    <Link href={'#'}>
                        {/*<Icon as={} w={6} h={6} />*/}
                    </Link>
                </Stack>
            </Container>
        </Box>
    );
};

export default Footer;