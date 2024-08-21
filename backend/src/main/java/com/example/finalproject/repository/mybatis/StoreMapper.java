package com.example.finalproject.repository.mybatis;

import com.example.finalproject.domain.board.Board;
import com.example.finalproject.domain.board.BoardMain;
import com.example.finalproject.domain.board.Comment;
import com.example.finalproject.domain.store.StoreComment;
import com.example.finalproject.domain.store.StoreMain;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface StoreMapper {
    public List<StoreMain> storemain(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow);
    public int totalPage();

    public List<StoreMain> detailStore(String id);

    public List<StoreComment> detailStoreComment(String id);

    String getSequence();

    int createBoard(Board boarder);

    boolean editBoard(Board board);

    boolean addComment(Comment comment);

    boolean editComment(Comment comment);

    boolean deleteComment(String comment_id);

    boolean deleteBoardComment(String id);
    boolean deleteBoard(String id);
}
