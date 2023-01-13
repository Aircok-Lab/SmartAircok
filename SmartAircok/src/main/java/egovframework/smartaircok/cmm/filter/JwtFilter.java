package egovframework.smartaircok.cmm.filter;

import java.io.IOException;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import egovframework.smartaircok.cmm.jwt.JwtProvider;

public class JwtFilter extends OncePerRequestFilter {
	
    private final JwtProvider jwtProvider;
    public JwtFilter(JwtProvider jwtProvider) {
      this.jwtProvider = jwtProvider;
    }

    private String resolveToken(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }
    
    private String resolveTokenByCookie(HttpServletRequest request) {
		Cookie[] lists = request.getCookies();
		try {
			for (Cookie list : lists) {
				if (list.getName().equals("Authorization")){
		            return list.getValue();
				}
			}
			return null;
		}
		catch (NullPointerException e) {
			return null;
		}
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String jwt = resolveTokenByCookie(request);

        if (StringUtils.hasText(jwt) && jwtProvider.validateToken(jwt)) {
            Authentication authentication = jwtProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);
        }
        filterChain.doFilter(request, response);
    }

}
