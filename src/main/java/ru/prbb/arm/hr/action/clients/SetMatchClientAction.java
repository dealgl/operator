package main.java.ru.prbb.arm.hr.action.clients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class SetMatchClientAction {

	final static Log log = LogFactory.getLog(SetMatchClientAction.class);
	
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

    public String getSnils() {
        return snils;
    }

    public void setSnils(String snils) {
        this.snils = snils;
    }

    @Action("set-match")
    public String execMatchClient(){
        String res="";
    	res = ru.prbb.util.OracleDBManager.getInstance().setMatchClient(snils);
        return "success";
    }

}