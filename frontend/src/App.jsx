import * as React from 'react'

import {Box, extendBaseTheme, theme as chakraTheme,} from '@chakra-ui/react'
import Header from "./components/header/Header";

import VideoBackground from "./components/video/VideoBackground";
import PostCard from "./components/board/PostCard";
import BoardMain from "./components/board/BoardMain";
import store from "./redux/store";
import Test from "./components/test";
import Login from "./view/user/login";
import {Provider} from "react-redux";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const { Button } = chakraTheme.components

const theme = extendBaseTheme({
    components: {
        Button,
    },
})

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




        <Provider store={store}>
            <Header></Header>

                <Routes>
                    <Route path="/" element={<Login></Login>}/>
            {/*        /!*<Route path="/" element={<Test></Test>}/>*!/*/}
                    <Route path="board" element={<BoardMain posts={samplePosts} />}/>

                </Routes>
            <Test/>
            {/*</Router>*/}
            {/*<VideoBackground></VideoBackground>*/}
            {/*<Box h='50vh'></Box>*/}


        </Provider>


    </div>
    )
}


export default App;