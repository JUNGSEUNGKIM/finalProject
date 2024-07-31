package com.example.finalproject.service.user;

import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.domain.UserInfo;
import com.example.finalproject.repository.mybatis.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import com.example.finalproject.service.user.UserService;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserMapper userMapper;
    private final JwtTokenProvider jwtTokenProvider;

    @Autowired
    public UserServiceImpl(UserMapper userMapper, JwtTokenProvider jwtTokenProvider) {
        this.userMapper = userMapper;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public String userLogin(UserInfo userInfo) {
        if (userInfo == null) {
            return "fail:아이디와 비밀번호를 입력해 주세요";
        }
        String id = userInfo.getId();
        String pass = userInfo.getPassword();
        if (id == null || pass == null) {
            return "fail:아이디와 비밀번호를 입력해 주세요";
        }

        userInfo = userMapper.checkedUser(userInfo);
        if(userInfo == null){
            System.out.println("hello");

            return "fail:아이디 또는 비밀번호가 맞지 않습니다. 다시 입력해 주세요.";
        }else {
            String token = jwtTokenProvider.generateToken(userInfo);
//            System.out.println(":::::::::결과"+jwtTokenProvider.validateToken(token));
            return "succeed:"+token;
        }
    }

    @Override
    @Transactional
    public UserInfo createUser(UserInfo user) {
        return userMapper.save(user);
    }

    @Override
    public UserInfo getUserById(String id) {
        return userMapper.findById(id);

    }

    @Override
    public List<UserInfo> getAllUsers() {
        return userMapper.findAll();
    }

    @Override
    @Transactional
    public UserInfo updateUser(UserInfo user) {
        UserInfo existingUser = getUserById(user.getId());
        existingUser.setName(user.getName());
        existingUser.setBirth(user.getBirth());
        return userMapper.save(existingUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        userMapper.deleteById(id);
    }
}
