
import React, {useEffect, useState} from 'react';
import {Box, Flex, VStack, Text, Image, Icon, Grid, CloseButton, SimpleGrid} from '@chakra-ui/react';
import { FaToilet, FaBabyCarriage, FaHandsHelping } from 'react-icons/fa';
const ListComponent = ({ festivals, onFestivalSelect }) => {
    const [selectedFestival, setSelectedFestival] = useState(null);

    const handleFestivalClick = (festival) => {
        setSelectedFestival(festival);
        onFestivalSelect(festival);
    };

    const handleClose = () => {
        setSelectedFestival(null);
        onFestivalSelect(null);
    };

    // function reverseGeocode(latitude, longitude) {
    //     const geocoder = new google.maps.Geocoder();
    //     const latlng = { lat: parseFloat(latitude), lng: parseFloat(longitude) };
    //
    //     geocoder.geocode({ location: latlng }, (results, status) => {
    //         if (status === "OK") {
    //             if (results[0]) {
    //                 console.log(results[0].formatted_address);
    //             } else {
    //                 console.log("No results found");
    //             }
    //         } else {
    //             console.log("Geocoder failed due to: " + status);
    //         }
    //     });
    // }
    //
    // getCurrentPosition(33.450701, 126.570667)
    const [address, setAddress] = useState('');
    useEffect(() => {
        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude, longitude } = position.coords;
            console.log(latitude,longitude)
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
            // left="1vh"
            // maxWidth="calc(100% - 40px)"
            maxHeight="calc(100%)"
            zIndex="1"
        >
            <Flex maxHeight="100vh" bg="white" boxShadow="lg" borderRadius="md">
                <Box
                    // width={selectedFestival ? "20vh" : "20vh"}
                    maxWidth="50vh"
                    minWidth="50vh"
                    p={4}
                    overflowY="auto"
                    transition="width 0.3s ease-in-out"
                >
                    <VStack>
                        <Flex w='100%' h='20vh'>
                            <Box>HELLO</Box><Box>HELLO</Box><Box>HELLO</Box><Box>HELLO</Box><Box>HELLO</Box>
                            {address}
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