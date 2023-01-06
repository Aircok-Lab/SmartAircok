package egovframework.smartaircok.cmm.jwt;

import java.util.Arrays;
import java.util.Collection;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.stream.Collectors;

import org.egovframe.rte.fdl.cryptography.EgovEnvCryptoService;
import org.egovframe.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
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

//	private long access_exp = 1000L * 60 * 10; // 토큰 사용가능 시간, 10분
	private long access_exp = 1000L * 60 * 60 * 24 * 14; // 토큰 사용가능 시간, 10분
	private long refresh_exp = 1000L * 60 * 60 * 24 * 14; // 토큰 사용가능 시간, 14일

    //토큰 생성
    public Map<String, String> createToken(String id, String auth) {
        Date now = new Date();
        
        Map<String, String> tokenMap = new HashMap<String, String>();
        
        String access_token = Jwts.builder()
				                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
				                .setIssuer("aircok")
						        .setIssuedAt(now)
						        .setExpiration(new Date(now.getTime() + access_exp))
						        .claim("id", id)
						        .claim("authority", auth)
						        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
				                .compact(); 
        
        String refresh_token = Jwts.builder()
				                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
				                .setIssuer("aircok")
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
                .setHeaderParam(Header.TYPE, Header.JWT_TYPE)
                .setIssuer("aircok")
		        .setIssuedAt(now)
		        .setExpiration(new Date(now.getTime() + access_exp))
		        .claim("id", claims.get("id", String.class))
		        .claim("authority", claims.get("authority", String.class))
		        .signWith(Keys.hmacShaKeyFor(secretKey.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public Claims parseJwtToken(String token) {
        if(token.startsWith("Bearer ")) {
            token = token.substring("Bearer ".length());
        }
        return Jwts.parserBuilder()
                .setSigningKey(secretKey.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
    
    public Boolean validateToken(String token) {
    	try {
            Jwts.parserBuilder().setSigningKey(secretKey.getBytes()).build().parseClaimsJws(token);
            return true;
    	}
    	catch (Exception e) {
        	return false;
    	}
    }
    
    public Authentication getAuthentication(String token) {
        Claims claims = parseJwtToken(token);

        if (claims.get("authority") == null) {
            throw new RuntimeException("권한 정보가 없는 토큰입니다.");
        }

        Collection<? extends GrantedAuthority> authorities =
                Arrays.stream(claims.get("authority").toString().split(","))
                        .map(SimpleGrantedAuthority::new)
                        .collect(Collectors.toList());
        
        UserDetails principal = new User(claims.get("id").toString(), "", authorities);

        return new UsernamePasswordAuthenticationToken(principal, "", authorities);
    }
    
    public Map<String, String> GenerateTokenByAuth(Authentication authentication) {
        String authorities = authentication.getAuthorities().stream()
                .map(GrantedAuthority::getAuthority)
                .collect(Collectors.joining(","));
        
		return createToken(authentication.getName(), authorities);
    }
}
