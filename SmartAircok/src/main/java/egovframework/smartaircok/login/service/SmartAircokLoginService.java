package egovframework.smartaircok.login.service;

import java.util.Map;

import org.springframework.security.core.userdetails.UserDetailsService;

public interface SmartAircokLoginService extends UserDetailsService {
	/* Login Query */
	// Login Process
	boolean selectIsUser(Map<String, String> loginUser) throws Exception;
	
	String selectUserAuthority(String id) throws Exception;
	
	// JWT Refresh Token
	int insertRefreshToken(Map<String, String> token) throws Exception;
	
	boolean selectTokenValidate(Map<String, String> token) throws Exception;
	
	int updateAccessToken(Map<String, String> token) throws Exception;
	
	int deleteRefreshToken(Map<String, String> token) throws Exception;
}