import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import ListComponent from "./ListComponent";

gsap.registerPlugin(ScrollTrigger);

const MapComponent = ({ festivals, selectedFestival }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markers = useRef([]);

    useEffect(() => {
        const mapOption = {
            center: new window.kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        };

        mapInstance.current = new window.kakao.maps.Map(mapRef.current, mapOption);

        // 모든 축제 위치에 마커 추가
        festivals.forEach(festival => {
            const marker = new window.kakao.maps.Marker({
                position: new window.kakao.maps.LatLng(festival.lat, festival.lng)
            });
            marker.setMap(mapInstance.current);
            markers.current.push(marker);
        });
    }, [festivals]);

    useEffect(() => {
        if (selectedFestival && mapInstance.current) {
            const moveLatLon = new window.kakao.maps.LatLng(selectedFestival.lat, selectedFestival.lng);
            mapInstance.current.setCenter(moveLatLon);
        }
    }, [selectedFestival]);

    return (
        <Box position="relative" height="100%" width="100%">
            <Box
                ref={mapRef}
                position="absolute"
                top="0"
                left="0"
                right="0"
                bottom="0"
            />
        </Box>
    );
};

function FestivalMap() {
    const [festivals, setFestivals] = useState([
        { id: 1, name: '축제 1', address: '주소 1', distance: '5km', lat: 33.450701, lng: 126.570667 },
        { id: 2, name: '축제 2', address: '주소 2', distance: '7km', lat: 33.450936, lng: 126.569477 },
        { id: 3, name: '축제 3', address: '주소 3', distance: '3km', lat: 33.451393, lng: 126.570738 },
        { id: 4, name: '축제 4', address: '주소 1', distance: '5km', lat: 33.451358, lng: 126.570738 },
        { id: 5, name: '축제 5', address: '주소 1', distance: '5km', lat: 33.451493, lng: 126.570738 },
        { id: 6, name: '축제 6', address: '주소 1', distance: '5km', lat: 33.451293, lng: 126.570738 },
        { id: 7, name: '축제 7', address: '주소 1', distance: '5km', lat: 33.451363, lng: 126.570738 },
        { id: 8, name: '축제 8', address: '주소 1', distance: '5km', lat: 33.451543, lng: 126.570738 },
        { id: 9, name: '축제 9', address: '주소 1', distance: '5km', lat: 33.451723, lng: 126.570738 },
        { id: 10, name: '축제 10', address: '주소 1', distance: '5km', lat: 33.451713, lng: 126.570738 },
        { id: 11, name: '축제 11', address: '주소 1', distance: '5km', lat: 33.451703, lng: 126.570738 },
        { id: 12, name: '축제 12', address: '주소 1', distance: '5km', lat: 33.451383, lng: 126.570738 }
        ]);

    const [selectedFestival, setSelectedFestival] = useState(null);

    const handleFestivalSelect = (festival) => {
        setSelectedFestival(festival);
    };
    return (
        // <div id="main-video">
        //     <Box height="113vh" overflow="hidden" pt='17vh' background='black' width='100%'>
        //         <Box height="83vh" overflow="hidden" position="relative" maxWidth={{ base: "100%", xl: "1440px"  }} margin='0 auto'>
        //             <MapComponent />
        //             <ListComponent />
        //         </Box>
        //     </Box>
        // </div>
        <div id="main-video">
            <Box
                height="100vh"
                overflow="hidden"
                // pt='17vh' background='black'
                width='100%'>
                <Box
                    // height="83vh"  maxWidth={{base: "100%", xl: "1440px"}}
                    overflow="hidden"
                    w='100%'
                    h='100%'
                    // position="relative"

                     margin='0 auto'>
                    <MapComponent
                        festivals={festivals}
                        selectedFestival={selectedFestival}
                    />
                    <ListComponent
                        festivals={festivals}
                        onFestivalSelect={handleFestivalSelect}
                    />
                </Box>
            </Box>
        </div>
    );
}

export default FestivalMap;
