package egovframework.smartaircok.login.web;

import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.egovframe.rte.fdl.cryptography.EgovEnvCryptoService;
import org.egovframe.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.smartaircok.config.JwtProvider;
import egovframework.smartaircok.login.service.SmartAircokLoginService;
import io.jsonwebtoken.Claims;

@RestController
public class SmartAircokLoginController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name = "smartAircokLoginService")
    private SmartAircokLoginService smartAircokLoginService;

    private final JwtProvider jwtProvider;
    @Autowired
    public SmartAircokLoginController(JwtProvider jwtProvider) {
    	this.jwtProvider = jwtProvider;
    }

	// pw encrypt
	ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/crypto.xml"});
	EgovEnvCryptoService envCryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);


	@RequestMapping(value="/loginprocess", method = RequestMethod.POST)
	public void loginProcess(
			@RequestBody Map<String, String> loginUser,
			HttpServletRequest request,
			HttpServletResponse response) throws SQLException, JsonProcessingException, IOException{
		ObjectMapper mapper = new ObjectMapper();
		Map<String, String> response_data = new HashMap<String, String>();	    
		try {			
			String ip = (request.getHeader("X-Forwarded-For") == null) ? 
					(request.getHeader("X-FORWARDED-FOR") == null) ? 
							request.getRemoteAddr() : request.getHeader("X-FORWARDED-FOR")
						: request.getHeader("X-Forwarded-For");
			
			LOGGER.info("------------------------------INFO  LOGGER------------------------------");
			LOGGER.info("   /loginprocess Access Logger INFO");			
			LOGGER.info("    Access IP : " +  ip);
//			LOGGER.info(ToStringBuilder.reflectionToString(smartAircokLoginVO, ToStringStyle.SHORT_PREFIX_STYLE));
			LOGGER.info("------------------------------------------------------------------------");
			
//			Map<String, String> loginUser = new HashMap<String, String>();
//			loginUser.put("id", smartAircokLoginVO.getId());
			
			loginUser.put("pw", envCryptoService.encrypt(loginUser.get("pw")));
			
			if(smartAircokLoginService.selectIsUser(loginUser)) {
				// authority 획득
				String userAuth = smartAircokLoginService.selectUserAuthority(loginUser.get("id"));
				
				// 토큰 생성
				Map<String, String> tokenMap = jwtProvider.createToken(loginUser.get("id"), userAuth);
				
				// 토큰 검증
				Claims claims = jwtProvider.parseJwtToken("Bearer " + tokenMap.get("access_token"));

			    // token db store
			    if(smartAircokLoginService.insertRefreshToken(tokenMap) == 1) {
				    response_data.put("access_token", tokenMap.get("access_token"));
				    response_data.put("refresh_token", tokenMap.get("refresh_token"));
				    response_data.put("issued_time", claims.getIssuedAt().toString());
				    response_data.put("expired_time", claims.getExpiration().toString());
				    response_data.put("authority", claims.get("authority", String.class));
				    response_data.put("result", "success");	
			    }
			    else {
				    throw new SQLException();
			    }
			}
			else {
			    throw new SQLException();
			}
		    
			response.setStatus(200);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			
			response.getWriter().write(mapper.writeValueAsString(response_data));
//			return mapper.writeValueAsString(response_data);
		}
		catch (SQLException e) {
			LOGGER.error(e.getMessage());
			LOGGER.error("/loginprocess SQL Exception LOGGER");

			response.setStatus(404);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write(mapper.writeValueAsString("Not correct user"));
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
