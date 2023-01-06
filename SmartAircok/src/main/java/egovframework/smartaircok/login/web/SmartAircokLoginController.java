package egovframework.smartaircok.login.web;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseCookie;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.smartaircok.SmartAircokApplication;
import egovframework.smartaircok.cmm.jwt.JwtProvider;
import egovframework.smartaircok.login.service.SmartAircokLoginService;
import egovframework.smartaircok.login.service.SmartAircokLoginVO;
import io.jsonwebtoken.Claims;

@RestController
public class SmartAircokLoginController {
	private static Logger LOGGER = LoggerFactory.getLogger(SmartAircokLoginController.class);
	
	@Resource(name = "smartaircokLoginService")
    private SmartAircokLoginService smartaircokLoginService;

    private final JwtProvider jwtProvider;
    private final AuthenticationManagerBuilder managerBuilder;
    public SmartAircokLoginController(JwtProvider jwtProvider, AuthenticationManagerBuilder managerBuilder) {
		this.jwtProvider = jwtProvider;
		this.managerBuilder = managerBuilder;
	}


	@RequestMapping(value="/login/user", method = RequestMethod.POST)
	public void loginProcess(
			@RequestBody SmartAircokLoginVO smartAircokLoginVO,
			HttpServletRequest request,
			HttpServletResponse response) throws SQLException, JsonProcessingException, IOException{
		Map<String, Object> responseData = new HashMap<String, Object>();	    
		try {			
			String ip = (request.getHeader("X-Forwarded-For") == null) ? 
					(request.getHeader("X-FORWARDED-FOR") == null) ? 
							request.getRemoteAddr() : request.getHeader("X-FORWARDED-FOR")
						: request.getHeader("X-Forwarded-For");
			
			LOGGER.info("------------------------------INFO  LOGGER------------------------------");
			LOGGER.info("   /login/user Access Logger INFO");			
			LOGGER.info("    Access IP : " +  ip);
			LOGGER.info("------------------------------------------------------------------------");

	        Authentication authentication = managerBuilder.getObject().authenticate(smartAircokLoginVO.toAuthentication());
	        
	        Map<String, String> tokenMap = jwtProvider.GenerateTokenByAuth(authentication);
			
			// 토큰 검증
			Claims claims = jwtProvider.parseJwtToken(tokenMap.get("access_token"));

		    // token db store
		    if(smartaircokLoginService.insertRefreshToken(tokenMap) != 1) {
			    throw new SQLException();
		    }			

		    responseData.put("user", smartAircokLoginVO.getId());
		    responseData.put("admin", claims.get("authority", String.class).equals("ROLE_ADMIN") ? "true" : "false");
		    responseData.put("refresh_token", tokenMap.get("refresh_token"));
		    responseData.put("result", "success"); 
		    // 쿠키 설정
	        ResponseCookie auth_cookie = ResponseCookie.from("Authorization", tokenMap.get("access_token"))
	                .maxAge(7 * 24 * 60 * 60)
	                .path("/")
	                .secure(true)
	                .sameSite("Strict")
	                .httpOnly(true)
	                .build();
	        
	        response.setHeader("Set-Cookie", auth_cookie.toString());
	        
	        SmartAircokApplication.responseController(response, responseData);
		}
		catch (SQLException e) {	        
	        SmartAircokApplication.responseErrorLogger(
	        		response,
	        		e.getMessage(), 
	        		"/login/user SQL Exception LOGGER",
	        		404,
	        		"Not correct user");
		}
		catch (InternalAuthenticationServiceException e) {
	        SmartAircokApplication.responseErrorLogger(
	        		response,
	        		e.getMessage(), 
	        		"/login/user InternalAuthenticationServiceException Exception LOGGER",
	        		404,
	        		"Autherization Error");
		}
		catch (Exception e) {
	        SmartAircokApplication.responseErrorLogger(
	        		response,
	        		e.getMessage(), 
	        		"/login/user Exception LOGGER",
	        		404,
	        		"API Error");
		}
	}

	@RequestMapping(value="/logout/process", method = RequestMethod.GET)
	public void logoutProcess(HttpServletRequest request, HttpServletResponse response) {
	    // 쿠키 설정
        ResponseCookie auth_cookie = ResponseCookie.from("Authorization", null).build();
        
        response.setHeader("Set-Cookie", auth_cookie.toString());
	}	
}
