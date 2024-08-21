package com.example.finalproject.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.beans.factory.annotation.Value;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.concurrent.TimeUnit;


@Configuration
@RequiredArgsConstructor
@Controller
public class HomeController  implements WebMvcConfigurer {
    @Value("${cors.allowed-origins}")
    private String allowedOrigins;

    /*
     * @name : HomeController
     * @date : 2024. 8. 21.
     * @author : 김정승
     * @description : build 된 react front를 정적으로 불러오게 만듬
     *                4차 프로젝트에서는 spring security 를 사용하지 않아 쉽게 하였지만
     *                고도화 과정에서는 security를 열고 viewControlles를 override해서 진행함
    */

    @Override
    public void addViewControllers(ViewControllerRegistry registry) {
        registry.addViewController("/").setViewName("forward:/index.html");
        registry.addViewController("/{x:[\\w\\-]+}")
             .setViewName("forward:/index.html");
    }

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins.split(",") )
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
                .allowedHeaders("*");
    }
    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        Path currentPath = Paths.get("").toAbsolutePath();
        String uploadsDirectory = currentPath.resolve("uploads").toString();
        String reactBuildDirectory = currentPath.resolve("backend/src/main/resources/static").toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadsDirectory + "/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic())
                .resourceChain(true);

        registry.addResourceHandler("/static/**")
                .addResourceLocations("classpath:/static/static/");

        registry.addResourceHandler("/**")
                .addResourceLocations("classpath:/static/");

//        System.out.println("React build path: " + reactBuildDirectory);
    }

}
