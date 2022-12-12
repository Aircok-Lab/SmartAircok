package egovframework.smartaircok.login.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.smartaircok.login.service.SmartAircokLoginVO;
import egovframework.smartaircok.login.service.SmartAircokTokenVO;

@Repository("smartAircokLoginDAO")
public class SmartAircokLoginDAO extends EgovComAbstractDAO {
	/* Login Query */
	// Login Process
	public boolean selectIsUser(Map<String, String> loginUser) {
		return selectOne("smartAircokLogin.selectIsUser", loginUser);
	}

	public String selectUserAuthority(String id) {
		return selectOne("smartAircokLogin.selectUserAuthority", id);
	}
	

	// JWT Refresh Token
	public int insertRefreshToken(Map<String, String> token) {
		return insert("smartAircokLogin.insertRefreshToken", token);
	}

	public boolean selectTokenValidate(Map<String, String> token) {
		return selectOne("smartAircokLogin.selectTokenValidate", token);
	}

	public int updateAccessToken(Map<String, String> token) {
		return update("smartAircokLogin.updateAccessToken", token);
	}

	public int deleteRefreshToken(Map<String, String> token) {
		return delete("smartAircokLogin.deleteRefreshToken", token);
	}
	
	
	// Spring Security
	public Map<String, String> selectFindByID(String id) {
		return selectOne("smartAircokLogin.selectFindByID", id);
	}
}
