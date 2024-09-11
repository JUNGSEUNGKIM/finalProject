import React, {useEffect, useRef} from "react";
import {Box} from "@chakra-ui/react";

const MapComponent = ({ festivals, selectedFestival }) => {
    const mapRef = useRef(null);
    const mapInstance = useRef(null);
    const markers = useRef([]);
    const location = useRef({latitude:37.1022885,longitude:127.0222002})
    const customOverlay = useRef(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition( (position) => {
            location.current = position.coords;
            // console.log(":::"+location.current.latitude, location.current.longitude)

        });

        setTimeout(()=>{

            const mapOption = {
                center: new window.kakao.maps.LatLng(location.current.latitude, location.current.longitude),
                level: 3
            };
            mapInstance.current = new window.kakao.maps.Map(mapRef.current, mapOption);
            /*
                줌 표시하기
            */
            const zoomControl = new window.kakao.maps.ZoomControl();
            mapInstance.current.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

            // 모든 축제 위치에 마커 추가
            // festivals.forEach(festival => {
            //     const marker = new window.kakao.maps.Marker({
            //         position: new window.kakao.maps.LatLng(festival.lat, festival.lng)
            //     });
            //     marker.setMap(mapInstance.current);
            //     markers.current.push(marker);
            // });
            /*
               마커에 축제 내역 표시
             */
            const infowindow = new window.kakao.maps.InfoWindow({zIndex:1});

            festivals.forEach(festival => {
                const marker = new window.kakao.maps.Marker({
                    position: new window.kakao.maps.LatLng(festival.lat, festival.lng)
                });
                marker.setMap(mapInstance.current);
                markers.current.push(marker);

                window.kakao.maps.event.addListener(marker, 'click', function() {
                    const content = `
                <div style="padding:5px;width:200px;">
                    <h3>${festival.name}</h3>
                    <p>${festival.address}</p>
                    <p>기간: ${festival.distance} - ${festival.lat}</p>
                </div>
            `;
                    infowindow.setContent(content);
                    infowindow.open(mapInstance.current, marker);
                });
            });

            window.kakao.maps.event.addListener(mapInstance.current, 'click', function() {
                infowindow.close();
            });
            /*
                센터가 바뀔때마다 상태를 업데이트함
             */
            window.kakao.maps.event.addListener(mapInstance.current, 'dragend', function() {
                const center = mapInstance.current.getCenter();
                console.log("New center: ", center.getLat(), center.getLng());
            });


        },1000)
    }, [festivals]);

    useEffect(() => {
        if (selectedFestival && mapInstance.current) {
            const moveLatLon = new window.kakao.maps.LatLng(selectedFestival.lat, selectedFestival.lng);
            mapInstance.current.setCenter(moveLatLon);

            if (customOverlay.current) {
                customOverlay.current.setMap(null);
            }
            const markerSize = new window.kakao.maps.Size(45, 63);  // 원하는 크기 설정 (64x64)

            const markerImage = new window.kakao.maps.MarkerImage(
                "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/markerStar.png",  // 기본 마커 이미지
                markerSize
            );

            customOverlay.current = new window.kakao.maps.Marker({
                position: moveLatLon,
                image: markerImage  // 크기 조정된 마커 이미지 사용
            });

            customOverlay.current.setMap(mapInstance.current);

            // 새 커스텀 오버레이 생성
            // const content = '<div style="padding:5px;background:#fff;border-radius:50%;border:2px solid #f00;">' +
            //     '<img src="/img/background.jpg" style="width:30px;height:30px;" alt="point">' +
            //     '</div>';
            //
            // customOverlay.current = new window.kakao.maps.CustomOverlay({
            //     position: moveLatLon,
            //     content: content
            // });
            //
            // customOverlay.current.setMap(mapInstance.current);

            function getApproximateDistance(level) {
                const distances = {
                    1: '20m', 2: '30m', 3: '50m', 4: '75m', 5: '100m',
                    6: '150m', 7: '250m', 8: '350m', 9: '500m', 10: '750m',
                    11: '1km', 12: '1.5km', 13: '2km', 14: '4km'
                };
                return distances[level] || 'Unknown';
            }

// 사용 예:
            const currentLevel = mapInstance.current.getLevel();
            console.log(`Current view distance: ${getApproximateDistance(currentLevel)}`);
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

export default MapComponent;