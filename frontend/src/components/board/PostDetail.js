import React, {useEffect, useRef, useState} from 'react';
import {Box, VStack, Heading, Text, Button, Input, Textarea, HStack, Divider, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, IconButton, Image, Center,
} from '@chakra-ui/react';
import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import {useSelector} from "react-redux";
import {gsap} from "gsap";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";
import SwiperComponent from "../slider/ImageSlider";
import timeView from "../../hooks/timeView";

const PostDetail = ({page}) => {
    const navigate = useNavigate();
    const [post, setPost] = useState();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState();
    const [editingComment, setEditingComment] = useState(null);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const overlayRef = useRef(null);
    const [title, setTitle] = useState();
    const [content, setContent] = useState();

    const token = useSelector((state) => state.auth.token);
    const nickName = useSelector((state) => state.auth.nickName);
    const {boarder_code} = useParams();
    const unmountCheckRef = useRef(true);


    useEffect(() => {
        const overlay = overlayRef.current;


        gsap.to(overlay, {
            backgroundColor: 'rgba(255,255,255,1)',
            scrollTrigger: {
                trigger: overlay,
                start: 'top top',
                end: 'bottom top',
                scrub: true,
            },
        });
        return () =>{
            // console.log(unmountCheckRef.current)
            if(unmountCheckRef.current){fetchData(boarder_code)}
            unmountCheckRef.current = false;
        }
    }, []);

    const fetchData = async (boarder_code) => {
        try {
            const [response] = await Promise.all([
                axios.get( `${process.env.REACT_APP_BOARD_URL}${page}detail/${boarder_code}`,{headers: {
                        Authorization: token
                    }}, { withCredentials: true})
            ]);
            const responseData = response.data;
            // console.log(responseData.board.id)
            setPost(responseData.board)
            setComments(responseData.comments)
            console.log(responseData.board)

        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }

    const handleEdit = async (editedPost) => {
        setPost(editedPost);
        onClose();
        const formData = new FormData();
        // formData.append(title)
        formData.append('title', title);
        formData.append('content', content);
        formData.append("boarder_code", boarder_code)

        try{
            const [response] = await Promise.all([
                axios.post(`${process.env.REACT_APP_BOARD_URL}${page}edit`,
                    formData,
                    {headers: {Authorization: token}, withCredentials: true,})]);
            const responseData = response.data;
            if(responseData){
                alert("게시글 수정이 완료되었습니다.")
            }
            // console.log(responseData)
        } catch (error){
            console.error('Error fetching data:', error);
        }
    };



    const handleAddComment = async (comment_id) => {
        if (newComment.trim()) {
            setComments([...comments, { create_at: Date.now(), content: newComment, replies: [], id: "true", user_id: nickName }]);

            // setPost(editedPost);
            onClose();
            const formData = new FormData();
            formData.append('content', newComment);
            formData.append("boarder_code", post.boarder_code)
            if(comment_id){
                formData.append('comment_id', comment_id)
            }
            setNewComment("");
            try{
                const [response] = await Promise.all([
                    axios.post(`${process.env.REACT_APP_BOARD_URL}${page}AddComment`,
                        formData,
                        {headers: {Authorization: token}, withCredentials: true,})]);
                const responseData = response.data;
                if(responseData){
                    alert("댓글 작성이 완료되었습니다.")
                    fetchData(boarder_code)
                }
                // console.log(responseData)
            } catch (error){
                console.error('Error fetching data:', error);
            }

        }
    };

    const handleEditComment = async (id, newContent, children_id) => {
        setComments(comments.map(comment => {
            if (comment.comment_id === id) {
                if (children_id) {
                    const updatedChildren = comment.children.map(comm =>
                        comm.comment_id === children_id ? { ...comm, content: newContent } : comm
                    );
                    return { ...comment, children: updatedChildren };
                } else {
                    return { ...comment, content: newContent };
                }
            }
            return comment;
        }));

        const formData = new FormData();
        formData.append('content', newContent);
        if(children_id){formData.append('comment_id', children_id)}
        else{formData.append('comment_id', id)}
        setNewComment("");
        try{
            const [response] = await Promise.all([
                axios.post(`${process.env.REACT_APP_BOARD_URL}${page}EditComment`,
                    formData,
                    {headers: {Authorization: token}, withCredentials: true,})]);
            const responseData = response.data;
            if(responseData){
                alert("댓글 수정이 완료되었습니다.")
                // fetchData(boarder_code)
            }
            // console.log(responseData)
        } catch (error){
            console.error('Error fetching data:', error);
        }

        setEditingComment(null);
    };

    const handleDelete = async (boarder_code) => {
            if (window.confirm("이 게시글을 삭제하시겠습니까?\n모든 댓글도 함께 삭제됩니다.")) {

                // if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
                try {
                    const [response] = await Promise.all([
                        axios.get( `${process.env.REACT_APP_BOARD_URL}${page}Delete/${boarder_code}`,{headers: {
                                Authorization: token
                            }}, { withCredentials: true })
                    ]);

                    const responseData = response.data;
                    // console.log(responseData)
                    if(responseData){
                        alert("게시글 삭제됨.")
                        navigate("/board")
                    }

                } catch (error) {
                    console.error('Error fetching data:', error);
                }
        }


    };
    const handleDeleteComment = async (comment_id) => {
        if (window.confirm("이 댓글을 삭제하시겠습니까?")) {
            // if (window.confirm("정말로 이 게시글을 삭제하시겠습니까?")) {
            try {
                const [response] = await Promise.all([
                    axios.get( `${process.env.REACT_APP_BOARD_URL}${page}DeleteComment/${comment_id}`,{headers: {
                            Authorization: token
                        }}, { withCredentials: true })
                ]);
                const responseData = response.data;
                if(responseData){
                    alert("게시글 삭제됨.")
                    fetchData(boarder_code)
                }

            } catch (error) {
                console.error('Error fetching data:', error);
            }
            // console.log("게시글 삭제됨");
            // }
            setComments(comments.filter(comment => comment.comment_id !== comment_id));
        }
    };



    const handleAddReply = (commentId, reply) => {
        setComments(comments.map(comment =>
            comment.id === commentId
                ? { ...comment, replies: [...comment.replies, { id: Date.now(), content: reply }] }
                : comment
        ));
    };

    return (
        <>

        <VStack spacing={0} align="stretch" w='100%'>

                <Box w="100%" h={{ base: "200px", md: "400px" }} position="relative" overflow="hidden"
                >
                <Image
                    src="/img/header_img_2.png"
                    alt="Background"
                    objectFit="cover"
                    objectPosition="50% 20%"
                    w="100%"
                    h="100%"
                />
                <Box
                    ref={overlayRef}
                    position="absolute"
                    top="0"
                    left="0"
                    w="100%"
                    h="100%"
                    bg="rgba(0,0,0,0)"  // 초기 투명 상태

                >
                    <Center h="100%">
                        <Text fontSize={{ base: "2xl", md: "4xl" }} color="white" fontWeight="bold">

                        </Text>
                    </Center>
                </Box>
            </Box>
            {post && comments && (
                <Box    w='100%' justifyContent='center' p={{base:1, md:3, lg:5}} maxWidth='container.xl' margin='0 auto' >
                    <Box w={{base:'90%', md:'80%'}} margin='0 auto' >
                     <VStack align="stretch" spacing={5} mt='10%'>
                        <Heading textAlign='center'>{post.title}</Heading>
                         {page==='/board' ? (
                         <><VStack alignItems='right'>
                          <Text textAlign='right' mb='0'>작성자: {post.user_id} <Text as='span' fontSize='sm'>({timeView(post.created_at)})</Text> </Text>
                          <Text textAlign='right' mt='0'>조회수: {post.views} | 좋아요: {post.likes}</Text>
                        </VStack></>
                         ) : (<>
                             <VStack alignItems='center' justifyContent='flex-end' display='flex' flexDirection='row'>
                                 <Text as='span' textAlign='right' mt='0'>위치 : {post.location} </Text>
                                 <Text textAlign='right' mb='0'>가격 : {post.tourprice} <Text as='span' fontSize='sm'>원</Text> </Text>


                             </VStack>
                             <Button backgroundColor='blue' textColor='white' mx='auto 0' w='30vh' alignSelf='flex-end'>결제하기</Button>
                         </>)}
                         <VStack>
                        <SwiperComponent images={post.image_name} />
                         </VStack>
                         <VStack>
                        <Text minH='30vh' w={{base:'100%',md:'80%'}} m='0 auto' style={{ whiteSpace: 'pre-wrap' }}>{post.content}</Text>
                         </VStack>
                        <Divider />

                        <VStack align="stretch" spacing={3}>
                            <Heading size="md">댓글</Heading>
                                <HStack>
                                    <Input value={newComment} onChange={(e) => {setNewComment(e.target.value)}} placeholder="댓글을 입력하세요"/>
                                    <Button onClick={()=>{handleAddComment(null)}}>댓글 작성</Button>
                                 </HStack>
                    {comments && comments.map((comment,index) => (
                        <Box key={comment.comment_id} borderWidth={1} p={3} borderRadius="md">
                            {editingComment === comment.comment_id ? (
                                <HStack>
                                    <Input
                                        defaultValue={comment.content}
                                        onBlur={(e) => handleEditComment(comment.comment_id, e.target.value)}
                                    />
                                    <Button onClick={() => setEditingComment(null)}>완료</Button>
                                </HStack>
                            ) : (
                                <>

                                    <Text fontSize='xs'>[작성자 : {comment.user_id}] <Text as='span' fontSize='2xs'>{timeView(comment.create_at)}</Text>&nbsp;&nbsp;  </Text>

                                    <HStack justifyContent='space-between'>
                                        <Text w='90%'>&nbsp;{comment.content}</Text>

                                        <HStack w='10%' justifyContent='flex-end'>
                                        {comment.id==="true" && (<>
                                        <IconButton icon={<EditIcon />} size="sm" onClick={() => setEditingComment(comment.comment_id)}/>
                                        <IconButton icon={<DeleteIcon />} size="sm" onClick={() => handleDeleteComment(comment.comment_id)}/>
                                        </>)}
                                        </HStack>
                                    </HStack>
                                </>
                            )}
                            <VStack align="stretch" mt={2} ml={5}>
                                {comment.children && comment.children.map((reply) => (
                                    <HStack justifyContent='space-between'>
                                        {editingComment === reply.comment_id ? (
                                            <HStack>
                                                <Input
                                                    defaultValue={reply.content}
                                                    onBlur={(e) => handleEditComment(comment.comment_id, e.target.value, reply.comment_id)}
                                                />
                                                <Button onClick={() => setEditingComment(null)}>완료</Button>
                                            </HStack>
                                        ) : (
                                        <>
                                        <Text  fontSize="xs">ㄴ[{reply.user_id} <Text as='span' fontSize='3xs'>{timeView(reply.create_at)}</Text>] {reply.content}</Text>
                                        <HStack w='10vh' justifyContent='right'>
                                            {reply.id==="true" && (<>
                                                <IconButton icon={<EditIcon />} size="xs" onClick={() => setEditingComment(reply.comment_id)}/>
                                                <IconButton icon={<DeleteIcon />} size="xs" onClick={() => handleDeleteComment(reply.comment_id)}/>
                                            </>)}
                                        </HStack>
                                        </>
                                        )}
                                    </HStack>
                                ))}

                                <HStack>

                                    <Input placeholder="답글 작성" size="sm" value={newComment} onChange={(e) => setNewComment(e.target.value)} />
                                    <Button size="sm" onClick={() => handleAddComment(comment.comment_id)}>답글</Button>

                                </HStack>
                            </VStack>
                        </Box>

                    ))}
                    {post.id==="true" && (
                    <HStack justifyContent='right' mt='10vh'>
                        <Button leftIcon={<EditIcon />} onClick={onOpen}>수정</Button>
                        <Button leftIcon={<DeleteIcon />} colorScheme="red" onClick={()=>{handleDelete(boarder_code)}}>삭제</Button>
                    </HStack>
                    )}
                </VStack>
            </VStack>

            <Modal isOpen={isOpen} onClose={onClose} w='70%'>
                <ModalOverlay />
                <ModalContent >
                    <ModalHeader>게시글 수정</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody >
                        <VStack spacing={3} w='100%' h ='60vh'>
                            <Input defaultValue={post.title} placeholder="제목" w='100%'  onChange={(e) => setTitle(e.target.value)}/>
                            <Textarea defaultValue={post.content} placeholder="내용" w='100%' h='100%'  onChange={(e) => setContent(e.target.value)}/>
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={() => handleEdit({...post, title: title, content: content})}>
                            수정 완료
                        </Button>
                        <Button variant="ghost" onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>

        </Box>
        </Box>
            )}
        </VStack>
        </>
    );
    function timeAgo(dateString) {
        const now = new Date();
        const past = new Date(dateString);
        const diffInSeconds = Math.floor((now - past) / 1000);

        if (diffInSeconds < 60) {
            return '방금 전';
        } else if (diffInSeconds < 3600) {
            const minutes = Math.floor(diffInSeconds / 60);
            return `${minutes}분 전`;
        } else if (diffInSeconds < 86400) {
            const hours = Math.floor(diffInSeconds / 3600);
            return `${hours}시간 전`;
        } else {
            const days = Math.floor(diffInSeconds / 86400);
            return `${days}일 전`;
        }
    }
};

export default PostDetail;

/*
useState와 useRef는 React에서 사용되는 훅들이지만, 각각 다른 목적과 특성을 가지고 있습니다. 주요 차이점은 다음과 같습니다:

상태 관리와 렌더링:

useState: 컴포넌트의 상태를 관리하며, 상태가 변경되면 컴포넌트를 다시 렌더링합니다.
useRef: 렌더링을 트리거하지 않고 값을 저장합니다. 값이 변경되어도 컴포넌트가 다시 렌더링되지 않습니다.


업데이트 시기:

useState: 상태 업데이트는 비동기적이며, 다음 렌더링 사이클에서 반영됩니다.
useRef: 값 변경이 즉시 반영됩니다.


사용 목적:

useState: 주로 UI에 반영되어야 하는 데이터를 관리할 때 사용합니다.
useRef: DOM 요소에 접근하거나, 렌더링과 관계없이 값을 저장할 때 사용합니다.


반환 값:

useState: 현재 상태 값과 그 값을 업데이트하는 함수를 반환합니다.
useRef: 항상 동일한 객체를 반환하며, 이 객체는 'current' 프로퍼티를 통해 값에 접근합니다.


리렌더링 동작:

useState: 값이 변경되면 컴포넌트를 리렌더링합니다.
useRef: 값이 변경되어도 리렌더링을 트리거하지 않습니다.
 */

