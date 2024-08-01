package com.example.finalproject.service.board;

import com.example.finalproject.domain.board.BoardMain;
import java.util.List;
import java.util.Map;

public interface BoardService {
    Map<String, Object> boardmain (String token, String page);

}
