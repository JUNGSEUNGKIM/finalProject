package com.example.finalproject.service.store;

import com.example.finalproject.domain.board.Board;
import com.example.finalproject.domain.board.Comment;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

public interface StoreService {
    Map<String, Object> storemain (String token, String page);

    Map<String,Object> detailStore(String id, String token);

    int createBoard(MultipartFile[] file, String token, Board board);

    public boolean editBoard(String token, Board board);

    int addComment(String token,Comment comment);

    boolean editComment(String token,Comment comment);

    boolean deleteComment(String token, String comment_id);

    boolean deleteBoard(String token, String boarder_code);


}
