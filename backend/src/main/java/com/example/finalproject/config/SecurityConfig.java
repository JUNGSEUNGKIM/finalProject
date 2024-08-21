package com.example.finalproject.config;//package com.example.finalproject.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;


@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http

                .cors(httpSecurityCorsConfigurer ->
                httpSecurityCorsConfigurer.configurationSource(corsConfigurationSource())
        ).csrf(csrf -> csrf.disable())//csrf인증 토큰 비활성화
                .authorizeHttpRequests(authorizeRequests -> authorizeRequests
                        .anyRequest().permitAll()
//                        .anyRequest().authenticated() // 그 외 모든 요청은 인증 요구
                );
        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration corsConfiguration = new CorsConfiguration();

        corsConfiguration.setAllowedOriginPatterns(List.of("*"));
        corsConfiguration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "HEAD", "OPTIONS"));
        corsConfiguration.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type"));
        corsConfiguration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", corsConfiguration); // 모든 경로에 대해서 CORS 설정을 적용

        return source;
    }

}
//                .authorizeHttpRequests(authorize -> {
//                    authorize.requestMatchers("/", "/static/**", "/public/**").permitAll();
//                    authorize.requestMatchers("/api/**").authenticated();
//                    authorize.anyRequest().authenticated();
//                })

//                .authorizeHttpRequests((authz) -> authz
//                .requestMatchers(HttpMethod.GET, "/public/**").permitAll() //public으로 드러오는 get은 모두 허용
//                .requestMatchers(HttpMethod.POST, "/api/**").authenticated() // post로 api로 들어오는 모든 통신은 인증된 사용자에 한해 허용
//                .anyRequest().authenticated())
//                .authorizeHttpRequests(authorize-> {
//                    authorize.requestMatchers("/static/**", "/index.html", "/").permitAll(); // 정적 리소스와 루트 경로에 대한 접근 허용
//                    authorize.anyRequest().authenticated();
//                })// 다른 모든 요청에 대해 인증 요구



