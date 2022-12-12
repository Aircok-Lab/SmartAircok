package egovframework.smartaircok.web.service;

import java.util.List;

public interface SmartAircokUserService {
	public Object selectDeviceV2Info() throws Exception;
	
	public List<String> getAuthorities() throws Exception;
	
	public Boolean isAuthenticated() throws Exception;
}