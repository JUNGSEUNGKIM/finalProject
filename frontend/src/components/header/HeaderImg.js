import React, {useEffect, useRef} from 'react'
import {Box, Center, Image, Text} from "@chakra-ui/react";
import {gsap} from "gsap";



const HeaderImg = ({page}) => {
    const overlayRef = useRef(null);
    useEffect(() => {
        const overlay = overlayRef.current;

        gsap.to(overlay, {
            // backgroundColor: 'rgba(0,0,0,1)',
            backgroundColor: 'rgba(255,255,255,1)',
            scrollTrigger: {
                trigger: overlay,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
    }, []);
    return (
        <>
            <Box w="100%" h={{ base: "200px", md: "400px" }} position="relative" overflow="hidden"
            >
                <Image
                    src="/img/header_img_1.png"
                    alt="Background"
                    objectFit="cover"
                    objectPosition="50% 20%"
                    w="100%"
                    h="100%"
                />
                <Box
                    ref={overlayRef}
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="rgba(0,0,0,0)"  // 초기 투명 상태

                >
                    <Center h="140%">
                        <Text fontSize={{ base: "2xl", md: "6xl" }} color="white" fontWeight="bold">
                            {page === '/board' ? (<>COMMUNITY BOARD</>):(<> STORE BOARD</>)}
                        </Text>
                    </Center>
                </Box>
            </Box>
        </>
    )
}
export default HeaderImg;