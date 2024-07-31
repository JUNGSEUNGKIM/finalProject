package com.example.finalproject.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;
import com.example.finalproject.domain.UserInfo;

import java.util.List;

@Mapper
public interface UserMapper {

    public UserInfo checkedUser(UserInfo userInfo);
    public UserInfo save(UserInfo userInfo);
    public UserInfo findById(String userInfo);
    public List<UserInfo> findAll();
    public void deleteById(Long userInfo);



}
