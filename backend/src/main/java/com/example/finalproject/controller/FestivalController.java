package com.example.finalproject.controller;


import com.example.finalproject.domain.festival.FestivalApi;
import com.example.finalproject.domain.festival.FestivalList;
import com.example.finalproject.service.festival.FestivalService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;

import java.util.List;
import java.util.Map;

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
    @GetMapping(value = { "/festivalapi", "festivalapi/"})
    public ResponseEntity<?> festivalApi(Model model, @RequestParam(required = false) String lat,@RequestParam(required = false) String lon) {
        List<FestivalApi> festivalList = festivalService.festivalApi(lat, lon);
        return ResponseEntity.ok("ok");
    }




}
