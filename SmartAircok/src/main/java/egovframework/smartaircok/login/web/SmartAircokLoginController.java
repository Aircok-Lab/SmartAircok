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
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.smartaircok.cmm.jwt.JwtProvider;
import egovframework.smartaircok.login.service.SmartAircokLoginService;
import egovframework.smartaircok.login.service.SmartAircokLoginVO;
import io.jsonwebtoken.Claims;

@RestController
public class SmartAircokLoginController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name = "smartAircokLoginService")
    private SmartAircokLoginService smartAircokLoginService;

    private final JwtProvider jwtProvider;
    private final AuthenticationManagerBuilder managerBuilder;
    public SmartAircokLoginController(JwtProvider jwtProvider, AuthenticationManagerBuilder managerBuilder) {
		this.jwtProvider = jwtProvider;
		this.managerBuilder = managerBuilder;
	}


	@RequestMapping(value="/loginprocess", method = RequestMethod.POST)
	public void loginProcess(
			@RequestBody SmartAircokLoginVO smartAircokLoginVO,
			HttpServletRequest request,
			HttpServletResponse response) throws SQLException, JsonProcessingException, IOException{
		ObjectMapper mapper = new ObjectMapper();
		Map<String, Object> response_data = new HashMap<String, Object>();	    
		try {			
			String ip = (request.getHeader("X-Forwarded-For") == null) ? 
					(request.getHeader("X-FORWARDED-FOR") == null) ? 
							request.getRemoteAddr() : request.getHeader("X-FORWARDED-FOR")
						: request.getHeader("X-Forwarded-For");
			
			LOGGER.info("------------------------------INFO  LOGGER------------------------------");
			LOGGER.info("   /loginprocess Access Logger INFO");			
			LOGGER.info("    Access IP : " +  ip);
			LOGGER.info("------------------------------------------------------------------------");
			
	        UsernamePasswordAuthenticationToken authenticationToken = smartAircokLoginVO.toAuthentication();

	        Authentication authentication = managerBuilder.getObject().authenticate(authenticationToken);
	        
	        Map<String, String> tokenMap = jwtProvider.GenerateTokenByAuth(authentication);
			
			// 토큰 검증
			Claims claims = jwtProvider.parseJwtToken(tokenMap.get("access_token"));

		    // token db store
		    if(smartAircokLoginService.insertRefreshToken(tokenMap) == 1) {
			    response_data.put("access_token", tokenMap.get("access_token"));
			    response_data.put("refresh_token", tokenMap.get("refresh_token"));
			    response_data.put("issued_time", claims.getIssuedAt().toString());
			    response_data.put("expired_time", claims.getExpiration().toString());
			    response_data.put("result", "success");
//			    response_data.put("authority", claims.get("authority", String.class));
		    }
		    else {
			    throw new SQLException();
		    }
		    
			response.setStatus(200);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			
			response.getWriter().write(mapper.writeValueAsString(response_data));
			
//			loginUser.put("pw", envCryptoService.encrypt(loginUser.get("pw")));
			
//			if(smartAircokLoginService.selectIsUser(smartAircokLoginVO)) {
//				// authority 획득
//				String userAuth = smartAircokLoginService.selectUserAuthority(loginUser.get("id"));
//				
//				// 토큰 생성
//				Map<String, String> tokenMap = jwtProvider.createToken(loginUser.get("id"), userAuth);
//				
//				// 토큰 검증
//				Claims claims = jwtProvider.parseJwtToken(tokenMap.get("access_token"));
//
//			    // token db store
//			    if(smartAircokLoginService.insertRefreshToken(tokenMap) == 1) {
//				    response_data.put("access_token", tokenMap.get("access_token"));
//				    response_data.put("refresh_token", tokenMap.get("refresh_token"));
//				    response_data.put("issued_time", claims.getIssuedAt().toString());
//				    response_data.put("expired_time", claims.getExpiration().toString());
//				    response_data.put("authority", claims.get("authority", String.class));
//				    response_data.put("result", "success");	
//			    }
//			    else {
//				    throw new SQLException();
//			    }
//
//			    response_data.put("result", "success");
//			    
//				response.setStatus(200);
//				response.setContentType("text/plain");
//				response.setCharacterEncoding("UTF-8");
//				
//				response.getWriter().write(mapper.writeValueAsString(response_data));
//			}
//			else {
//			    throw new SQLException();
//			}
		}
		catch (SQLException e) {
			LOGGER.error(e.getMessage());
			LOGGER.error("/loginprocess SQL Exception LOGGER");

			response.setStatus(404);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(mapper.writeValueAsString("Not correct user"));
		}
		catch (InternalAuthenticationServiceException e) {
			LOGGER.error(e.getMessage());
			LOGGER.error("/loginprocess InternalAuthenticationServiceException Exception LOGGER");

			response.setStatus(404);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(mapper.writeValueAsString("Autherization Error"));
		}
		catch (Exception e) {
			LOGGER.error(e.getMessage());
			LOGGER.error("/loginprocess Exception LOGGER");

			response.setStatus(404);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(mapper.writeValueAsString("API Error"));
		}
	}
	
}
