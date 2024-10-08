package com.example.finalproject.service.board;

import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.domain.board.Board;
import com.example.finalproject.domain.board.BoardMain;
import com.example.finalproject.domain.board.Comment;
import com.example.finalproject.repository.mybatis.BoardMapper;
import com.example.finalproject.service.function.SaveFile;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class BoardServiceImpl implements BoardService {
    private final BoardMapper boardMapper;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public BoardServiceImpl(BoardMapper boardMapper, JwtTokenProvider jwtTokenProvider) {
        this.boardMapper = boardMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public Map<String, Object> boardmain(String token, String page) {
        String userId = jwtTokenProvider.getid(token);
//        System.out.println(token);
        int currentPage = 1;
        if (page != null) {
            currentPage = Integer.parseInt(page);
        }
        int totalPosts = boardMapper.totalPage();
        int postPerPage = 12;
        int totalPages = (int) Math.ceil((double) totalPosts / postPerPage);
        int startRow = (currentPage - 1) * postPerPage + 1;
        int endRow = currentPage * postPerPage;

        List<BoardMain> boards;
        boards = boardMapper.boardmain(startRow, endRow);
//        System.out.println(boarders);
        final int MAX_PAGE_LIMIT = 5;
        int startPage = (totalPages - currentPage) < MAX_PAGE_LIMIT ? totalPages - MAX_PAGE_LIMIT + 1 : currentPage;
        if (totalPages < MAX_PAGE_LIMIT) {
            startPage = 1;
        }
        int endPage = Math.min(startPage + MAX_PAGE_LIMIT - 1, totalPages);

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

    @Override
    public Map<String, Object> detailBoard(String id, String token) {
        String userId ="";
        if(token != null){
            userId = jwtTokenProvider.getid(token);
        };
        String board_code = "";
        if (id != null) {
            board_code = id;
        }
        Map<String, Object> data = new HashMap<>();
        List<Board> boardResult = boardMapper.detailBoard(id);
        List<Comment> commentResult = boardMapper.detailBoardComment(id);
        List<Comment> comments = new ArrayList<>();
        Map<String, Comment> commentMap = new HashMap<>();

        for (Comment row : commentResult) {
            if(userId.equals(row.getId())){
                row.setId("true");
            }else{
                row.setId("false");
            }
            List<Comment> childComment = new ArrayList<>();
            String parentId = row.getParent_comment_id(); // 부모 댓글의 id
//            System.out.println(row.getComment_id());
            row.setChildren(childComment);
            if (parentId == null) {
                commentMap.put(row.getComment_id(), row);
                comments.add(row);
            } else {

//                row.getChildren().add(row);
                commentMap.get(parentId).getChildren().add(row);
            }
        }
        if(userId.equals(boardResult.get(0).getId())){
            boardResult.get(0).setId("true");
        }else{
            boardResult.get(0).setId("false");
        }

//        System.out.println(comments);

        data.put("board", boardResult.get(0));
        data.put("comments", comments);

        return data;
    }

    @Override
    public int createBoard(MultipartFile[] file, String token, Board board) {
        String userId = jwtTokenProvider.getid(token);
        String boarder_code = boardMapper.getSequence();
        board.setBoarder_code(boarder_code);
        board.setUser_id(userId);
        Map<String, String> result = SaveFile.saveFileFunc(file);
        board.setImage_name(result.get("name"));
        board.setImage_path(result.get("path"));
        int re = boardMapper.createBoard(board);
        return re;
    }

    @Override
    public boolean editBoard(String token, Board board) {
        String userId = jwtTokenProvider.getid(token);
        boolean re = boardMapper.editBoard(board);
        return true;

    }

    @Override
    public int addComment(String token,Comment comment){
        String userId = jwtTokenProvider.getid(token);
        comment.setUser_id(userId);
        comment.setParent_comment_id("");
        if(comment.getComment_id()!=null){
            comment.setParent_comment_id(comment.getComment_id());
            comment.setComment_id("");
        }
        boolean result = boardMapper.addComment(comment);
        System.out.println(result);
        return 1;
    }

    @Override
    public boolean editComment(String token,Comment comment){
        String userId = jwtTokenProvider.getid(token);
        boolean result = boardMapper.editComment(comment);

        return result;
    }
    @Override
    public boolean deleteComment(String token, String comment_id){
        String userId = jwtTokenProvider.getid(token);
        boolean result = boardMapper.deleteComment(comment_id);

        return result;
    }

    @Override
    public boolean deleteBoard(String token, String boarder_code){
        String userId = jwtTokenProvider.getid(token);
        boolean resultComment = boardMapper.deleteBoardComment(boarder_code);
        boolean result = boardMapper.deleteBoard(boarder_code);
        return result;
    }
}
