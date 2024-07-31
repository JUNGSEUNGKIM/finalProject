import * as React from 'react'


import ScrollToTop from "./components/scroll/scrollToTop";
import Header from "./components/header/Header";
import VideoBackground from "./components/video/VideoBackground";
import BoardMain from "./view/board/BoardMain";
import Test from "./components/test";
import Login from "./view/user/login";
import store from "./redux/store";

import {Provider} from "react-redux";
import { Route, Routes } from 'react-router-dom';


import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeartCircleCheck, faClipboard, faLocationDot,faStar,faStore,faHouse} from '@fortawesome/free-solid-svg-icons';
import Footer from "./components/footer/Footer";
library.add(faHeartCircleCheck,faClipboard,faLocationDot,faStar,faStore,faHouse );


function App() {
    const samplePosts = Array.from({ length: 50 }, (_, index) => ({
        title: `Sample Post ${index + 1}`,
        author: 'Author Name',
        date: `Date ${index + 1}`,
        content: 'This is a sample post content. It should be brief and interesting to capture the reader\'s attention This is a sample post content. It should be brief and interesting to capture the reader\'s attention.',
        imageUrl: '/img/image01.jpg'
    }));
    return (

    <div className="App">
        <ScrollToTop/>
        <Provider store={store}>
            <Header/>
                <Routes>
                    <Route path="/login" element={<Login></Login>}/>
                    <Route path="/" element={<VideoBackground />}/>
                    <Route path="/board" element={<BoardMain posts={samplePosts} />}/>
                </Routes>
            <Test/>
            <Footer/>
        </Provider>
    </div>
    )
}
export default App;