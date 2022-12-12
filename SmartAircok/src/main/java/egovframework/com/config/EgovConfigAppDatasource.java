package egovframework.com.config;

import javax.annotation.PostConstruct;
import javax.sql.DataSource;

import org.apache.commons.dbcp2.BasicDataSource;
import org.egovframe.rte.fdl.cryptography.EgovEnvCryptoService;
import org.egovframe.rte.fdl.cryptography.impl.EgovEnvCryptoServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.core.env.Environment;

/**
 * @ClassName : EgovConfigAppDatasource.java
 * @Description : DataSource 설정
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
public class EgovConfigAppDatasource {

	/**
	 *  @Value 을 어노테이션을 이용하는 방법
	 */
	//	@Value("${Globals.DbType}")
	//	private String dbType;
	//
	//	@Value("${Globals.DriverClassName}")
	//	private String className;
	//
	//	@Value("${Globals.Url}")
	//	private String url;
	//
	//	@Value("${Globals.UserName}")
	//	private String userName;
	//
	//	@Value("${Globals.Password}")
	//	private String password;

	/**
	 *  Environment 의존성 주입하여 사용하는 방법
	 */

	@Autowired
	Environment env;

	private String dbType;

	private String className;

	private String url;

	private String userName;

	private String password;

	@PostConstruct
	void init() {
//		dbType = env.getProperty("Globals.DbType");
//		//Exception 처리 필요
//		className = env.getProperty("Globals." + dbType + ".DriverClassName");
//		url = env.getProperty("Globals." + dbType + ".Url");
//		userName = env.getProperty("Globals." + dbType + ".UserName");
//		password = env.getProperty("Globals." + dbType + ".Password");

		ApplicationContext context = new ClassPathXmlApplicationContext(new String[]{"classpath:/crypto.xml"});
		EgovEnvCryptoService envCryptoService = context.getBean(EgovEnvCryptoServiceImpl.class);
		
		dbType = env.getProperty("Globals.DbType");
		className = envCryptoService.decrypt(env.getProperty("Globals." + dbType + ".DriverClassName"));
		url = envCryptoService.decrypt(env.getProperty("Globals." + dbType + ".Url"));
		userName = envCryptoService.decrypt(env.getProperty("Globals." + dbType + ".UserName"));
		password = envCryptoService.decrypt(env.getProperty("Globals." + dbType + ".Password"));
	}


	/**
	 * @return [dataSource 설정] basicDataSource 설정
	 */
	private DataSource basicDataSource() {
		BasicDataSource basicDataSource = new BasicDataSource();
		basicDataSource.setDriverClassName(className);
		basicDataSource.setUrl(url);
		basicDataSource.setUsername(userName);
		basicDataSource.setPassword(password);
		return basicDataSource;
	}

	/**
	 * @return [DataSource 설정]
	 */
	@Bean(name = {"dataSource", "egov.dataSource", "egovDataSource"})
	public DataSource dataSource() {
		return basicDataSource();
	}
}
