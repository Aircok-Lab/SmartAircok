package egovframework.smartaircok.web.service;

import java.util.List;
import java.util.Map;

public interface SmartAircokWebService {
	public String selectDeviceLists(String id) throws Exception;
	
	public List<Map<String, String>> selectDeviceData(Map<String, Object> selectDeviceData_param) throws Exception;
	
	public List<Map<String, String>> selectDeviceLatestData(String id) throws Exception;
	
	public Map<String, String> selectDeviceSensor(String sn) throws Exception;
}
