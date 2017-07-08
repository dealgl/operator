package ru.prbb.arm.hr.action;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.security.Authentication;
import org.springframework.security.context.SecurityContextHolder;

@Result(location = "/WEB-INF/jsp/index.jsp")
public class IndexAction {

    final static Log log = LogFactory.getLog(IndexAction.class);

    private String user;

    public String execute() throws Exception {
        Authentication auth = SecurityContextHolder.getContext().getAuthentication();
        user = "(developer)";
        if (auth != null) {
            user = "Admin";
        }
        return "success";
    }

    public String getUser() {
        return user;
    }
}