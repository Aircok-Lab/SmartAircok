package egovframework.smartaircok.app.service.impl;

import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

@Repository("smartaircokAppDAO")
public class SmartAircokAppDAO extends EgovComAbstractDAO {
	public int updateAppAcessKey(Map<String, String> user) {
		return insert("smartaircokApp.updateAppAcessKey", user);
	}

	public String selectAppAccessUser(String key) {
		return selectOne("smartaircokApp.selectAppAccessUser", key);
	}

	public int updateAppAccessUser(Map<String, String> user) {
		return insert("smartaircokApp.updateAppAccessUser", user);
	}
}
