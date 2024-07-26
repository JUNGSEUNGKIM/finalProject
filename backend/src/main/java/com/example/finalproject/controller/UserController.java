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
            return ResponseEntity.badRequest().body("User information is missing");
        }
        String id = userInfo.getId();
        String pass = userInfo.getPassword();
        if (id == null || pass == null) {
            return ResponseEntity.badRequest().body("ID or password is missing");
        }
        System.out.println("::::::::::::::"+id+pass);

        userInfo = userMapper.checkedUser(userInfo);
        if(userInfo == null){
            System.out.println("hello");

            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("로그인 실패: ");
        }else {
            String token = jwtTokenProvider.generateToken(userInfo);
            System.out.println(":::::::::결과"+jwtTokenProvider.validateToken(token));
            return ResponseEntity.ok(token);
        }
    }
}
