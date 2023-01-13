package egovframework.smartaircok.cmm.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import egovframework.smartaircok.cmm.jwt.JwtAccessDeniedHandler;
import egovframework.smartaircok.cmm.jwt.JwtAuthenticationEntryPoint;
import egovframework.smartaircok.cmm.jwt.JwtProvider;
import egovframework.smartaircok.cmm.util.SmartAircokPassWordEncoder;
import egovframework.smartaircok.login.service.SmartAircokLoginService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SmartAircokWebSecurityConfig extends WebSecurityConfigurerAdapter {
	
    private final SmartAircokLoginService smartAircokLoginService;
    private final JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint;
    private final JwtAccessDeniedHandler jwtAccessDeniedHandler;
    private final JwtProvider jwtProvider;    
    public SmartAircokWebSecurityConfig(
    		SmartAircokLoginService smartAircokLoginService,
    		JwtAuthenticationEntryPoint jwtAuthenticationEntryPoint,
    		JwtAccessDeniedHandler jwtAccessDeniedHandler,
    		JwtProvider jwtProvider) {
        this.smartAircokLoginService = smartAircokLoginService;
        this.jwtAuthenticationEntryPoint = jwtAuthenticationEntryPoint;
        this.jwtAccessDeniedHandler = jwtAccessDeniedHandler;
		this.jwtProvider = new JwtProvider();
	}
    
    @Bean
    public PasswordEncoder passwordEncoder(){
        return new SmartAircokPassWordEncoder();
    }
    
	@Override
	public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
//		web.ignoring().antMatchers("/smartaircok-web/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
		http
//			.httpBasic().disable()
			.csrf().disable()
			.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
    	
    		.and()
        	.cors().configurationSource(corsConfigurationSource())
			
	        .and()
	        .exceptionHandling()
	        .authenticationEntryPoint(jwtAuthenticationEntryPoint)
	        .accessDeniedHandler(jwtAccessDeniedHandler)
	        
	        .and()
	        .logout()
	        .logoutUrl("/logout")
	        .logoutSuccessUrl("/logout/process")
	        .deleteCookies("Authorization")

	        .and()
	        .authorizeRequests()
//	        .antMatchers("/login/**").permitAll()
//	        .antMatchers("/logout/**").permitAll()
//	        .antMatchers("/app/**").permitAll()
	        .antMatchers("/**").permitAll()
	        .anyRequest().authenticated()

            .and()
            .apply(new SmartAircokJwtSecurityConfig(jwtProvider));
	}
	
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }
    
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        
        configuration.addAllowedOriginPattern("http://localhost:3000");
        configuration.addAllowedHeader("*");
        configuration.addAllowedMethod("*");
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(smartAircokLoginService);
	}
}