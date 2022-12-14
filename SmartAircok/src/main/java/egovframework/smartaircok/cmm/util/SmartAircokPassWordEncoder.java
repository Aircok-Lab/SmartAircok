package egovframework.smartaircok.cmm.util;

import org.egovframe.rte.fdl.cryptography.EgovEnvCryptoService;
import org.egovframe.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.security.crypto.password.PasswordEncoder;

public class SmartAircokPassWordEncoder implements PasswordEncoder {
	// pw encrypt
	ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/crypto.xml"});
	EgovEnvCryptoService envCryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);
	
    @Override
    public String encode(CharSequence charSequence) {
        return envCryptoService.encrypt(charSequence.toString());
    }

    @Override
    public boolean matches(CharSequence charSequence, String s) {
        return charSequence.toString().equals(s);
    }
}
