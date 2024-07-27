import {
    Flex,
    IconButton,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Stack, InputGroup, InputLeftElement, Input, Divider, HStack, useBreakpointValue, useColorMode
} from "@chakra-ui/react";

import { useDisclosure} from '@chakra-ui/react'
import { Box } from "@chakra-ui/react"
import {
    AddIcon, CheckIcon, CloseIcon, CopyIcon,
    DragHandleIcon,
    EditIcon,
    ExternalLinkIcon,
    HamburgerIcon,
    RepeatIcon,
    SearchIcon
} from "@chakra-ui/icons";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {useEffect, useRef} from "react";
import  {useNavigate, useLocation} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import { setToken, clearToken } from '../../redux/slices/authSlice';
gsap.registerPlugin(ScrollTrigger);


function Header(props) {
    const dispatch = useDispatch();
    const token = useSelector((state) => state.auth.token);

    const { variant, extra, children, ...rest } = props;
    const { isOpen, onOpen, onClose } = useDisclosure();
    const showMiddleNav = useBreakpointValue({ base: false, xl: true });
    const headerRef = useRef();
    const navigate = useNavigate();
    const location = useLocation();
    const { colorMode, toggleColorMode } = useColorMode();
    useEffect(() => {
        console.log("Current color mode:", colorMode);
        if (colorMode === 'dark') {
            toggleColorMode();
        }
        const header = headerRef.current;
        gsap.to(header, {
            backgroundColor: "rgba(255, 255, 255, 1)",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            duration: 0.3,
            ease: "power1.out",
            scrollTrigger: {
                trigger: header,
                start: "top top",
                end: "bottom top",
                toggleActions: "play none none reverse",
                scrub: true,
            },
        });

    }, []);
    const cleanupPageAnimations = (pageId) => {
        ScrollTrigger.getAll().forEach(trigger => {
            if (trigger.vars.trigger && trigger.vars.trigger.id === pageId) {
                trigger.kill();
            }
        });
        gsap.killTweensOf(`#${pageId}, #${pageId} *`);
    };
    const handleNavigation = (path,tagId) => {
        if (location.pathname === '/') {
            cleanupPageAnimations(tagId);
        } else if (location.pathname === '/board') {
            cleanupPageAnimations(tagId);
        }
        navigate(path);
    };
    return (
        <div>
            <Flex flexDirection="column"  alignItems="center"  px={4} minWidth='370px'  ref={headerRef}
                  position="fixed"
                  // top=""
                  width="100%"
                  bg="transparent"
                  boxShadow="none"
                  transition="background-color 0.3s, box-shadow 0.3s"
                  zIndex="1000" >

                <Flex h='4' mb='2' alignItems="center" justifyContent='flex-end' maxWidth='container.xl' w='100%'  >

                    <HStack as="nav" textAlign='center' spacing={4} fontSize='0.8em' w='200px'>
                        {token==null?
                            <Box w='50px' onClick={()=>{handleNavigation("/login","main-video")
                                                                }}>로그인</Box>:
                            <Box w='50px' onClick={()=>{dispatch(clearToken(token))
                                                                navigate("/")}}>로그아웃</Box>

                        }

                        <Box w='50px'>회원가입</Box>
                        <Box w='50px'>고객센터</Box>
                    </HStack>

                </Flex>
                <Divider />
                <Box maxWidth="container.xl" w="100%">
                    <Flex h={16} alignItems="center" justifyContent="space-between">
                        <HStack w='80%'>
                        <Box w='20%'>Logo</Box>
                        <Stack spacing={4} w={{ base: '100%', md: '80%' }} >
                            <InputGroup w={{ base: '100%', md: '58%' }} marginTop='5px'  >

                                <Input type='tel' placeholder='검색어를 입력하세요' borderRadius='full' />
                                <InputLeftElement pointerEvents='none' >
                                    <SearchIcon color='gray.300' />

                                </InputLeftElement>
                            </InputGroup>

                        </Stack>
                        </HStack>
                        <HStack textAlign='center' fontSize='0.8em' as="nav" spacing={4} w='200px' display={{ base: "none", md: "flex" }}>
                            <Box w='50px'> <IconButton
                                isRound={true}
                                variant='solid'
                                colorScheme='teal'
                                aria-label='Done'
                                fontSize='20px'
                                icon={<DragHandleIcon/>}
                            />마이메뉴</Box>
                            <Box w='50px'><IconButton
                                isRound={true}
                                variant='solid'
                                colorScheme='teal'
                                aria-label='Done'
                                fontSize='20px'
                                icon={<CopyIcon/>}
                            />회원가입</Box>
                            <Box w='50px'><IconButton
                                isRound={true}
                                variant='solid'
                                colorScheme='teal'
                                aria-label='Done'
                                fontSize='20px'
                                icon={<CheckIcon/>}
                            />찜</Box>
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
                                <Box>Home</Box>
                                <Box>About</Box>
                                <Box>Contact</Box>
                            </Stack>
                        </Box>
                    ) : null}
                </Box>
                <Divider my='5px'/>

                <Flex maxWidth='container.xl' fontSize='1em' justifyContent="space-between" w="100%" alignItems="center">
                    <HStack>

                        <Flex flexDirection="row" alignItems="center">
                            <Stack direction="row" h="100%" >
                                <Divider orientation="vertical" />
                            </Stack>
                            <Menu w='100%'>
                                <MenuButton
                                    as={IconButton}
                                    aria-label="Options"
                                    icon={<HamburgerIcon />}
                                    variant="outline"
                                />
                                <MenuList w='1000px'>
                                    <Flex>
                                    <Flex flexDirection="column">
                                        <MenuItem icon={<AddIcon />} command="⌘T" w='200px'>
                                             New Tab
                                        </MenuItem>
                                        <MenuItem icon={<ExternalLinkIcon />} command="⌘N"  w='200px'>
                                            New Window
                                        </MenuItem>
                                        <MenuItem icon={<RepeatIcon />} command="⌘⇧N" w='200px'>
                                            Open Closed Tab
                                        </MenuItem>
                                        <MenuItem icon={<EditIcon />} command="⌘O" w='200px'>
                                            Open File...
                                        </MenuItem>
                                    </Flex>
                                    <Flex flexDirection="column">
                                        <MenuItem icon={<AddIcon />} command="⌘T" w='200px'>
                                            New Tab
                                        </MenuItem>
                                        <MenuItem icon={<ExternalLinkIcon />} command="⌘N"  w='200px'>
                                            New Window
                                        </MenuItem>
                                        <MenuItem icon={<RepeatIcon />} command="⌘⇧N" w='200px'>
                                            Open Closed Tab
                                        </MenuItem>
                                        <MenuItem icon={<EditIcon />} command="⌘O" w='200px'>
                                            Open File...
                                        </MenuItem>
                                    </Flex>
                                    </Flex>

                                </MenuList>
                            </Menu>
                            <Box mx="1em" fontSize="13px">
                                전체메뉴
                            </Box>
                            <Stack direction="row" h="100%">
                                <Divider orientation="vertical" />
                            </Stack>
                        </Flex>


                        {showMiddleNav && (
                            <HStack id={1} spacing={4}>
                                <Box>베스트</Box>
                                <Box>해외여행</Box>
                                <Box>항공</Box>
                                <Box>호텔</Box>
                                <Box>항공+호텔</Box>
                                <Box>투어/입장권</Box>
                                <Box>국내여행</Box>
                                <Box>테마여행</Box>
                                <Box>제우스</Box>
                                <Box>하나LIVE</Box>
                            </HStack>
                        )}
                    </HStack>

                    <HStack id={2} spacing={4}>
                        <Box>여행기획전</Box>
                        <Box>맞춤여행</Box>
                        <Box>이달의 혜택</Box>
                    </HStack>
                </Flex>

                <Divider my='5px'/>
            </Flex>





        </div>
    );
}

export default Header;