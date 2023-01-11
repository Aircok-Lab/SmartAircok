package egovframework.smartaircok.web.web;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.smartaircok.SmartAircokApplication;
import egovframework.smartaircok.web.service.SmartAircokWebService;

@RestController
public class SmartAircokWebController {
	private static Logger LOGGER = LoggerFactory.getLogger(SmartAircokWebController.class);
	
	@Resource(name = "smartaircokWebService")
    private SmartAircokWebService smartaircokWebService;
	
	private List<String> getUsableSensorList(String sn){		
		try {
			Map<String, String> mysensors = smartaircokWebService.selectDeviceSensor(sn);
			mysensors.remove("sn");
			
			List<String> mysensors_list = new ArrayList<String>();
			
			for(String mysensor : mysensors.keySet()) {
				Object mysensor_val = mysensors.get(mysensor);
				
				if(mysensor_val.equals(false) || mysensor_val.equals("")) {
					continue;
				}
				mysensors_list.add(mysensor.split("_")[0]);
			}
			
			return mysensors_list;
		}
		catch (Exception e) {
			return null;
		}
	}
	
	@RequestMapping(value="/device/lists", method = RequestMethod.GET)
	public void getDeviceLists(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try {
			Map<String, Object> responseData = new HashMap<String, Object>();
			
			// access_token에서 추출한 사용자 이름
			UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
			String username = userDetails.getUsername();
			
			String devicelists = smartaircokWebService.selectDeviceLists(username);

			responseData.put("devices", devicelists.split(","));
		    responseData.put("result", "success");
			
			LOGGER.info("/device/lists api call");
			LOGGER.info(" => " + devicelists);
	        
	        SmartAircokApplication.responseController(response, responseData);
		}
		catch (Exception e) {			
	        SmartAircokApplication.responseErrorLogger(
        		response,
        		e.getMessage(), 
        		"/device/lists Exception LOGGER",
        		404,
        		"Error");
		}
	}
	
	@RequestMapping(value="/device/data/{sn}", method = RequestMethod.GET)
	public void getDeviceData(
			@PathVariable String sn,
			@RequestParam(value = "st", required = false, defaultValue="") String st,
			@RequestParam(value = "et", required = false, defaultValue="") String et,
			HttpServletRequest request, HttpServletResponse response) throws Exception{
		try {	
			Map<String, Object> responseData = new HashMap<String, Object>();
			
			Map<String, Object> selectDeviceData_param = new HashMap<String, Object>();
			selectDeviceData_param.put("sn", sn);
//			selectDeviceData_param.put("time", LocalDateTime.now().minusMinutes(5));
			selectDeviceData_param.put("stime", LocalDateTime.of(2022, 12, 8, 15, 0, 0));
			selectDeviceData_param.put("etime", LocalDateTime.of(2022, 12, 8, 20, 0, 0));
			selectDeviceData_param.put("sensors", getUsableSensorList(sn));
			
			// 사용가능한 센서만 출력
			List<Map<String, String>> mydata = smartaircokWebService.selectDeviceData(selectDeviceData_param);

			responseData.put("data", mydata);
		    responseData.put("result", "success");
			
			LOGGER.info("/device/data/" + sn + " api call");			
			LOGGER.info(" => " + mydata);
	        
	        SmartAircokApplication.responseController(response, responseData);
			
		}
		catch (Exception e) {	        
	        SmartAircokApplication.responseErrorLogger(
        		response,
        		e.getMessage(), 
        		"/device/data/" + sn + " Exception LOGGER",
        		404,
        		"Not correct device");
		}		
	}
	
	@RequestMapping(value="/device/latests", method = RequestMethod.GET)
	public void getDeviceSensor(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try {
			Map<String, Object> responseData = new HashMap<String, Object>();
			
			// access_token에서 추출한 사용자 이름
//			UserDetails userDetails = (UserDetails)SecurityContextHolder.getContext().getAuthentication().getPrincipal();
//			String username = userDetails.getUsername();
			
			String username = "test_user1";
			
			List<Map<String, String>> mydata = smartaircokWebService.selectDeviceLatestData(username);
	
			responseData.put("data", mydata);
		    responseData.put("result", "success");
			
			LOGGER.info("/device/latests api call");
	        
	        SmartAircokApplication.responseController(response, responseData);
		}
		catch (Exception e) {			
	        SmartAircokApplication.responseErrorLogger(
	    		response,
	    		e.getMessage(), 
	    		"/device/latests Exception LOGGER",
	    		404,
	    		"Error");
		}
	}
	
	@RequestMapping(value="/device/blp/{sn}", method = RequestMethod.GET)
	public void getDeviceBlp(@PathVariable String sn, HttpServletRequest request, HttpServletResponse response) throws Exception{
		try {
			Map<String, Object> responseData = new HashMap<String, Object>();
			

			List<List<List<Integer>>> mydata = new ArrayList<>();
			
			responseData.put("data", mydata);
		    responseData.put("result", "success");

			
			LOGGER.info("/device/blp/" + sn + " api call");			
			LOGGER.info(" => " + mydata);
	        
	        
	        SmartAircokApplication.responseController(response, responseData);
		}
		catch (Exception e) {			
	        SmartAircokApplication.responseErrorLogger(
	    		response,
	    		e.getMessage(), 
	    		"/device/latests Exception LOGGER",
	    		404,
	    		"Error");
		}
	}
}
