package com.example.finalproject.service.board;

import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.domain.board.BoardMain;
import com.example.finalproject.repository.mybatis.BoardMapper;
import com.example.finalproject.repository.mybatis.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements BoardService {
    private final BoardMapper boardMapper;
    private final JwtTokenProvider jwtTokenProvider;

   @Autowired
    public BoardServiceImpl(BoardMapper boardMapper, JwtTokenProvider jwtTokenProvider){
        this.boardMapper = boardMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Map<String, Object> boardmain(String token, String page){
        String userId = jwtTokenProvider.getid(token);
        System.out.println(token);
        int currentPage = 1;
        if(page != null) {
            currentPage= Integer.parseInt(page);
        }
        int totalPosts = boardMapper.totalPage();
        int postPerPage = 12;
        int totalPages=  (int)Math.ceil((double)totalPosts/postPerPage);
        int startRow = (currentPage -1) * postPerPage +1;
        int endRow = currentPage  * postPerPage;

        List<BoardMain> boards;
        boards = boardMapper.boardmain(startRow, endRow);
//        System.out.println(boarders);
        final int MAX_PAGE_LIMIT = 5;
        int startPage = (totalPages - currentPage) < MAX_PAGE_LIMIT ? totalPages - MAX_PAGE_LIMIT + 1 : currentPage;
        if(totalPages<MAX_PAGE_LIMIT){startPage=1;}
        int endPage = Math.min(startPage + MAX_PAGE_LIMIT -1, totalPages);

        Map<String, Object> data = new HashMap<>();
        data.put("board", boards); // 배열 형태의 데이터 추가
        data.put("currentPage", currentPage);
        data.put("endPage", endPage);
        data.put("maxPageNumber", MAX_PAGE_LIMIT);
        data.put("startPage", startPage);
        data.put("totalPage", totalPages);
        data.put("userId", userId);

       return data;
    }
}
