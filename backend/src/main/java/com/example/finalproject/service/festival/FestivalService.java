package com.example.finalproject.service.festival;

import com.example.finalproject.domain.festival.FestivalApi;
import com.example.finalproject.domain.festival.FestivalList;

import java.util.List;

public interface FestivalService {
    List<FestivalList> festivalList();

    List<FestivalApi> festivalApi(String lat, String lon);
}
