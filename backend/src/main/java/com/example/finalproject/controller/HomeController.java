package com.example.finalproject.controller;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.CacheControl;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
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
        String reactBuildDirectory = currentPath.resolve("src/main/resources/static").toString();

        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:" + uploadsDirectory + "/")
                .setCacheControl(CacheControl.maxAge(1, TimeUnit.HOURS).cachePublic())
                .resourceChain(true);

        registry.addResourceHandler("/**")
                .addResourceLocations("file:" + reactBuildDirectory + "/")
                .resourceChain(true);
        System.out.println("현재 작업 디렉토리:::::::: " + currentPath.toString());
        System.out.println("Uploads path: " + uploadsDirectory);
        System.out.println("React build path: " + reactBuildDirectory);
    }

}
