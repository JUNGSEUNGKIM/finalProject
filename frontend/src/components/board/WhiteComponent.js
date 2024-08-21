import React, {useState, useEffect, useRef} from 'react';
import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    VStack,
    Image,
    IconButton,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    InputGroup,
    InputLeftAddon, Center, Text, SimpleGrid,
} from '@chakra-ui/react';
import { AttachmentIcon, CloseIcon } from '@chakra-ui/icons';
import {Map, MapMarker} from "react-kakao-maps-sdk";
import {gsap} from "gsap";
import HeaderImg from "../header/HeaderImg";
import axios from "axios";
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";

function WriteComponent({page}) {
    const navigate = useNavigate();

    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [image, setImage] = useState(null);
    const [file, setFile] = useState(null);
    const [price, setPrice] = useState('');
    const [address, setAddress] = useState('');
    const [detailAddress, setDetailAddress] = useState('');
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [position, setPosition] = useState({lat: 37.5665, lng: 126.9780,});
    const [festivalList, setFestivalList] = useState(null);
    const [inputKey, setInputKey] = useState(0);
    const [propsCheck,setPropsCheck] = useState(page==="/boardcreate");
    const token = useSelector((state) => state.auth.token);
    useEffect(() => {
        return () =>{
            festivalData();
        }
    }, []);

    const festivalData = async () => {
        try{
            const [response] = await Promise.all([
                axios.get(`${process.env.REACT_APP_FESTIVAL_URL}/festivallist`,{header:{
                    Authorization: token}},
                    {withCredentials: true}
                )
            ]);
            const responseData = response.data;
            setFestivalList(responseData);
            // console.log(responseData)
        } catch (error){
            console.error('Error fetching data:', error);
        }
    }

    const handleClick = (_t, mouseEvent) => {
        setPosition({
            lat: mouseEvent.latLng.getLat(),
            lng: mouseEvent.latLng.getLng(),
        });

        const geocoder = new window.kakao.maps.services.Geocoder();
        geocoder.coord2Address(mouseEvent.latLng.getLng(), mouseEvent.latLng.getLat(), (result, status) => {
            if (status === window.kakao.maps.services.Status.OK) {
                const addr = result[0].address.address_name;
                setAddress(addr);
            }
        });
    };

    const handleImageUpload = async (e) => {
        const files = [...e.target.files];
        setFile(files)
        const imagePromises = files.map(file => {
            return new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result);
                reader.onerror = reject;
                reader.readAsDataURL(file);
            });
        });

        try {
            const imageArray = await Promise.all(imagePromises);
            setImage(imageArray);
        } catch (error) {
            console.error("Error reading files:", error);
        }
        setInputKey(prevKey => prevKey + 1);
    };

    const handleAddressSearch = () => {
        new window.daum.Postcode({
            oncomplete: function(data) {
                setAddress(data.address);
                onClose();
            }
        }).open();
    };
    const handleSubmit = async (e) => {
        let url = propsCheck

        e.preventDefault();
        const formData = new FormData();
        // formData.append(title)
        formData.append('title', title);
        formData.append('content', content);
        if (file) {
            file.forEach((files)=>{
                formData.append('file', files);
            })

        }
        formData.append('festival_code', category);
        if(!propsCheck){
            formData.append('price', price);
            formData.append('address', address+detailAddress);
        }
        try{
            const [response] = await Promise.all([
                axios.post(`${process.env.REACT_APP_BOARD_URL}${page}`,
                    formData,
                    {
                            headers:
                                {
                                    Authorization: token,
                                    'Content-Type': 'multipart/form-data',
                                },
                                withCredentials: true,
                            }
                )
            ]);
            const responseData = response.data;
            if(responseData === 1 ){
                alert("게시글 등록이 완료되었습니다.")
                navigate("/board")
            }
            // console.log(responseData)
        } catch (error){
            console.error('Error fetching data:', error);
        }

    };

    return (
        <>
        <HeaderImg/>
        <Box maxWidth="800px" margin="auto" p={5}>

            <form onSubmit={handleSubmit}>
                <VStack spacing={4} align="stretch">
                    <FormControl isRequired>
                        <FormLabel>제목</FormLabel>
                        <Input
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="제목을 입력하세요"
                        />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel>내용</FormLabel>
                        <Textarea
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            placeholder="내용을 입력하세요"
                            minHeight="200px"
                        />
                    </FormControl>

                    <FormControl>
                        <FormLabel>축제</FormLabel>
                        <Select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value="" disabled selected>축제 선택</option>
                            {festivalList && festivalList.map((festival, index) => (
                                <option value={festival.festivalid}>{festival.festivalname}</option>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormLabel>이미지 첨부</FormLabel>
                        <Input
                            key={inputKey}
                            type="file"
                            accept="image/*"
                            onChange={handleImageUpload}
                            multiple
                            display="none"
                            id="image-upload"
                        />
                        <label htmlFor="image-upload">
                            <Button as="span" leftIcon={<AttachmentIcon />}>
                                이미지 선택
                            </Button>
                        </label>
                        <SimpleGrid justifyItems='start' columns={{ base: 1, md: 2, lg: 6 }}>
                        {image &&
                            // {image}

                            image.map((ima, index)=>(
                                <Box mt={2} position="relative">
                                 <Image src={ima} alt="Uploaded" h='10vh' w='20vh' objectFit='cover' objectPosition="50% 20%" />
                                 <IconButton
                                     icon={<CloseIcon />}
                                     position="absolute"
                                     top="0"
                                     right="0"
                                     onClick={() => {const newImage = [...image];
                                         newImage.splice(index, 1);
                                         setImage(newImage);
                                        const newFile = [...file];
                                        newFile.splice(index, 1);
                                        setFile(newFile)}}
                                     size="sm"
                                 />
                                </Box>
                            ))}
                        </SimpleGrid>
                    </FormControl>
                    {!propsCheck && (
                    <FormControl>
                        <FormLabel>가격</FormLabel>
                        <InputGroup>
                            <InputLeftAddon children="₩" />
                            <Input
                                type="number"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                                placeholder="가격을 입력하세요"
                            />
                        </InputGroup>

                    </FormControl>
                    )}
                    {!propsCheck && (
                    <FormControl>
                        <FormLabel>위치</FormLabel>
                        <InputGroup>
                            <Input
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                                placeholder="주소 검색"
                            />
                            <Button onClick={handleAddressSearch}>검색</Button>
                        </InputGroup>
                        <Input
                            mt={2}
                            value={detailAddress}
                            onChange={(e) => setDetailAddress(e.target.value)}
                            placeholder="상세 주소"
                        />
                        <Button mt={2} onClick={onOpen}>지도에서 선택</Button>
                    </FormControl>
                    )}
                    <Button type="submit" colorScheme="blue">
                        글 작성
                    </Button>

                </VStack>
            </form>
            <Modal isOpen={isOpen} onClose={onClose} size="xl" >
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>주소 선택</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Map center={position} style={{ width: "100%", height: "360px" }} onClick={handleClick}>
                            <MapMarker position={position}>
                                <div style={{color:"#000"}}>{address || "위치를 클릭하세요"}</div>
                            </MapMarker>
                        </Map>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={onClose}>
                            선택 완료
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
        </>
    );
}

export default WriteComponent;