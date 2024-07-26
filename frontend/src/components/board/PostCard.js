import React from 'react';
import { Box, Image, Text, Heading, Stack, Button } from '@chakra-ui/react';

function PostCard({ title='hello', author='admin1', date='2024.04.01', content='안녕하세요', imageUrl='/img/image01.jpg' }){

    return(
        <Box
            maxW="lg"
            // borderWidth="1px"
            // borderRadius="lg"
            overflow="hidden"
            // boxShadow="md"
        >
            <Image src={imageUrl} alt={`${title} image`} h="2xs" w='full' borderRadius='lg' display='block' objectFit='cover' objectPosition='50% 20%'/>

            <Box p={{base:3,lg:6}}>
                <Stack spacing="3">
                    <Heading as="h3" size="lg">
                        {title}
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                        By {author} on {date}
                    </Text>
                    <Text mt="2"
                          minHeight="4.5em"
                          overflow='hidden'
                          textOverflow='ellipsis'
                          sx={{
                              display: '-webkit-box',
                              WebkitBoxOrient: 'vertical',
                              WebkitLineClamp: { base: 2, md: 3 }
                          }} >
                        {content}
                    </Text>
                    <Button colorScheme="teal" size="sm">
                        Read More
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default PostCard;