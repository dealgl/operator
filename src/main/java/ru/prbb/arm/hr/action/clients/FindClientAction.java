package main.java.ru.prbb.arm.hr.action.clients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;


import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Result(type = "json")
public class FindClientAction {

    final static Log log = LogFactory.getLog(FindClientAction.class);

    public Boolean getSuccess() {
        return true;
    }

    public List<Map<String, String>> getInfo() {
        return info;
    }

    public void setInfo(List<Map<String, String>> info) {
        this.info = info;
    }

    private List<Map<String, String>> info = new ArrayList<Map<String, String>>();

    private String snils;

    private String type;

    public String getSnils() {
        return snils;
    }

    public void setSnils(String snils) {
        this.snils = snils;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    @Action("find-client")
    public String execFindClient() {
        if (type.equals("0")) {
            info = ru.prbb.util.OracleDBManager.getInstance().findClientBySnils(snils);
        }
        if (type.equals("1")) {
            info = ru.prbb.util.OracleDBManager.getInstance().findClientByPhone(snils);
        }
        if (type.equals("2")) {
            info = ru.prbb.util.OracleDBManager.getInstance().findClientByMail(snils);
        }
        return "success";
    }

}