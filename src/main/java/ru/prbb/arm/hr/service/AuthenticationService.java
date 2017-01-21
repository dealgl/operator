package ru.prbb.arm.hr.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.Authentication;
import org.springframework.security.AuthenticationException;
import org.springframework.security.BadCredentialsException;
import org.springframework.security.GrantedAuthority;
import org.springframework.security.GrantedAuthorityImpl;
import org.springframework.security.providers.AuthenticationProvider;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

import ru.prbb.util.OracleDBManager;

	public class AuthenticationService implements AuthenticationProvider {

	    final static Log log = LogFactory.getLog(AuthenticationService.class);

	    @Override
	    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
	    	String info ="";
	    	String out="";
	    	String userName = authentication.getName();
	        String password = "" + authentication.getCredentials();
	        out = OracleDBManager.getInstance().logonUser(userName,password);
			//authUserByCredentials
	        if (out=="1"){
	        	info="1";
	        }
	        if (info=="") {
	            log.debug("Bad credentials");
	            throw new BadCredentialsException("User name or password incorrect");
	        } 

	        return new UsernamePasswordAuthenticationToken(info, password, new GrantedAuthority[]{new GrantedAuthorityImpl("ROLE_ADMIN")}) {
	            @Override
	            public String getName() {
	                return "Admin";
	            }
	        };
	    }

	    @Override
	    public boolean supports(Class clazz) {
	        return clazz.equals(UsernamePasswordAuthenticationToken.class);
	    }
}


