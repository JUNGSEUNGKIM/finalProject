import * as React from 'react'

import ScrollToTop from "./components/scroll/scrollToTop";
import Header from "./components/header/Header";
import VideoBackground from "./components/video/VideoBackground";
import BoardMain from "./view/board/BoardMain";
import Login from "./view/user/login";
import store from "./redux/store";

import {Provider} from "react-redux";
import {Route, Routes, useLocation} from 'react-router-dom';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeartCircleCheck, faClipboard, faLocationDot,faStar,faStore,faHouse} from '@fortawesome/free-solid-svg-icons';
import Footer from "./components/footer/Footer";
import PostDetail from "./components/board/PostDetail";
import PostWrite from "./components/board/PostWrite";

import VideoBackgroundTest from "./components/festivalList/FestivalMap";
import {useRef, useState} from "react";
library.add(faHeartCircleCheck,faClipboard,faLocationDot,faStar,faStore,faHouse );


function App() {
    const location = useLocation();

    return (

        <div className="App">
            <ScrollToTop/>
            <Provider store={store}>
                {location.pathname !== '/location' && <Header/>}
                <Routes>
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path="/" element={<VideoBackground/>}/>
                    <Route path="/board" element={<BoardMain page="/board"/>}/>
                    <Route path="/boarddetail/:boarder_code" element={<PostDetail page="/board"/>}/>
                    <Route path="/boardWrite" element={<PostWrite page="/boardcreate"/>}/>
                    <Route path="/store" element={<BoardMain page="/store"/>}/>
                    <Route path="/storedetail/:boarder_code" element={<PostDetail page="/store"/>}/>
                    <Route path="/storeWrite" element={<PostWrite page="/storecreate"/>}/>
                    <Route path="/location" element={<VideoBackgroundTest/>}/>
                </Routes>
                {location.pathname !== '/location' && <Footer/>}
            </Provider>
        </div>
    )
}

export default App;