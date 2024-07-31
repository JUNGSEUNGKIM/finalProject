import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

function VideoBackground() {
    const bodyRef = useRef();
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => {
            setIsMobile(window.innerWidth <= 768);
        };

        checkMobile();
        window.addEventListener('resize', checkMobile);

        const bodyin = bodyRef.current;

        gsap.set(bodyin, { position: "fixed", clearProps: "transform" });
        gsap.set(".typo01, .typo02", {
            transform: isMobile ? 'translateY(-100px)' : 'translateY(-200px)',
            y: isMobile ? 50 : 100,
            opacity: 0
        });
        gsap.set(".typo03, .typo04", {
            display: 'block',
            fontSize: isMobile ? '5vw' : '40px',
            fontWeight: 400
        });
        gsap.set(".video-background", { opacity: 1 });

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: bodyRef.current,
                start: "top top",
                end: "100% top",
                scrub: true,
                markers: true,
                pin: true,
                onEnter: () => {
                    gsap.set(bodyRef.current, { position: "fixed", clearProps: "transform" });
                },
                onLeave: () => {
                    gsap.set(bodyRef.current, { position: "absolute", clearProps: "transform" });
                },
                onLeaveBack: () => {
                    gsap.set(bodyRef.current, { position: "absolute", clearProps: "transform" });
                },
                onEnterBack: () => {
                    gsap.set(bodyRef.current, { position: "fixed", clearProps: "transform" });
                }
            }
        });

        tl.to(".typo01", { y: 0, opacity: 1, duration: 1 })
            .to(".typo02", { y: 0, opacity: 1, duration: 1 }, "-=0.5")
            .to('.typo03', { opacity: 0, duration: 1 })
            .to(".typo04", { opacity: 0, duration: 1 })
            .to(".typo01, .typo02, .typo04", { opacity: 0, duration: 1 }, "+=1")
            .to(".video-background", { opacity: 0, duration: 2 });

        const handleOrientationChange = () => {
            ScrollTrigger.refresh();
        };

        window.addEventListener('orientationchange', handleOrientationChange);

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            window.removeEventListener('resize', checkMobile);
            window.removeEventListener('orientationchange', handleOrientationChange);
        };
    }, [isMobile]);

    return (
        <div id="main-video">
            <Box position="relative" height="100vh" overflow="hidden" width='100%' ref={bodyRef}>
                <Box
                    className="video-background"
                    as="video"
                    autoPlay
                    loop
                    muted
                    playsInline
                    position="absolute"
                    top="50%"
                    left="50%"
                    width="100%"
                    height="100%"
                    objectFit='cover'
                    transform="translate(-50%, -50%)"
                    zIndex="-1"
                >
                    <source src="12052297_3840_2160_60fps.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                </Box>
                <Flex
                    direction="column"
                    align="center"
                    justify="center"
                    height="100%"
                    color="white"
                    textAlign="center"
                    p={5}
                >
                    <HStack flexWrap="wrap" justifyContent="center">
                        <Heading className='typo01' as="h1" size={isMobile ? "xl" : "2xl"} mb={4}>
                            비디오
                        </Heading>
                        <Heading className='typo02' as="h1" size={isMobile ? "xl" : "2xl"} mb={4}>
                            배경 예제
                        </Heading>
                    </HStack>
                    <HStack flexWrap="wrap" justifyContent="center">
                        <Text className='typo03' fontSize={isMobile ? "lg" : "xl"}>
                            Chakra UI를 사용하여
                        </Text>
                        <Text className='typo04' fontSize={isMobile ? "lg" : "xl"}>
                            비디오 배경을 설정하는 방법을 배우세요.
                        </Text>
                    </HStack>
                </Flex>
            </Box>
            <Box height='100vh'></Box>
        </div>
    );
}

export default VideoBackground;
