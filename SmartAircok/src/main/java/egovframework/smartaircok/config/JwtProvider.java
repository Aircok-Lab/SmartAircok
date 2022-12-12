package egovframework.smartaircok.config;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.egovframe.rte.fdl.cryptography.EgovEnvCryptoService;
import org.egovframe.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Header;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

@Component
public class JwtProvider {
	// pw encrypt
	ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/crypto.xml"});
	EgovEnvCryptoService envCryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);
    private String secretKey = envCryptoService.getCyptoAlgorithmKeyHash();
    
	private long access_exp = 1000L * 60 * 10; // 토큰 사용가능 시간, 10분
	private long refresh_exp = 1000L * 60 * 60 * 24 * 14; // 토큰 사용가능 시간, 14일

    //토큰 생성
    public Map<String, String> createToken(String id, String auth) {
        Date now = new Date();
        
        Map<String, String> tokenMap = new HashMap<String, String>();
        
        String access_token = Jwts.builder()
				                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
				                .setIssuer("aircok") // 토큰발급자(iss)
						        .setIssuedAt(now)
						        .setExpiration(new Date(now.getTime() + access_exp))
						        .claim("id", id)
						        .claim("authority", auth)
						        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
				                .compact(); 
        
        String refresh_token = Jwts.builder()
				                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
				                .setIssuer("aircok") // 토큰발급자(iss)
						        .setIssuedAt(now)
						        .setExpiration(new Date(now.getTime() + refresh_exp))
						        .claim("id", id)
						        .claim("authority", auth)
						        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
				                .compact(); 
        
        tokenMap.put("access_token",  access_token);
        tokenMap.put("refresh_token", refresh_token);

        return tokenMap;
    }
    
    public String createAccessToken(Claims claims) {
        Date now = new Date();
        
        return Jwts.builder()
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE) // (1)
                .setIssuer("aircok") // 토큰발급자(iss)
		        .setIssuedAt(now)
		        .setExpiration(new Date(now.getTime() + access_exp))
		        .claim("id", claims.get("id", String.class))
		        .claim("authority", claims.get("authority", String.class))
		        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    //토큰 유효성 체크
    public Claims parseJwtToken(String token) {
        token = BearerRemove(token); // Bearer 제거
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    //Bearer 제거
    private String BearerRemove(String token) {
        return token.substring("Bearer ".length());
    }
}
