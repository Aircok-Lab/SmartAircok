package egovframework.smartaircok.cmm.util;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;

public class SmartAircokSecurityUtil {

    private SmartAircokSecurityUtil() { }

    public static Long getCurrentMemberId() {
        final Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if (authentication == null || authentication.getName() == null) {
            throw new RuntimeException("인증 정보가 없습니다.");
        }

        return Long.parseLong(authentication.getName());
    }
}