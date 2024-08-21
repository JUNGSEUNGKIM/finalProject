import React, { useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Image from '@tiptap/extension-image';
import {
    Box,
    Button,
    ButtonGroup,
    VStack,
    HStack,
    Input,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { ChakraProvider } from '@chakra-ui/react';

const MenuBar = ({ editor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [imageUrl, setImageUrl] = useState('');
    const [imageWidth, setImageWidth] = useState('100%');

    const addImage = () => {
        if (imageUrl) {
            editor.chain().focus().setImage({ src: imageUrl, width: imageWidth }).run();
            onClose();
            setImageUrl('');
            setImageWidth('100%');
        }
    };

    if (!editor) {
        return null;
    }

    return (
        <ButtonGroup spacing={2} mb={4}>
            <Button
                onClick={() => editor.chain().focus().toggleBold().run()}
                colorScheme={editor.isActive('bold') ? 'blue' : 'gray'}
            >
                Bold
            </Button>
            <Button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                colorScheme={editor.isActive('italic') ? 'blue' : 'gray'}
            >
                Italic
            </Button>
            <Button onClick={onOpen} colorScheme="green">
                이미지 추가
            </Button>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>이미지 추가</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <VStack spacing={4}>
                            <Input
                                placeholder="이미지 URL을 입력하세요"
                                value={imageUrl}
                                onChange={(e) => setImageUrl(e.target.value)}
                            />
                            <Input
                                placeholder="이미지 너비 (예: 100%, 300px)"
                                value={imageWidth}
                                onChange={(e) => setImageWidth(e.target.value)}
                            />
                        </VStack>
                    </ModalBody>
                    <ModalFooter>
                        <Button colorScheme="blue" mr={3} onClick={addImage}>
                            추가
                        </Button>
                        <Button variant="ghost" onClick={onClose}>취소</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </ButtonGroup>
    );
};

const TextEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image.configure({
                inline: true,
                allowBase64: true,
            }),
        ],
        content: '<p>Hello World! 여기에 텍스트를 입력하세요.</p>',
    });

    return (
        <ChakraProvider>
            <Box maxWidth="800px" margin="auto" padding={4}>
                <MenuBar editor={editor} />
                <Box borderWidth={1} borderRadius="lg" padding={4}>
                    <EditorContent editor={editor} />
                </Box>
            </Box>
        </ChakraProvider>
    );
};

export default TextEditor;