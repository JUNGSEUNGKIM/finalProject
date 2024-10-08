package com.example.finalproject.repository.mybatis;

import com.example.finalproject.domain.board.Board;
import com.example.finalproject.domain.board.BoardMain;
import com.example.finalproject.domain.board.Comment;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    public List<BoardMain> boardmain(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow);
    public int totalPage();

    public List<Board> detailBoard(String id);

    public List<Comment> detailBoardComment(String id);

    String getSequence();

    int createBoard(Board boarder);

    boolean editBoard(Board board);

    boolean addComment(Comment comment);

    boolean editComment(Comment comment);

    boolean deleteComment(String comment_id);

    boolean deleteBoardComment(String id);
    boolean deleteBoard(String id);
}
