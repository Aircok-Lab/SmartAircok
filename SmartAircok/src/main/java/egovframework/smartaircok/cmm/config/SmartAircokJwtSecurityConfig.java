package egovframework.smartaircok.cmm.config;

import org.springframework.security.config.annotation.SecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.DefaultSecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

import egovframework.smartaircok.cmm.filter.JwtFilter;
import egovframework.smartaircok.cmm.jwt.JwtProvider;

public class SmartAircokJwtSecurityConfig extends SecurityConfigurerAdapter<DefaultSecurityFilterChain, HttpSecurity> {
	
    private final JwtProvider jwtProvider;
    public SmartAircokJwtSecurityConfig(JwtProvider jwtProvider) {
        this.jwtProvider = jwtProvider;
      }

    @Override
    public void configure(HttpSecurity http) {
        JwtFilter customFilter = new JwtFilter(jwtProvider);
        http.addFilterBefore(customFilter, UsernamePasswordAuthenticationFilter.class);
    }	
}
