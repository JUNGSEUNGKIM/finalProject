package com.example.finalproject.controller;

import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.repository.mybatis.UserMapper;
import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/user")

public class UserController {
    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserController(JwtTokenProvider jwtTokenProvider,UserService userService){
        this.jwtTokenProvider = jwtTokenProvider;
        this.userService = userService;
    }
    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody UserInfo userInfo){
        String msg = userService.userLogin(userInfo);
        return ResponseEntity.ok(msg);
    }
}
