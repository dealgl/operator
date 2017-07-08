package ru.prbb.arm.hr.action;

import com.opensymphony.xwork2.Action;
import com.opensymphony.xwork2.util.ValueStack;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Results;

import javax.servlet.http.HttpServletRequest;


@Results({
        @Result(name = "xhr", type = "json"),
        @Result(name = "html", location = "/WEB-INF/jsp/exception.jsp")
})
public class ExceptionAction implements Action {

    final static Log log = LogFactory.getLog(ExceptionAction.class);

    private String errorMessage = "";
    private String errorCode = "";

    @Override
    public String execute() throws Exception {
        HttpServletRequest request = ServletActionContext.getRequest();
        ValueStack valueStack = ServletActionContext.getValueStack(request);

        Exception e = (Exception) valueStack.findValue("exception");
        if (e != null) {
            errorMessage = e.getMessage();
        }
        String xhr = request.getHeader("X-Requested-With");
        if (!"XMLHttpRequest".equals(xhr)) {
            return "html";
        }
        return "xhr";
    }

    public Boolean getSuccess() {
        return false;
    }

    public String getMessage() {
        return errorMessage != null ? errorMessage.replaceAll("\n", " ").replaceAll("\'", "") : "(Message not found)";
    }

    public String getCode() {
        return errorCode;
    }
}