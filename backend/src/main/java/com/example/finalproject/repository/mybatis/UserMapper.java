package com.example.finalproject.repository.mybatis;

import org.apache.ibatis.annotations.Mapper;
import com.example.finalproject.domain.UserInfo;

@Mapper
public interface UserMapper {

    public UserInfo checkedUser(UserInfo userInfo);

}
