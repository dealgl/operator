package ru.prbb.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.IOException;

public class AjaxSecurityFilter extends OncePerRequestFilter {

    final static Log log = LogFactory.getLog(AjaxSecurityFilter.class);

    private class RedirectResponseWrapper extends HttpServletResponseWrapper {

        private String redirect;

        public RedirectResponseWrapper(HttpServletResponse response) {
            super(response);
        }

        public void sendRedirect() throws IOException {
            super.sendRedirect(this.redirect);
        }

        public void sendRedirect(String location) throws IOException {
            this.redirect = location;
        }

        public String getRedirect() {
            return redirect;
        }

    }

    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        if ("XMLHttpRequest".equals(request.getHeader("X-Requested-With")) || "AJAX".equals(request.getHeader("DwrRequest"))) {
            RedirectResponseWrapper wrapper = new RedirectResponseWrapper(response);

            filterChain.doFilter(request, wrapper);

            String location = wrapper.getRedirect();

            if (location != null && location.contains("signin.html")) {
                log.debug("Sending error message: Session expired");
                response.setContentType("application/json;charset=UTF-8");
                response.getWriter().write(
                        "{'failure' : 'true'," +
                                "'message' : 'Ваша сессия устарела. Пожалуйста войдите в систему повторно.'," +
                                "'code' : 'login'}");
            }
        } else {
            filterChain.doFilter(request, response);
        }

    }
}