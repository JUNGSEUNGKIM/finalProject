import React, {useState} from 'react';
import {
    Box,
    Image,
    Flex,
    IconButton,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalOverlay,
    Modal
} from '@chakra-ui/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination } from 'swiper/modules';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

import 'swiper/css';
import 'swiper/css/pagination';
import useWindowSize from "../../hooks/useWindowSize";
const ImageModal = ({ isOpen, onClose, image }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
            <ModalOverlay />
            <ModalContent>
                <ModalCloseButton />
                <ModalBody p={0}>
                    <Image src={`${process.env.REACT_APP_IMG_URL}${image}`} alt="Enlarged image" w="100%" h="auto" />
                </ModalBody>
            </ModalContent>
        </Modal>
    );
};
const ImageSlider = ({ images, use }) => {
    const [swiper, setSwiper] = useState(null);
    const [modalImage, setModalImage] = useState(null);
    const size = useWindowSize();
    const changeSize = size.width <= 1024 ? 1 : 3;
    const usePostCard = use === 'postCard';
    if(images.split(";").length < 4){
        // alert(images)
        images = images +";"+ images +";"+images +";"+images;
        // console.log(images)
    }

    const handleImageClick = (image) => {
        setModalImage(image);
    };
    // console.log(use)

    return (
        <Box width="100%" maxWidth="100%" margin="auto" position="relative" h={{base:'30vh',lg:'50vh'}} maxH='50vh'  m='5vh auto'>

            <Swiper
                modules={[Navigation, Pagination]}
                spaceBetween={10}
                slidesPerView={!usePostCard?changeSize:1}
                centeredSlides={true}
                initialSlide={1}
                pagination={{
                    clickable: true,
                    el: '.swiper-pagination',
                    type: 'bullets',
                }}
                loop={true}
                onSwiper={setSwiper}
            >
                {images && images.split(';').length > 3 &&  images.split(';').map((image, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <Box
                                maxH={images.split(';').length===1?'50vh': {base:'30vh',lg:'50vh'}}
                                maxW={images.split(';').length===1?'50vh': isActive? '100%' :{base:'30vh',lg:'50vh'}}
                                // minH={images.split(';').length===1?'50vh': {base:'30vh',lg:'50vh'}}
                                // minW={images.split(';').length===1?'50vh': {base:'30vh',lg:'50vh'}}
                                width={isActive ? '100%' : "40%"}
                                height={isActive ? "100%" : "40%"}
                                transition="all 0.3s"
                                transform={isActive ? "scale(1.1) ": "scale(0.9)"}
                                // zIndex={isActive ? 10 : 1}
                                // overflow='hidden'
                                m='0 auto'
                                onClick={() => handleImageClick(image)}

                            >
                                <Image
                                    src={`${process.env.REACT_APP_IMG_URL}${image}`}
                                    alt={`Slide ${index + 1}`}
                                    objectFit={images.split(';').length===1 ?"cover":"contain"}
                                    width="100%"
                                    height="100%"
                                    opacity={isActive ? 1 : 0.6}
                                />
                            </Box>
                        )}
                    </SwiperSlide>

                ))}
            </Swiper>

            {images.split(';').length === 1 || usePostCard ?null:(
            <Flex
                position="absolute"
                bottom="20px"
                right="20px"
                zIndex="1"
                display={{base:'none', md:'block'}}

            >
                <IconButton
                    icon={<ChevronLeftIcon />}
                    onClick={() => swiper.slidePrev()}
                    mr={2}
                    aria-label="Previous slide"
                />
                <IconButton
                    icon={<ChevronRightIcon />}
                    onClick={() => swiper.slideNext()}
                    aria-label="Next slide"
                />
            </Flex>
            )}
            <Box
                className="swiper-pagination"
                position="absolute"
                bottom="20px"
                left="0"
                right="0"
                display="flex"
                justifyContent="center"
                zIndex="1"
            />
            <ImageModal
                isOpen={!!modalImage}
                onClose={() => setModalImage(null)}
                image={modalImage}
            />
        </Box>
    );
};

export default ImageSlider;