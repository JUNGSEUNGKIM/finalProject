package com.example.finalproject.controller;

import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.domain.board.BoardMain;
import com.example.finalproject.service.board.BoardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/board")

public class BoardController {
    private final BoardService boardService;
    @Autowired
    public BoardController(BoardService boardService){this.boardService = boardService;}
    @GetMapping(value={"/boardmain?page","/boardmain","boardmain/","/boardmain?user_id"})
    public ResponseEntity<?> boardMain(Model model, @RequestHeader("Authorization") String token, @RequestParam(required = false, defaultValue ="1") String page){
        Map<String, Object> board = boardService.boardmain(token, page);
        return ResponseEntity.ok(board);
    }

}
