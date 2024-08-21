package com.example.finalproject.controller;

import com.example.finalproject.domain.board.Board;
import com.example.finalproject.domain.board.Comment;
import com.example.finalproject.service.board.BoardService;
import com.example.finalproject.service.store.StoreService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.SQLException;
import java.util.Map;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/board")

public class StoreController {
    private final StoreService storeService;

    @Autowired
    public StoreController(StoreService storeService) {
        this.storeService = storeService;
    }

    @GetMapping(value = {"/storemain?page", "/storemain", "storemain/", "/storemain?user_id"})
    public ResponseEntity<?> storeMain(Model model, @RequestHeader("Authorization") String token, @RequestParam(required = false, defaultValue = "1") String page) {
        Map<String, Object> board = storeService.storemain(token, page);
        return ResponseEntity.ok(board);
    }

    @GetMapping("/storedetail/{id}")
    public ResponseEntity<?> detailStore(@PathVariable String id, @RequestHeader("Authorization") String token) {
        Map<String, Object> board = storeService.detailStore(id, token);
        return ResponseEntity.ok(board);
    }
//
//    @PostMapping("/boardcreate")
//    public ResponseEntity<?> createBoard(@RequestParam("file") MultipartFile[] file, @RequestHeader("Authorization") String token, @Valid @ModelAttribute Board board) throws IOException, SQLException {
//        int result = boardService.createBoard(file, token, board);
//        return ResponseEntity.ok(result);
//    }
//
//    @PostMapping("/boardedit")
//    public ResponseEntity<?> editBoard(@RequestHeader("Authorization") String token, @Valid @ModelAttribute Board board) throws IOException, SQLException {
//        boolean result = boardService.editBoard(token, board);
//        return ResponseEntity.ok(result);
//    }
//    @GetMapping("/boardDelete/{boarder_code}")
//    public ResponseEntity<?> deleteBoard(@PathVariable String boarder_code, @RequestHeader("Authorization") String token) {
//        boolean result = boardService.deleteBoard(token, boarder_code);
//        return ResponseEntity.ok(result);
//    }
//
//    @PostMapping("/boardAddComment")
//    public ResponseEntity<?> addComment(@RequestHeader("Authorization") String token, @Valid @ModelAttribute Comment comment) throws IOException, SQLException {
//        int result = boardService.addComment(token, comment);
//        return ResponseEntity.ok(result);
//
//    }
//
//    @PostMapping("/boardEditComment")
//    public ResponseEntity<?> editComment(@RequestHeader("Authorization") String token, @Valid @ModelAttribute Comment comment) throws IOException, SQLException {
//        boolean result = boardService.editComment(token, comment);
//        return ResponseEntity.ok(result);
//
//    }
//    @GetMapping("/boardDeleteComment/{comment_id}")
//    public ResponseEntity<?> deleteComment(@PathVariable String comment_id, @RequestHeader("Authorization") String token) {
//        boolean result = boardService.deleteComment(token, comment_id);
//        return ResponseEntity.ok(result);
//    }
}