package com.finalproject.georescue;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {



    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .authorizeHttpRequests(authorize -> authorize
                        .requestMatchers("/", "/login", "/oauth2/**").permitAll()  // public routes
                        .anyRequest().authenticated()  // All other requests need authentication
                )
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/home", true)
                        .failureUrl("/login?error=true")
                );



        return http.build();
    }
}
///*
//Detailed Breakdown
//Annotations:
//
//@Configuration: This annotation indicates that the class is a source of bean definitions. Spring will treat this class as a configuration class, similar to a @Component.
//@EnableWebSecurity: This annotation enables Spring Security’s web security support and provides the Spring MVC integration. It tells Spring to look for the security configurations defined in this class.
//SecurityFilterChain Bean:
//
//@Bean: This annotation tells Spring that the method returns a bean that should be managed by the Spring context. In this case, it creates a SecurityFilterChain.
//public SecurityFilterChain securityFilterChain(HttpSecurity http): This method takes HttpSecurity as a parameter, which is used to configure security features for web applications.
//Authorization Configuration:
//
//http.authorizeHttpRequests(...): This method configures which requests should be authorized and which can be accessed without authentication.
//requestMatchers("/", "/login", "/oauth2/**").permitAll(): This line specifies that the root (/), login page (/login), and any OAuth 2.0 related URLs (e.g., /oauth2/**) are accessible to everyone (i.e., no authentication is required).
//anyRequest().authenticated(): This line enforces that any request not previously matched must be authenticated. In other words, if a user tries to access any other endpoint, they must be logged in.
//OAuth 2.0 Login Configuration:
//
//http.oauth2Login(...): This configures the application to support OAuth 2.0 login functionality.
//defaultSuccessUrl("/home", true): After a successful login, the user is redirected to the /home URL. The true parameter indicates that this redirection should always occur after login, regardless of the page the user originally tried to access.
//failureUrl("/login?error=true"): If the login fails (for example, if the user denies access or enters incorrect credentials), the user will be redirected to the /login page with an error parameter. This can be used to display an error message to the user.
//Returning the SecurityFilterChain:
//
//return http.build();: This line builds and returns the configured SecurityFilterChain. This chain will be used by the Spring Security framework to apply the defined security configurations.
//Summary
//This code effectively sets up a secure environment for a web application using Spring Security and OAuth 2.0, allowing users to authenticate via a third-party service like Google. It defines which endpoints are public and which require authentication, handles successful and failed login attempts, and redirects users appropriately based on their authentication status.
// */
