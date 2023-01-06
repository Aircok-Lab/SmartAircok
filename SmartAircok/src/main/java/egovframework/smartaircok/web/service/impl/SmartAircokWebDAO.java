package egovframework.smartaircok.web.service.impl;

import java.util.List;
import java.util.Map;

import org.springframework.stereotype.Repository;

import egovframework.com.cmm.service.impl.EgovComAbstractDAO;

@Repository("smartaircokWebDAO")
public class SmartAircokWebDAO extends EgovComAbstractDAO {

	public String selectDeviceLists(String id) {
		return selectOne("smartaircokWeb.selectDeviceLists", id);
	}

	public List<Map<String, String>> selectDeviceData(Map<String, Object> selectDeviceData_param) {
		return selectList("smartaircokWeb.selectDeviceData", selectDeviceData_param);
	}

	public List<Map<String, String>> selectDeviceLatestData(String id) {
		return selectList("smartaircokWeb.selectDeviceLatestData", id);
	}

	public Map<String, String> selectDeviceSensor(String sn) {
		return selectOne("smartaircokWeb.selectDeviceSensor", sn);
	}
}
