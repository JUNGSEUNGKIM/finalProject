package com.example.finalproject.controller;

import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.repository.mybatis.UserMapper;
import com.example.finalproject.service.JwtTokenProvider;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/user")

public class UserController {
    private final UserMapper userMapper;

    private final JwtTokenProvider jwtTokenProvider;
//    @Autowired
    @Autowired
    public UserController(UserMapper userMapper, JwtTokenProvider jwtTokenProvider){
        this.userMapper = userMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }


    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody UserInfo userInfo){
//        userMapper.toString();
        if (userInfo == null) {
            return ResponseEntity.ok("fail:아이디와 비밀번호를 입력해 주세요");
        }
        String id = userInfo.getId();
        String pass = userInfo.getPassword();
        if (id == null || pass == null) {
            return ResponseEntity.ok("fail:아이디와 비밀번호를 입력해 주세요");
        }

        userInfo = userMapper.checkedUser(userInfo);
        if(userInfo == null){
            System.out.println("hello");

            return ResponseEntity.ok("fail:아이디 또는 비밀번호가 맞지 않습니다. 다시 입력해 주세요.");
        }else {
            String token = jwtTokenProvider.generateToken(userInfo);
//            System.out.println(":::::::::결과"+jwtTokenProvider.validateToken(token));
            return ResponseEntity.ok("succeed:"+token);
        }
    }
}
