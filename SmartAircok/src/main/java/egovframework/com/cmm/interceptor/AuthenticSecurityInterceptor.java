package egovframework.com.cmm.interceptor;

import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.servlet.HandlerInterceptor;

import com.fasterxml.jackson.databind.ObjectMapper;

import egovframework.smartaircok.cmm.jwt.JwtProvider;
import io.jsonwebtoken.Claims;

/**
 * 인증여부 체크 인터셉터
 * 
 * @author 공통서비스 개발팀 서준식
 * @since 2011.07.01
 * @version 1.0
 * @see
 *
 *      <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일      수정자          수정내용
 *  -------    --------    ---------------------------
 *  2011.07.01  서준식          최초 생성
 *  2011.09.07  서준식          인증이 필요없는 URL을 패스하는 로직 추가
 *      </pre>
 */

@CrossOrigin
//public class CustomAuthenticInterceptor extends HandlerInterceptorAdaptor {
public class AuthenticSecurityInterceptor implements HandlerInterceptor {

	private final Logger LOGGER = LoggerFactory.getLogger(AuthenticSecurityInterceptor.class);

	private final JwtProvider jwtProvider;
	public AuthenticSecurityInterceptor(JwtProvider jwtProvider) {
		this.jwtProvider = jwtProvider;
	}
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
			throws Exception {
		ObjectMapper mapper = new ObjectMapper();

		HttpSession session = request.getSession();

		LOGGER.info("url : " + request.getRequestURL());
		LOGGER.debug("AuthenticSecurityInterceptor sessionID " + session.getId());
		LOGGER.debug("AuthenticSecurityInterceptor ================== ");

//		return true;

		try {
			LOGGER.debug("CustomAuthenticInterceptor ================== ");

			// authorization 토큰 값 인증
			String token = request.getHeader("Authorization");

			Claims claims = jwtProvider.parseJwtToken(token);

			request.setAttribute("authority", claims.get("authority", String.class));
			
			return true;
		} catch (Exception e) {
			String requestURI = request.getRequestURI();

			Map<String, String> map = new HashMap<>();
			map.put("requestURI", requestURI);
			map.put("result", "not authorized token");

			// redirectURI는 로그인 절차가 끝내고 다시 시도했던 페이지로 돌아가기 위해 JSON 정보에 포함시킨다.
			String json = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(map);
			response.getWriter().write(json);
		}

		response.setStatus(404);
		return false;
	}
}
