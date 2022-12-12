package egovframework.smartaircok.web.web;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import egovframework.smartaircok.login.service.SmartAircokLoginService;

@RestController
public class SmartAircokWebController {
	private final Logger LOGGER = LoggerFactory.getLogger(this.getClass());
	
	@Resource(name = "smartAircokLoginService")
    private SmartAircokLoginService smartAircokLoginService;
	
	@RequestMapping(value="/device-lists", method = RequestMethod.GET)
	public void getDeviceLists(HttpServletRequest request, HttpServletResponse response) throws Exception{
		try {	
			LOGGER.info("/device-lists api call");
			
			String api_time_string = "$$aircok:s$$"
										+ LocalDateTime.now().format(DateTimeFormatter.ofPattern("yyyyMMddHHmmss")) 
										+ "$$aircok:e$$\r\n";
			
			LOGGER.info(" => " + api_time_string);
			response.setStatus(200);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			
			response.getWriter().write(api_time_string);
		}
		catch (Exception e) {
			LOGGER.error("/time Exception LOGGER");
			LOGGER.error(" => $$aircok:s$$NO|ER01$$aircok:e$$");

			response.setStatus(200);
			response.setContentType("text/plain");
			response.setCharacterEncoding("UTF-8");
			response.getWriter().write("$$aircok:s$$NO|ER01$$aircok:e$$");
		}
	}
}
