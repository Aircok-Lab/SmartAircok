package egovframework.smartaircok.login.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;
import egovframework.smartaircok.login.service.SmartAircokLoginVO;

@Repository("smartaircokLoginDAO")
public class SmartAircokLoginDAO extends EgovComAbstractDAO {
	/* Login Query */
	// Login Process
	public boolean selectIsUser(SmartAircokLoginVO smartaircokLoginVO) {
		return selectOne("smartaircokLogin.selectIsUser", smartaircokLoginVO);
	}

	// JWT Refresh Token
	public int insertRefreshToken(Map<String, String> token) {
		return insert("smartaircokLogin.insertRefreshToken", token);
	}

	public boolean selectTokenValidate(Map<String, String> token) {
		return selectOne("smartaircokLogin.selectTokenValidate", token);
	}

	public int updateAccessToken(Map<String, String> token) {
		return update("smartaircokLogin.updateAccessToken", token);
	}

	public int deleteRefreshToken(Map<String, String> token) {
		return delete("smartaircokLogin.deleteRefreshToken", token);
	}
	
	
	// Spring Security
	public Map<String, String> selectFindByID(String id) {
		return selectOne("smartaircokLogin.selectFindByID", id);
	}
}
