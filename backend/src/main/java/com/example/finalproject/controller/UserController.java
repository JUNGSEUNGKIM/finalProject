package com.example.finalproject.controller;

import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.repository.mybatis.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController // json 파일로 배포하는 컨트롤러
@RequestMapping("/user")
@CrossOrigin(origins = { "${cors.allowed-origins}" },allowCredentials = "true",methods = {RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT})
public class UserController {
    private final UserMapper userMapper;
//    @Autowired
    public UserController(UserMapper userMapper){this.userMapper = userMapper;}
    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @PostMapping(value = "/login")
    public ResponseEntity<?> userLogin(@RequestBody UserInfo userInfo){
//        userMapper.toString();
        String id = userInfo.getId();
        String pass = userInfo.getPassword();
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
