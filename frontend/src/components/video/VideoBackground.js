import {Box, Flex, Heading, HStack, Stack, Text} from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, {useEffect, useRef} from "react";
gsap.registerPlugin(ScrollTrigger);
function VideoBackground () {
    const bodyRef = useRef()
    const bodyin = bodyRef.current;
    useEffect(() => {
        gsap.set(bodyin, { position: "fixed", clearProps: "transform" });
        gsap.set(".typo01, .typo02", { transform:'translateY(-200px)' ,y: 100, opacity: 0 });
        gsap.set(".typo03", { display: 'block', fontSize: '40px', fontWeight: 400, });
        gsap.set(".typo04", { display: 'block', fontSize: '40px', fontWeight: 400 });
        gsap.set(".video-background", { opacity: 1 });

        const tl=gsap.timeline({
            scrollTrigger:{
                trigger: bodyRef.current,
                start: "top top ",
                end: "100% top",
                scrub: true,
                markers: true,
                pin:true,
                // pinSpacing: false,
                onEnter: () => {
                    gsap.set(bodyRef.current,{position: "fixed", clearProps: "transform" });
                },onLeave: () => {
                    gsap.set(bodyRef.current, {position:"absolute", clearProps: "transform" });
                },
                onLeaveBack: () => {
                    gsap.set(bodyRef.current, {position:"absolute", clearProps: "transform" });
                },
                onEnterBack: () => {
                    gsap.set(bodyRef.current, {position:"fixed", clearProps: "transform"});
                }
            }
        })
        tl.to(".typo01", { y: 0, opacity: 1, duration: 1 })
            .to(".typo02", { y: 0, opacity: 1, duration: 1 }, "-=0.5")
            .to('.typo03', { opacity: 0, duration: 1 })
            .to(".typo04", { opacity: 0, duration: 1 })
            .to(".typo01, .typo02, .typo04", { opacity: 0, duration: 1 }, "+=1") // 텍스트 페이드 아웃
            .to(".video-background", { opacity: 0, duration: 2 }); // 비디오 천천히 페이드 아웃
        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            // gsap.globalTimeline.clear();
            // gsap.killTweensOf(bodyin);
        };
    }, []);
    return (
      <div id="main-video">
        <Box position="relative" height="100vh" overflow="hidden" ref={bodyRef}  >
            {/* 비디오 배경 */}
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
                minWidth="100%"
                minHeight="100%"
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
                <HStack>
                        <Heading className='typo01' as="h1" size="2xl" mb={4}>
                            비디오
                        </Heading>
                        <Heading className='typo02' as="h1" size="2xl" mb={4}>
                        배경 예제
                        </Heading>
                </HStack>
                <HStack>
                        <Text className='typo03' fontSize="xl">
                        hakra UI를 사용하여
                        </Text>
                        <Text className='typo04' fontSize="xl">
                        비디오 배경을 설정하는 방법을 배우세요.
                        </Text>
                </HStack>
            </Flex>
        </Box>
          <Box height='10000vh'></Box>
      </div>

    );
};

export default VideoBackground;
