package egovframework.smartaircok;

import java.io.IOException;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SmartAircokApplication {
	private static Logger LOGGER = LoggerFactory.getLogger(SmartAircokApplication.class);

	public static void responseController(HttpServletResponse response, Map<String, Object> responseData) throws IOException{	
		ObjectMapper mapper = new ObjectMapper();	
		
		response.setStatus(200);
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		
		response.getWriter().write(mapper.writeValueAsString(responseData));
	}
	
	
	public static void responseErrorLogger(HttpServletResponse response, String errMsg, String loggerMsg, int status, String responseMsg) throws IOException {
		LOGGER.error(errMsg);
		LOGGER.error(loggerMsg);

		response.setStatus(status);
		response.setContentType("text/plain");
		response.setCharacterEncoding("UTF-8");
		
		response.getWriter().write(responseMsg);
	}
}
