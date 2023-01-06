package egovframework.smartaircok.web.service.impl;

import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import egovframework.smartaircok.web.service.SmartAircokWebService;

@Service("smartaircokWebService")
public class SmartAircokWebServiceImpl extends EgovAbstractServiceImpl implements SmartAircokWebService {
	@Resource(name = "smartaircokWebDAO")
	private SmartAircokWebDAO smartaircokWebDAO;

	@Override
	public String selectDeviceLists(String id) throws Exception {
		return this.smartaircokWebDAO.selectDeviceLists(id);
	}

	@Override
	public List<Map<String, String>> selectDeviceData(Map<String, Object> selectDeviceData_param) throws Exception {
		return this.smartaircokWebDAO.selectDeviceData(selectDeviceData_param);
	}

	@Override
	public List<Map<String, String>> selectDeviceLatestData(String id) throws Exception {
		return this.smartaircokWebDAO.selectDeviceLatestData(id);
	}

	@Override
	public Map<String, String> selectDeviceSensor(String sn) throws Exception {
		return this.smartaircokWebDAO.selectDeviceSensor(sn);
	}
}
