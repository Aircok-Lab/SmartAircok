package egovframework.smartaircok.app.web;

import java.sql.SQLException;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import egovframework.smartaircok.SmartAircokApplication;
import egovframework.smartaircok.app.service.SmartAircokAppService;

@RestController
public class SmartAircokAppController {
	private static Logger LOGGER = LoggerFactory.getLogger(SmartAircokAppController.class);
	
	@Resource(name = "smartaircokAppService")
    private SmartAircokAppService smartaircokAppService;
	
	@RequestMapping(value="/app/key", method = RequestMethod.POST)
	public void postAppAcessKey(
			@RequestParam(value="type") int type, // 0 : release, 1 : generate
			HttpServletRequest request, 
			HttpServletResponse response) throws Exception{
		try {
			Map<String, Object> responseData = new HashMap<String, Object>();
			
			String mykey = null;
			
			if(type == 1) {				
				int leftLimit = 48; // numeral '0'
				int rightLimit = 122; // letter 'z'
				int targetStringLength = 10;
				Random random = new Random();

				mykey = random.ints(leftLimit,rightLimit + 1)
				  .filter(i -> (i <= 57 || i >= 65) && (i <= 90 || i >= 97))
				  .limit(targetStringLength)
				  .collect(StringBuilder::new, StringBuilder::appendCodePoint, StringBuilder::append)
				  .toString();
			}

			Map<String, String> mymap = new HashMap<>();
			mymap.put("key", mykey);
			mymap.put("id", "test_user1");
			
			if(smartaircokAppService.updateAppAcessKey(mymap) == 0) {
				LOGGER.info(request.getRequestURL().toString() + "?" + request.getQueryString() + " api update Error");
			    throw new SQLException();
			}
			
			responseData.put("key", mykey);
		    responseData.put("result", "success");
			
			LOGGER.info(request.getRequestURL().toString() + "?" + request.getQueryString() + " api call");
	        
	        SmartAircokApplication.responseController(response, responseData);
		}
		catch (Exception e) {			
	        SmartAircokApplication.responseErrorLogger(
	    		response,
	    		e.getMessage(), 
	    		request.getRequestURL().toString() + "?" + request.getQueryString() + " Exception LOGGER",
	    		404,
	    		"Error");
		}
	}
	

	
	@RequestMapping(value="/app/access/social_type/{social_type}/social_id/{social_id}", method = RequestMethod.POST)
	public void getAppAcessKey(
			@PathVariable String social_type,
			@PathVariable String social_id,
			@RequestHeader("access_token") String access_token,
			HttpServletRequest request, 
			HttpServletResponse response) throws Exception{
		Map<String, Object> responseData = new HashMap<String, Object>();
		try {

			String user_id = smartaircokAppService.selectAppAccessUser(access_token);
			
			if(user_id.equals(null)) {
				LOGGER.info(request.getRequestURL().toString() + " api key invalid Error");
				
			    responseData.put("result", "invalid key");
			    throw new NullPointerException();
			}

			Map<String, String> mymap = new HashMap<>();
			mymap.put("social_id", social_type + "_" + social_id);
			mymap.put("user_id", user_id);
			
			if(smartaircokAppService.updateAppAccessUser(mymap) == 0) {
				LOGGER.info(request.getRequestURL().toString() + " api update Error");
				
			    responseData.put("result", "duplicated id");				
			    throw new SQLException();
			}
			
		    responseData.put("result", "success");
			
			LOGGER.info(request.getRequestURL().toString() + " api call");
			
			SmartAircokApplication.responseController(response, responseData);
		}
		catch (Exception e) {
			LOGGER.error(e.getMessage());
			LOGGER.error(request.getRequestURL().toString() + " Exception LOGGER");
			
			SmartAircokApplication.responseController(response, responseData);
		}			
	}
}
