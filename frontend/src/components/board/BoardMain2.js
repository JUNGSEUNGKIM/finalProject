import React, { useState, useEffect } from 'react';
import {SimpleGrid, Box, Text, Button, Stack, HStack} from '@chakra-ui/react';
import PostCard from './PostCard';

function BoardMain2({posts}){
    const [currentPage, setCurrentPage] = useState(1);
    const [displayPosts, setDisplayPosts] = useState([]);
    const postsPerPage = 12;
    const totalPages = Math.ceil(posts.length / postsPerPage);

    useEffect(() => {
        const startIndex = (currentPage - 1) * postsPerPage;
        const endIndex = startIndex + postsPerPage;
        setDisplayPosts(posts.slice(startIndex, endIndex));
    }, [currentPage, posts]);

    const loadMorePosts = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };
    const changePage = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.innerWidth < 768 && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight) {
                loadMorePosts();
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    return(
        <Box w='100%' justifyContent='center' p={{base:1, md:3, lg:5}}  >
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="5" maxWidth='container.xl' margin="0 auto" px={{base:2, md:5, lg:10}} >
                <PostCard
                    key={'1'}
                    title='Sample Post'
                    author='Author Name'
                    date='Date'
                    content='This is a sample post content. It should be brief and interesting to'
                    imageUrl='/img/image01.jpg'
                />
                {displayPosts.map((post, index) => (
                    <PostCard key={index} {...post} />
                ))}
            </SimpleGrid>
            <HStack spacing={2} mt={10}>
                <Button
                    onClick={() => changePage(currentPage - 1)}
                    isDisabled={currentPage === 1}
                >
                    Previous
                </Button>
                <Text>{currentPage} / {totalPages}</Text>
                <Button
                    onClick={() => changePage(currentPage + 1)}
                    isDisabled={currentPage === totalPages}
                >
                    Next
                </Button>
            </HStack>
        </Box>
    )
}

export default BoardMain2;