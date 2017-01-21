package ru.prbb.arm.hr.auth;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.AuthenticationException;
import org.springframework.security.BadCredentialsException;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;
import org.springframework.security.providers.dao.AbstractUserDetailsAuthenticationProvider;
import org.springframework.security.userdetails.UserDetails;


public abstract class AbstractAuthenticationProvider extends AbstractUserDetailsAuthenticationProvider {

    static final Log log = LogFactory.getLog(AbstractAuthenticationProvider.class);

    @Override
    protected void additionalAuthenticationChecks(UserDetails userDetails, UsernamePasswordAuthenticationToken authentication) throws AuthenticationException {
        if (!authentication.getCredentials().equals(userDetails.getPassword())) {
            String message = "Failed to authenticate user. [Username: " + authentication.getName() + "]";
            log.debug(message);
            throw new BadCredentialsException(message);
        } else {
            log.debug("User logged in. [Username: " + authentication.getName() + "]");
        }
    }
}
