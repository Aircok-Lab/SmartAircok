package egovframework.smartaircok.web.service;

//public class SmartAircokUserVO implements UserDetails {
public class SmartAircokUserVO {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	private String id;
	private String pw;
	private String auth;
	
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
		this.pw = pw;
	}
	public String getAuth() {
		return auth;
	}
	public void setAuth(String auth) {
		this.auth = auth;
	}
	
//	@Override
//	public Collection<? extends GrantedAuthority> getAuthorities() {
//	    Set<GrantedAuthority> roles = new HashSet<>();
//	    for (String role : auth.split(",")) {
//	      roles.add(new SimpleGrantedAuthority(role));
//	    }
//	    return roles;
//	}
//	
//	@Override
//	public String getUsername() {
//		return id;
//	}
//	
//	@Override
//	public String getPassword() {
//		return pw;
//	}
//	
//	@Override
//	public boolean isAccountNonExpired() {
//		return true;
//	}
//	
//	@Override
//	public boolean isAccountNonLocked() {
//		return true;
//	}
//	
//	@Override
//	public boolean isCredentialsNonExpired() {
//		return true;
//	}
//	
//	@Override
//	public boolean isEnabled() {
//		return true;
//	}
}
