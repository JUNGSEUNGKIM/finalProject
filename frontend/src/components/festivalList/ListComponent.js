
import React, {useEffect, useState} from 'react';
import {
    Box,
    Flex,
    VStack,
    Text,
    Image,
    Icon,
    Grid,
    CloseButton,
    SimpleGrid,
    HStack,
    Spinner,
    Center
} from '@chakra-ui/react';
import {Select,GridItem} from "@chakra-ui/react";
import { FaSun, FaCloud, FaUmbrella, FaSnowflake, FaWind, FaLeaf, FaThermometerHalf, FaTint } from "react-icons/fa";
import { FaToilet, FaBabyCarriage, FaHandsHelping } from 'react-icons/fa';
import { ReactComponent as Logo } from '../../assets/css/logo.svg';
import  {useNavigate, useLocation} from "react-router-dom";
const ListComponent = ({ festivals, onFestivalSelect }) => {
    const [selectedFestival, setSelectedFestival] = useState(null);
    const navigate = useNavigate();

    const handleFestivalClick = (festival) => {
        setSelectedFestival(festival);
        onFestivalSelect(festival);
    };

    const handleClose = () => {
        setSelectedFestival(null);
        onFestivalSelect(null);
    };

    const [address, setAddress] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            // console.log(latitude,longitude)
            const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
            const data = await response.json();
            setAddress(data.display_name);
        });
    }, []);

    return (
        <Box
            position="absolute"
            top="0vh"
            bottom="0vh"
            maxHeight="calc(100%)"
            zIndex="1"
        >
            <Flex maxHeight="100vh" bg="white" boxShadow="lg" borderRadius="md" w="100%">
                <Box
                    maxWidth="50vh"
                    minWidth="400px"
                    p={4}
                    overflowY="auto"
                    transition="width 0.3s ease-in-out"
                >
                    <VStack>
                        <Flex w='100%' h='30vh'>
                            <Grid templateRows="auto auto auto auto " gap={4} w="100%">
                                <GridItem w="100%">
                                    <Grid templateColumns="repeat(3, 1fr)" gap={1} alignItems="center">


                                        <Box textAlign="center" justifyContent='flex-start'>
                                            <Text fontSize="xl" fontWeight="bold">
                                                {address ? (
                                                address.split(",")[address.split(",").length - 3] + " " + address.split(",")[address.split(",").length - 4])
                                                : (<Center mt={4}>
                                                        <Spinner />
                                                    </Center>)}
                                            </Text>
                                        </Box>
                                        <Box display='flex' alignItems='center' >
                                            <Box
                                                transition="transform 0.3s ease"
                                                _hover={{cursor: 'pointer', transform: 'scale(1.1)'}}
                                                onClick={() => {
                                                    navigate("/")
                                                }}
                                            >
                                                <Logo style={{width: '150px', height: '90px'}}/>
                                            </Box>
                                        </Box>

                                        <HStack justifyContent="center" >
                                            <Icon as={FaSun} boxSize="40px"/>
                                            <Text>맑음</Text>
                                        </HStack>
                                    </Grid>
                                    <hr style={{marginTop: "4%"}}/>
                                </GridItem>


                                <GridItem>
                                    <Select placeholder="선택하세요" />
                                </GridItem>

                                <GridItem>
                                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                                        <VStack>
                                            <Icon as={FaSun} boxSize="40px" />
                                            <Text>맑음</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaCloud} boxSize="40px" />
                                            <Text>흐림</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaUmbrella} boxSize="40px" />
                                            <Text>비</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaSnowflake} boxSize="40px" />
                                            <Text>눈</Text>
                                        </VStack>
                                    </Grid>
                                </GridItem>

                                <GridItem>
                                    <Grid templateColumns="repeat(4, 1fr)" gap={4}>
                                        <VStack>
                                            <Icon as={FaWind} boxSize="40px" />
                                            <Text>바람</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaLeaf} boxSize="40px" />
                                            <Text>습도</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaThermometerHalf} boxSize="40px" />
                                            <Text>온도</Text>
                                        </VStack>
                                        <VStack>
                                            <Icon as={FaTint} boxSize="40px" />
                                            <Text>강수량</Text>
                                        </VStack>
                                    </Grid>
                                </GridItem>
                            </Grid>

                        </Flex>
                    </VStack>
                    <VStack spacing={1} align="stretch" maxHeight="80vh" overflowY="auto">
                        {festivals.map(festival => (
                            <Box
                                key={festival.id}
                                bg="gray.100"
                                p={3}
                                borderRadius="md"
                                onClick={() => handleFestivalClick(festival)}
                                cursor="pointer"
                            >
                                <Text fontWeight="bold">{festival.name}</Text>
                                <Text>{festival.address}</Text>
                                <Text>{festival.distance}</Text>
                            </Box>
                        ))}
                    </VStack>
                </Box>

                {selectedFestival && (
                    <Box
                        width="80vh"
                        p={4}
                        overflowY="auto"
                        borderLeft="1px solid"
                        borderColor="gray.200"
                        position="relative"
                    >
                        <CloseButton
                            position="absolute"
                            right="8px"
                            top="8px"
                            onClick={handleClose}
                        />
                        <Image src={selectedFestival.image} mb={4} />
                        <Text fontSize="2xl" fontWeight="bold" mb={4}>{selectedFestival.name}</Text>
                        <Grid templateColumns="repeat(3, 1fr)" gap={6}>
                            <VStack>
                                <Icon as={FaToilet} w={8} h={8} />
                                <Text>화장실 유</Text>
                            </VStack>
                            <VStack>
                                <Icon as={FaBabyCarriage} w={8} h={8} />
                                <Text>수유실 유</Text>
                            </VStack>
                            <VStack>
                                <Icon as={FaHandsHelping} w={8} h={8} />
                                <Text>체험 유</Text>
                            </VStack>
                        </Grid>
                        {/* 추가 상세 정보 */}
                    </Box>
                )}
            </Flex>
        </Box>
    );
};

export default ListComponent;