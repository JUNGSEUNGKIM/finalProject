package com.example.finalproject.controller;

import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.service.user.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/user")

public class UserController {
    private final UserService userService;
    @Autowired
    public UserController(UserService userService){this.userService = userService;}
    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody UserInfo userInfo){
        String msg = userService.userLogin(userInfo);
        return ResponseEntity.ok(msg);
    }
}
