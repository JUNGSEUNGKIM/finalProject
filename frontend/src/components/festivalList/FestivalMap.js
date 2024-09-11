import { Box, Flex, Heading, HStack, Stack, Text } from "@chakra-ui/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useEffect, useRef, useState } from "react";
import ListComponent from "./ListComponent";
import MapComponent from "./MapComponent";
import axios from "axios";

gsap.registerPlugin(ScrollTrigger);



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
    const location = useRef({latitude:"",longitude:""})
    const fetchData = async (location) => {
        // if(isLargeScreen){
        //     window.scrollTo({
        //         top:0 ,
        //         behavior: 'smooth' // 부드러운 스크롤
        //     });
        console.log(location.current)
        // }
        try {
            // console.log(page)
            const [response] = await Promise.all([
                axios.get( `${process.env.REACT_APP_FESTIVAL_URL}/festivalapi?lat=${location.current.latitude}&lon=${location.current.longitude}`,
                    { withCredentials: true })
            ]);
            const responseData = response.data;

            console.log(responseData)
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };
    useEffect(() => {
        navigator.geolocation.getCurrentPosition((position) => {
            location.current = position.coords;
            fetchData(location)
        },(error) => {
            console.error("Geolocation error:", error.code, error.message);
            // 오류 처리 로직
            location.current.latitude=37.1022885;
            location.current.longitude=127.0222002;
            fetchData(location)
        });



    },[])
    return (
        <div id="main-video">
            <Box
                height="100vh"
                overflow="hidden"
                width='100%'>
                <Box
                    overflow="hidden"
                    w='100%'
                    h='100%'

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
