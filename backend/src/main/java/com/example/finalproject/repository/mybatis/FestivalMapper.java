package com.example.finalproject.repository.mybatis;

import com.example.finalproject.domain.festival.FestivalList;
import org.apache.ibatis.annotations.Mapper;

import java.util.List;

@Mapper
public interface FestivalMapper {
    public List<FestivalList> festivalList();
}
