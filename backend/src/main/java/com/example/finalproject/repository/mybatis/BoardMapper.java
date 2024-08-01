package com.example.finalproject.repository.mybatis;

import com.example.finalproject.domain.board.BoardMain;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface BoardMapper {
    public List<BoardMain> boardmain(@Param("startRow") Integer startRow, @Param("endRow") Integer endRow);
    public int totalPage();
}
