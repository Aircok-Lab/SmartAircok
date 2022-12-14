package egovframework.smartaircok.login.service;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;

import egovframework.smartaircok.cmm.util.SmartAircokPassWordEncoder;

public class SmartAircokLoginVO {	
	private String id;
	private String pw;
	private String authority;
	
    private final SmartAircokPassWordEncoder smartAircokPassWordEncoder = new SmartAircokPassWordEncoder();
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getPw() {
		return pw;
	}
	public void setPw(String pw) {
//		this.pw = pw;
		this.pw = smartAircokPassWordEncoder.encode(pw);
	}
	public String getAuthority() {
		return authority;
	}
	public void setAuthority(String authority) {
		this.authority = authority;
	}


    public UsernamePasswordAuthenticationToken toAuthentication() {
        return new UsernamePasswordAuthenticationToken(id, pw);
    }
}