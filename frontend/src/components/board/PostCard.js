import React from 'react';
import {Box, Image, Text, Heading, Stack, Button, Flex} from '@chakra-ui/react';
import {useNavigate} from "react-router-dom";
// import useTimeView from "../../hooks/timeView";
import ImageSlider from "../slider/ImageSlider";

function PostCard({location='서울', tourprice='0', likes='0',views='0',boarder_code='0', comments_count='0' ,title='test', author='guest', created_at='2024.04.01', content='test', image_name='/한라산전경2.jpg',page }){
    const navigate = useNavigate()
    // console.log(page)
    // const timeAgo = useTimeView();

    return(
        <Box maxW="lg" overflow="hidden" _hover={{ '& img': { transform: 'scale(1.1)' } }}>
            <Image src={`${process.env.REACT_APP_IMG_URL}${image_name.split(";")[0]}`} alt={`${title} image`} h="2xs" w='full' borderRadius='lg' display='block' objectFit='cover' objectPosition='50% 20%' transition="transform 0.3s ease"/>
            {/*<ImageSlider images={image_name} use={'postCard'}/>*/}
            <Box p={{base:3,lg:4}}>
                <Stack spacing="3">
                    <Flex justifyContent='space-between' _hover={{ cursor: 'pointer', '& h5': { textDecoration: 'underline'  } }} _active={{
                            '& h5': {
                                transform: 'scale(0.98)',
                                boxShadow: 'sm'}
                    }}>
                    <Heading as="h5" size="lg" overflow='hidden'
                             textOverflow='ellipsis'
                             sx={{
                                 display: '-webkit-box',
                                 WebkitBoxOrient: 'vertical',
                                 WebkitLineClamp: 1
                             }}
                             onClick={()=>{navigate(page+"detail/"+boarder_code)}}>
                        {title}
                    </Heading>
                        <Text fontSize='x-large'>[{comments_count}]</Text>
                    </Flex>
                    <Flex justifyContent='space-between' >
                    <Text fontSize="sm" color="gray.500" overflow='hidden' textOverflow='ellipsis' whiteSpace="nowrap">
                        {page==='/board' ? (<>By {author} [ <Text as='span' fontSize='xs'>{timeAgo(created_at)} </Text>] </>):
                            (<> 지역 : {location}  {page} </>) }
                    </Text>
                    <Text fontSize="sm" color="gray.500" textAlign='right' overflow='hidden' textOverflow='ellipsis' whiteSpace="nowrap">
                        {page==='/board' ? (<> 조회수({views})&nbsp;좋아요({likes})</>):
                            (<> 가격 {Number(tourprice).toLocaleString()} 원 </>) }
                    </Text>
                    </Flex>
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
                </Stack>
            </Box>

        </Box>
    )
    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return '방금 전';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}분 전`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}시간 전`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days}일 전`;
        }
    }
}

export default PostCard;