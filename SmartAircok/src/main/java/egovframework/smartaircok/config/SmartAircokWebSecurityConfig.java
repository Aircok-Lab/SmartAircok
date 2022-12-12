package egovframework.smartaircok.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import egovframework.smartaircok.login.service.SmartAircokLoginService;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class SmartAircokWebSecurityConfig extends WebSecurityConfigurerAdapter {
    @Autowired
    private SmartAircokLoginService smartAircokLoginService;

	@Override
	public void configure(WebSecurity web) {
        web.ignoring().antMatchers("/css/**", "/js/**", "/img/**", "/lib/**");
		web.ignoring().antMatchers("/smartaircok-web/**");
	}

	@Override
	protected void configure(HttpSecurity http) throws Exception {
//		http.authorizeRequests()
//				.antMatchers("/login", "/signup", "/user").permitAll()
//				.antMatchers("/").hasRole("USER")
//				.antMatchers("/admin").hasRole("ADMIN")
//				.anyRequest().authenticated()
//				.and().formLogin()
//				.loginPage("/login")
//				.defaultSuccessUrl("/")
//				.and().logout()
//				.logoutSuccessUrl("/login")
//				.invalidateHttpSession(true)

        http.authorizeRequests()
//                .antMatchers("/member/**").authenticated()
//                .antMatchers("/admin/**").authenticated()
//        		.antMatchers("/loginprocess").permitAll()
//				.antMatchers("/device-lists").hasRole("USER");
			.antMatchers("/loginprocess", "/device-lists").permitAll();

        http.formLogin()
                .loginPage("/login")
//                .loginPage("/loginprocess")
                .defaultSuccessUrl("/")
                .permitAll();

        http.logout()
                .logoutRequestMatcher(new AntPathRequestMatcher("/logout"))
                .logoutSuccessUrl("/login")
                .invalidateHttpSession(true);

        http.exceptionHandling()
                .accessDeniedPage("/denied");
        
        http.sessionManagement()
	        .maximumSessions(1)
	        .maxSessionsPreventsLogin(false)
	        .expiredUrl("/duplicated-login")
	        .sessionRegistry(sessionRegistry());

		http.csrf().disable();
	}
	
    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

	@Override
	public void configure(AuthenticationManagerBuilder auth) throws Exception {
		auth.userDetailsService(smartAircokLoginService);
	}
}