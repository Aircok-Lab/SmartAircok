package egovframework.com.config;

import java.util.List;
import java.util.Properties;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.HandlerExceptionResolver;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.ViewControllerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.servlet.handler.SimpleMappingExceptionResolver;
import org.springframework.web.servlet.view.JstlView;
import org.springframework.web.servlet.view.UrlBasedViewResolver;

import egovframework.com.cmm.interceptor.AuthenticSecurityInterceptor;
import egovframework.com.cmm.interceptor.CustomAuthenticInterceptor;
import egovframework.smartaircok.cmm.jwt.JwtProvider;

/**
 * @ClassName : EgovConfigWebDispatcherServlet.java
 * @Description : DispatcherServlet 설정
 *
 * @author : 윤주호
 * @since  : 2021. 7. 20
 * @version : 1.0
 *
 * <pre>
 * << 개정이력(Modification Information) >>
 *
 *   수정일              수정자               수정내용
 *  -------------  ------------   ---------------------
 *   2021. 7. 20    윤주호               최초 생성
 * </pre>
 *
 */
@Configuration
@ComponentScan(basePackages = "egovframework", excludeFilters = {
	@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Service.class),
	@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Repository.class),
	@ComponentScan.Filter(type = FilterType.ANNOTATION, value = Configuration.class)
})
public class EgovConfigWebDispatcherServlet implements WebMvcConfigurer {
	
    private final JwtProvider jwtProvider;
    @Autowired
    public EgovConfigWebDispatcherServlet(JwtProvider jwtProvider) {
    	this.jwtProvider = jwtProvider;
    }

	final static String RESOLVER_DEFAULT_ERROR_VIEW = "cmm/error/egovError";

	final static int URL_BASED_VIEW_RESOLVER_ORDER = 1;
	final static String URL_BASED_VIEW_RESOLVER_PREFIX = "/WEB-INF/jsp/";
	final static String URL_BASED_VIEW_RESOLVER_SUFFIX = ".jsp";

	@Override
	public void addInterceptors(InterceptorRegistry registry) {
//		registry.addInterceptor(new AuthenticInterceptor())
//			.addPathPatterns(
//				"/**");
//		registry.addInterceptor(new CustomAuthenticInterceptor())
//			.addPathPatterns(
//				"/**");
		
//		registry.addInterceptor(new AuthenticSecurityInterceptor(jwtProvider))
//		.addPathPatterns(
//			"/**");
		
		
//		registry.addInterceptor(new CustomAuthenticInterceptor())
//		.addPathPatterns(
//			"/**");
	}

	// -------------------------------------------------------------
	// RequestMappingHandlerMapping 설정 View Controller 추가
	// -------------------------------------------------------------
	@Override
	public void addViewControllers(ViewControllerRegistry registry) {
		registry.addViewController("/").setViewName("forward:/index.html");
	}

	// -------------------------------------------------------------
	// HandlerExceptionResolver 설정
	// -------------------------------------------------------------
	@Override
	public void configureHandlerExceptionResolvers(List<HandlerExceptionResolver> exceptionResolvers) {
		SimpleMappingExceptionResolver simpleMappingExceptionResolver = new SimpleMappingExceptionResolver();

		simpleMappingExceptionResolver.setDefaultErrorView(RESOLVER_DEFAULT_ERROR_VIEW);

		Properties mappings = new Properties();
		mappings.setProperty("org.springframework.dao.DataAccessException", "cmm/error/dataAccessFailure");
		mappings.setProperty("org.springframework.transaction.TransactionException", "cmm/error/transactionFailure");
		mappings.setProperty("org.egovframe.rte.fdl.cmmn.exception.EgovBizException", "cmm/error/egovError");
		mappings.setProperty("org.springframework.security.AccessDeniedException", "cmm/error/accessDenied");

		simpleMappingExceptionResolver.setExceptionMappings(mappings);

		exceptionResolvers.add(simpleMappingExceptionResolver);
	}

	// -------------------------------------------------------------
	// View Resolver 설정
	// -------------------------------------------------------------
	@Bean
	public UrlBasedViewResolver urlBasedViewResolver() {
		UrlBasedViewResolver urlBasedViewResolver = new UrlBasedViewResolver();
		urlBasedViewResolver.setOrder(URL_BASED_VIEW_RESOLVER_ORDER);
		urlBasedViewResolver.setViewClass(JstlView.class);
		urlBasedViewResolver.setPrefix(URL_BASED_VIEW_RESOLVER_PREFIX);
		urlBasedViewResolver.setSuffix(URL_BASED_VIEW_RESOLVER_SUFFIX);
		return urlBasedViewResolver;
	}

}
