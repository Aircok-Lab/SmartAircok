package egovframework.smartaircok.app.service.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.egovframe.rte.fdl.cmmn.EgovAbstractServiceImpl;
import org.springframework.stereotype.Service;

import egovframework.smartaircok.app.service.SmartAircokAppService;

@Service("smartaircokAppService")
public class SmartAircokAppServiceImpl extends EgovAbstractServiceImpl implements SmartAircokAppService {
	@Resource(name = "smartaircokAppDAO")
	private SmartAircokAppDAO smartaircokAppDAO;

	@Override
	public int updateAppAcessKey(Map<String, String> user) throws Exception {
		return this.smartaircokAppDAO.updateAppAcessKey(user);
	}

	@Override
	public String selectAppAccessUser(String key) throws Exception {
		return this.smartaircokAppDAO.selectAppAccessUser(key);
	}

	@Override
	public int updateAppAccessUser(Map<String, String> user) throws Exception {
		return this.smartaircokAppDAO.updateAppAccessUser(user);
	}
}
