import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import {
    Flex,
    IconButton,
    Stack,
    InputGroup,
    InputLeftElement,
    Input,
    Divider,
    HStack,
    useBreakpointValue,
    useColorMode,
    useDisclosure,
    Box,
    Button,
    Icon, Image, Text
} from "@chakra-ui/react";
import {CloseIcon,HamburgerIcon, SearchIcon} from "@chakra-ui/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {useEffect, useRef, useState} from "react";
import  {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setToken, clearToken } from '../../redux/slices/authSlice';
import { ReactComponent as Logo } from '../../assets/css/logo.svg';
gsap.registerPlugin(ScrollTrigger);


function Header(props) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);
    const nickName = useSelector((state)=> state.auth.nickName);

    const { variant, extra, children, ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showMiddleNav = useBreakpointValue({ base: false, xl: true });
    const headerRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    const [iconButtonColor, setIconButtonColor] = useState("white");
    const prevScrollY = useRef(0);
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [isNav, setIsNav] = useState(true);
    const [num, setNum] = useState(1)


    useEffect(() => {
        setNum(1) ;
        setIconButtonColor('white')
    }, [location]);

    useEffect(() => {
      // console.log("Current color mode:", colorMode);
        if (colorMode === 'dark') {
            toggleColorMode();
        }
        const header = headerRef.current;

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            if (currentScrollY > prevScrollY.current) {
                setIsNavVisible(false);
            } else {
                setIsNavVisible(true);
            }
            prevScrollY.current = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });
        // const currentScrollY = window.scrollY;

        gsap.to(header, {
            backgroundColor: "rgba(0, 0, 0, 0.3)",
            // backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.4)",
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: header,
                start: "top top",
                end: "bottom top",
                toggleActions: "play none none reverse",
                scrub: true,
                onUpdate: (self) => {
                    const progress = self.progress;
                    const backgroundColor = `rgba(255, 255, 255, ${progress})`;
                    const textColor = progress > 0.3 ? 'black' : 'white';

                    gsap.set(header, {backgroundColor, color: textColor});
                    setIconButtonColor(textColor);
                },
            },
        });
        return () => {
            window.removeEventListener('scroll', handleScroll);

        };

    }, [ location, isNav]);
    useEffect(() => {
        if(num === 1){
            setIsNav(!isNav)
            setNum(num+1)
        }

        const tnav = headerRef.current.querySelector('.topNavigation');
        gsap.to(tnav, {
            opacity: isNavVisible ? 1 : 0,
            height: isNavVisible ? 'auto' : 0,
            marginTop: isNavVisible ? 'auto' : 0,
            marginBottom: isNavVisible ? 'auto' : 0,
            y: isNavVisible ? 0 : -100,
            duration: 0.3,
            ease: "power2.out",
            onComplete: () => {
                tnav.style.pointerEvents = isNavVisible ? 'auto' : 'none';
            }
        });

    }, [isNavVisible]);


    return (
        <div color='white'>


            <Flex flexDirection="column"  alignItems="center"  px={4} minWidth='320px'  ref={headerRef}
                  position="fixed"
                  color='white'
                  width="100%"
                  bg="transparent"
                  boxShadow="none"
                  transition="background-color 0.3s, box-shadow 0.3s"
                  zIndex="1000"
                  >
                <Box h='2vh'/>

                <Flex h='4' mb='2' alignItems="center" justifyContent='flex-end' maxWidth='container.xl' w='100%' className='topNavigation'  >
                    <HStack as="nav" textAlign='center' spacing={4} fontSize='0.8em' minWidth={{ base: '0', sm:'0', md: '182px' }} ></HStack>
                    <HStack w='100%'>
                        <Text w='100%' textAlign={{base: 'left', sm: 'left', md:'center'}} fontSize={{base:'xl',sm:'2xl', md:'3xl'}} fontWeight='bold'>G  A  R  A  G  E</Text>
                    </HStack>
                    <HStack as="nav" textAlign='center' spacing={4} fontSize='0.8em' w='200px'>

                        {token==null?
                            <Box w='50px' onClick={()=>{navigate("/login")
                            }}><Button
                                fontSize="inherit"
                                bg="transparent"
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                                p={0}
                            >로그인</Button></Box>:
                            <Box w='50px' onClick={()=>{dispatch(clearToken(token))
                                                                navigate("/login")}}><Button
                                fontSize="inherit"
                                bg="transparent"
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                                p={0}
                            >로그아웃</Button></Box>

                        }

                        <Box w='50px'><Button
                            fontSize="inherit"
                            bg="transparent"
                            sx={{
                                color: iconButtonColor,
                                _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                            }}
                            p={0}
                        >회원가입</Button></Box>
                        <Box w='50px'><Button
                            fontSize="inherit"
                            bg="transparent"
                            sx={{
                                color: iconButtonColor,
                                _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                            }}
                            p={0}
                        >고객센터</Button></Box>
                    </HStack>

                </Flex>
                <Divider />
                <Box maxWidth="container.xl" w="100%">
                    <Flex h={16} alignItems="center" justifyContent="space-between" >
                        <HStack w={{ base: '20%', md: '20%' }}>
                            <Box display='flex' alignItems='center' justifyContent='center' w='100%'
                                 transition="transform 0.3s ease"
                                 _hover={{cursor: 'pointer', '& h5': {transform: 'scale(1.1)'}}} onClick={()=>{navigate("/")}}>
                                <Logo style={{width:'150px', height:'90px'}} />
                                {/*<Text>GARAGE</Text>*/}
                            </Box>

                        </HStack>
                        <HStack textAlign='center' fontSize='0.8em' as="nav" spacing={4} w='60%'
                                display={{base: "none", md: "flex"}} alignItems="center" justifyContent="center" gap='10%' >

                            <Box w='50px' onClick={()=>{navigate("/location")}}><IconButton
                                className='icon-button'
                                variant='ghost'
                                aria-label='My Menu'
                                fontSize='20px'
                                icon={<FontAwesomeIcon icon="fa-location-dot" />}
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                            />지역별</Box>
                            <Box w='50px'><IconButton
                                className='icon-button'
                                variant='ghost'
                                aria-label='My Menu'
                                fontSize='20px'
                                icon={<FontAwesomeIcon icon="fa-sharp fa-star"/>}
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                            />추천</Box>
                            <Box w='50px' onClick={()=>{navigate("/board")}}><IconButton

                                className='icon-button'
                                variant='ghost'
                                aria-label='My Menu'
                                fontSize='20px'
                                icon={<FontAwesomeIcon icon="fa-clipboard" />}
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                            />게시판</Box>
                            <Box w='50px'  onClick={()=>{navigate("/store")}}><IconButton
                                className='icon-button'
                                variant='ghost'
                                aria-label='My Menu'
                                fontSize='20px'
                                icon={<FontAwesomeIcon icon="fa-solid fa-store"/>}
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                            />STORE</Box>
                            <Box w='50px'> <IconButton
                                className='icon-button'
                                variant='ghost'
                                aria-label='My Menu'
                                fontSize='20px'
                                icon={<FontAwesomeIcon icon="fa-solid fa-heart-circle-check" />}
                                sx={{
                                    color: iconButtonColor,
                                    _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                    _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                }}
                            />{nickName ? nickName : "MY"}</Box>
                        </HStack>

                        <HStack w={{ base: '58%', md: '20%' }}>
                            <Stack spacing={4} w={{ base: '100%', md: '100%' }} >
                                <InputGroup w={{ base: '100%', md: '100%' }} marginTop='5px'  >

                                    <Input type='tel' placeholder='검색어를 입력하세요' borderRadius='full'
                                           borderColor={iconButtonColor}
                                           _placeholder={{ color: iconButtonColor==='white'?'black':'gray' }}
                                           color='black'
                                           bg='gba(245, 245, 220, 0.0001)'
                                    />
                                    <InputLeftElement>
                                        <SearchIcon color='gray.300' onClick={()=>{
                                            alert("hello")
                                        }} />
                                    </InputLeftElement>
                                </InputGroup>

                            </Stack>
                        </HStack>
                        <IconButton
                            size="md"
                            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
                            aria-label="Open Menu"
                            display={{ md: "none" }}
                            onClick={isOpen ? onClose : onOpen}
                        />
                    </Flex>

                    {isOpen ? (
                        <Box pb={4} display={{ md: "none" }}>
                            <Stack as="nav" spacing={4}>
                                <Box onClick={()=>{navigate("/location")}}><IconButton
                                    className='icon-button'
                                    variant='ghost'
                                    aria-label='My Menu'
                                    fontSize='20px'
                                    icon={<FontAwesomeIcon icon="fa-location-dot" />}
                                    sx={{
                                        color: iconButtonColor,
                                        _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                        _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                    }}
                                />지역별</Box>
                                <Box ><IconButton
                                    className='icon-button'
                                    variant='ghost'
                                    aria-label='My Menu'
                                    fontSize='20px'
                                    icon={<FontAwesomeIcon icon="fa-sharp fa-star"/>}
                                    sx={{
                                        color: iconButtonColor,
                                        _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                        _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                    }}
                                />추천</Box>
                                <Box onClick={()=>{navigate("/board")}}><IconButton

                                    className='icon-button'
                                    variant='ghost'
                                    aria-label='My Menu'
                                    fontSize='20px'
                                    icon={<FontAwesomeIcon icon="fa-clipboard" />}
                                    sx={{
                                        color: iconButtonColor,
                                        _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                        _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                    }}
                                />게시판</Box>
                                <Box  onClick={()=>{navigate("/store")}}><IconButton
                                    className='icon-button'
                                    variant='ghost'
                                    aria-label='My Menu'
                                    fontSize='20px'
                                    icon={<FontAwesomeIcon icon="fa-solid fa-store"/>}
                                    sx={{
                                        color: iconButtonColor,
                                        _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                        _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                    }}
                                />STORE</Box>
                                <Box > <IconButton
                                    className='icon-button'
                                    variant='ghost'
                                    aria-label='My Menu'
                                    fontSize='20px'
                                    icon={<FontAwesomeIcon icon="fa-solid fa-heart-circle-check" />}
                                    sx={{
                                        color: iconButtonColor,
                                        _hover: { bg: 'transparent', color: iconButtonColor === 'white' ? '#ADD8E6' : '#ADD8E6' },
                                        _active: { bg: 'transparent', color: iconButtonColor === 'white' ? '#90EE90' : '#90EE90' },
                                    }}
                                />{nickName ? nickName : "MY"}</Box>
                            </Stack>
                        </Box>
                    ) : null}
                </Box>
                <Divider my='5px'/>

            </Flex>





        </div>
    );
}

export default Header;