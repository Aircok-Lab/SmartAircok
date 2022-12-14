package egovframework.smartaircok.login.service.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import egovframework.smartaircok.login.service.SmartAircokLoginService;
import egovframework.smartaircok.login.service.SmartAircokLoginVO;

@Service("smartAircokLoginService")
public class SmartAircokLoginServiceImpl extends EgovAbstractServiceImpl implements SmartAircokLoginService {
	/* Login Query */
	// Login Process
	@Resource(name = "smartAircokLoginDAO")
	private SmartAircokLoginDAO smartAircokLoginDAO;
	
	@Override
	public boolean selectIsUser(SmartAircokLoginVO smartAircokLoginVO) throws Exception {
		return this.smartAircokLoginDAO.selectIsUser(smartAircokLoginVO);
	}
	
	
	// JWT Refresh Token
	@Override
	public int insertRefreshToken(Map<String, String> token) throws Exception {
		return this.smartAircokLoginDAO.insertRefreshToken(token);
	}

	@Override
	public boolean selectTokenValidate(Map<String, String> token) throws Exception {
		return this.smartAircokLoginDAO.selectTokenValidate(token);
	}

	@Override
	public int updateAccessToken(Map<String, String> token) throws Exception {
		return this.smartAircokLoginDAO.updateAccessToken(token);
	}

	@Override
	public int deleteRefreshToken(Map<String, String> token) throws Exception {
		return this.smartAircokLoginDAO.deleteRefreshToken(token);
	}
	
	// Spring Secrity
	@Override
	public UserDetails loadUserByUsername(String id) throws UsernameNotFoundException {
		Map<String, String> member = this.smartAircokLoginDAO.selectFindByID(id);

        List<GrantedAuthority> authorities = new ArrayList<>();

        authorities.add(new SimpleGrantedAuthority(member.get("authrt")));

        return new User(member.get("user_id"), member.get("user_pswd"), authorities);
	}
}