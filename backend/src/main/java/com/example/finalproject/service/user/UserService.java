package com.example.finalproject.service.user;

import com.example.finalproject.config.JwtTokenProvider;
import com.example.finalproject.domain.UserInfo;

import java.util.List;

public interface UserService {
    String userLogin(UserInfo user);
    UserInfo createUser(UserInfo user);
    UserInfo getUserById(String id);
    List<UserInfo> getAllUsers();
    UserInfo updateUser(UserInfo user);
    void deleteUser(Long id);
}
