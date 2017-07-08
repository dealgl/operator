package ru.prbb.arm.hr.action;

import org.apache.struts2.convention.annotation.Result;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

@Result(location = "/WEB-INF/jsp/helpdesk-message.jsp")
public class HelpdeskAction {

    private String from;
    private String to;
    private String fio;

    public Boolean getSuccess() {
        return true;
    }

    public String execute() {
        fio = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("v_user_name", RequestAttributes.SCOPE_SESSION));
        from = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("v_user_mail_work", RequestAttributes.SCOPE_SESSION));
        to = "DGluhov@prbb.ru";
        return "success";
    }

    public String getTo() {
        return to;
    }

    public String getFrom() {
        return from;
    }

    public String getFio() {
        return fio;
    }
}
