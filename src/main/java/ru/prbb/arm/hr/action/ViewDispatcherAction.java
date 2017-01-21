package ru.prbb.arm.hr.action;

import org.apache.struts2.convention.annotation.Result;


@Result(location = "${answer}", type = "js")
public class ViewDispatcherAction {

    private String viewName;
    private String answer;

    public String execute() throws Exception {
        answer = "/WEB-INF/js/" + viewName + ".js";
        return "success";
    }

    public void setViewName(String viewName) {
        this.viewName = viewName;
    }

    public String getAnswer() {
        return answer;
    }

}