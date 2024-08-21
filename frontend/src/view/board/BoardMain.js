import React, {useState, useEffect, useRef, useMemo} from 'react';
import {
    SimpleGrid,
    Box,
    Text,
    Spinner,
    Center,
    VStack,
    InputGroup,
    InputRightElement,
    Input,
    Flex,
    Image,
    Button,
    HStack,
    Tooltip,
    keyframes
} from '@chakra-ui/react';
import PostCard from '../../components/board/PostCard';
import {Search2Icon} from "@chakra-ui/icons";
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import useWindowSize from "../../hooks/useWindowSize";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {Map, MapMarker} from "react-kakao-maps-sdk";
import HeaderImg from "../../components/header/HeaderImg";

gsap.registerPlugin(ScrollTrigger);

function BoardMain({page}) {
    const [displayPosts, setDisplayPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [totalPages, setTotalPages] = useState(1);
    const observerTarget = useRef(null);
    const size = useWindowSize();
    const changeSize = size.width <= 1024 // lg 브레이크포인트
    const isLargeScreen =  size.width >= 1024
    const navigate = useNavigate();
    const pageCheck = useRef(page)
    const userCheck = useRef()


    const token = useSelector((state) => state.auth.token);
    const fetchData = async (newPage) => {
        if(isLargeScreen){
            window.scrollTo({
                top:0 ,
                behavior: 'smooth' // 부드러운 스크롤
            });
        }
        try {
            // console.log(page)
            const [response] = await Promise.all([
                axios.get( `${process.env.REACT_APP_BOARD_URL}${page}main?page=${newPage}`,{headers: {
                        Authorization: token
                    }}, { withCredentials: true })
            ]);
            const responseData = response.data;
            setCurrentPage(responseData.currentPage);
            setTotalPages(responseData.totalPage);
            setDisplayPosts(responseData.board)
            userCheck.current = responseData.userCheck;
            // console.log(displayPosts)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const loadMorePosts = () => {
            if (currentPage > totalPages) return;
            const newPosts = displayPosts;
            fetchData(currentPage)
            setIsLoading(true);
            setTimeout(() => {
                setDisplayPosts(prevPosts => [...newPosts, ...prevPosts]);
                if(size.width !== undefined && !isLargeScreen) {
                    setCurrentPage(prevPage => prevPage + 1);
                }
                setIsLoading(false);
            }, 1000);

    };
    useEffect(() => {
        const observer = new IntersectionObserver(
            entries => {
                if (entries[0].isIntersecting && !isLoading) {
                    loadMorePosts();
                }
            },
            {threshold: 1.0}
        );
        if(size.width !== undefined) {
            if (!isLargeScreen) {
                if (observerTarget.current) {
                    observer.observe(observerTarget.current);
                }
                return () => {
                    if (observerTarget.current) {
                        observer.unobserve(observerTarget.current);
                    }
                };
            }
        }else{
            return () => {
                fetchData(currentPage)
                if (observerTarget.current) {
                    observer.observe(observerTarget.current);
                }
            }
        }
    }, [isLoading,isLargeScreen]);

    useEffect(() => {

        return ()=>{
            if(size.width !== undefined){
                window.scrollTo({
                    top:0 ,
                    behavior: 'smooth' // 부드러운 스크롤
                });
                setCurrentPage(1)
                fetchData(1)
            }

        }
    }, [changeSize,isLargeScreen]);
    useEffect(() => {
        // console.log(pageCheck.current)
        if(pageCheck.current!==page){
          fetchData(1)
        }
        pageCheck.current = page;
        // console.log(pageCheck.current)

    }, [page]);

    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY);
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    const buttonPosition = Math.min(20 + scrollY * 0.1, 40);

    return (
        <VStack spacing={0} align="stretch" w='100%'>
           <HeaderImg page={page}/>
            <Box w='100%' justifyContent='center' p={{base:1, md:3, lg:5}} maxWidth='container.xl' margin='0 auto'>
                <Flex h="100%" mt='20' mb='7' alignContent='center' px={{base:2, md:5, lg:10}} justifyContent="space-between" alignItems='flex-end'>
                    <Text fontSize="4xl" color="black" fontWeight="bold" >

                    </Text>
                    <InputGroup w='30%' alignContent='bottom'>
                        <InputRightElement pointerEvents='none'>
                            <Search2Icon color='gray.300' />
                        </InputRightElement>
                        <Input
                            type='text'
                            placeholder='검색어를 입력해주세요.'
                            variant='flushed'
                            borderBottom='1px solid'
                            borderColor='gray.400'
                            _focus={{
                                borderColor: 'blue.500',
                                boxShadow: 'none'
                            }}
                        />
                    </InputGroup>
                </Flex>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing="5" maxWidth='container.xl' margin="0 auto" px={{base:2, md:5, lg:10}} alignItems='center'>
                {displayPosts.map((post, index) => (
                    <PostCard key={index} {...post} page={page}/>
                ))}
            </SimpleGrid>
            {!isLargeScreen && isLoading && (
                <Center mt={4}>
                    <Spinner />
                </Center>
            )}
            {!isLargeScreen && !isLoading && currentPage <= totalPages && (
                <div ref={observerTarget} style={{ height: '10px', margin: '20px 0' }} />
            )}
            {!isLargeScreen && currentPage > totalPages && (
                <Center mt={4}>
                    <Text>모든 게시물을 불러왔습니다.</Text>
                </Center>
            )}
            {isLargeScreen && (
                <HStack justifyContent="center" mt={4} spacing={2}>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                        <Button
                            key={page}
                            onClick={() => fetchData(page)}
                            colorScheme={currentPage === page ? "blue" : "gray"}
                        >
                            {page}
                        </Button>
                    ))}
                </HStack>
            )}
                {page==='/board'|| userCheck.current ?(
                <Tooltip label="새 글 작성" placement="top">
                    <Button
                        position="fixed"
                        bottom={`${buttonPosition}px`}
                        left="50%"
                        transform="translateX(-50%)"
                        colorScheme="blue"
                        size="lg"
                        borderRadius="full"
                        boxShadow="lg"
                        zIndex={1000}
                        onClick={() => {navigate(page+"Write")}}
                        transition="bottom 0.3s ease-out"
                        _hover={{
                            transform: "translateX(-50%) scale(1.05)",
                        }}
                    >
                        글쓰기
                    </Button>
                </Tooltip>
                    ) : null}
            </Box>
        </VStack>
    );
}

export default BoardMain;