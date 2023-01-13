package egovframework.smartaircok.app.service;

import java.util.Map;

public interface SmartAircokAppService {
	public int updateAppAcessKey(Map<String, String> user) throws Exception;
	
	public String selectAppAccessUser(String key) throws Exception;
	public int updateAppAccessUser(Map<String, String> user) throws Exception;
}
