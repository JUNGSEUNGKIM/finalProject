package com.example.finalproject.service.festival;

import com.example.finalproject.domain.festival.FestivalApi;
import com.example.finalproject.service.festival.FestivalService;
import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.domain.festival.FestivalList;
import com.example.finalproject.repository.mybatis.FestivalMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class FestivalServiceImp implements FestivalService{
    private final FestivalMapper festvalMapper;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public FestivalServiceImp(FestivalMapper festvalMapper, JwtTokenProvider jwtTokenProvider){
        this.festvalMapper = festvalMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public List<FestivalList> festivalList(){
        List<FestivalList> festivalList = festvalMapper.festivalList();
//        System.out.println(festivalList);
        return festivalList;
    }

    @Override
    public List<FestivalApi> festivalApi(String lat, String lon){
        System.out.println(lat+"::::::::::"+lon);

        return null;
    }



}
