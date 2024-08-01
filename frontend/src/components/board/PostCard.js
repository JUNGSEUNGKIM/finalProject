import React from 'react';
import { Box, Image, Text, Heading, Stack, Button } from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";

function PostCard({likes='0',views='0',boarder_code='0', comments_count='0' ,title='hello', author='admin1', date='2024.04.01', content='안녕하세요', image_name='/img/image01.jpg' }){
    const navigate = useNavigate()
    return(
        <Box
            maxW="lg"
            // borderWidth="1px"
            // borderRadius="lg"
            overflow="hidden"
            // boxShadow="md"
        >
            <Image src={`${process.env.REACT_APP_IMG_URL}${image_name}`} alt={`${title} image`} h="2xs" w='full' borderRadius='lg' display='block' objectFit='cover' objectPosition='50% 20%'/>

            <Box p={{base:3,lg:6}}>
                <Stack spacing="3">
                    <Heading as="h3" size="lg" overflow='hidden'
                             textOverflow='ellipsis'
                             sx={{
                                 display: '-webkit-box',
                                 WebkitBoxOrient: 'vertical',
                                 WebkitLineClamp: 1
                             }}>
                        {title}[{comments_count}]
                    </Heading>
                    <Text fontSize="sm" color="gray.500">
                        By {author} on {date}
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign='right'>
                        조회수 {views} 좋아요 {likes}
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
                    <Button colorScheme="teal" size="sm" onClick={()=>{navigate("/"+boarder_code)}}>
                        Read More
                    </Button>
                </Stack>
            </Box>
        </Box>
    )
}

export default PostCard;