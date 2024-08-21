package com.example.finalproject.controller;


import com.example.finalproject.domain.festival.FestivalList;
import com.example.finalproject.service.festival.FestivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.ResponseEntity;

import java.util.List;

@RestController
@RequestMapping("/festival")
public class FestivalController {

    private final FestivalService festivalService;

    @Autowired
    public FestivalController(FestivalService festivalService){this.festivalService = festivalService;}

    @GetMapping("/festivallist")
    public ResponseEntity<?> fetsivalList(){
        List<FestivalList> festivalList = festivalService.festivalList();
        return ResponseEntity.ok(festivalList);
    }




}
