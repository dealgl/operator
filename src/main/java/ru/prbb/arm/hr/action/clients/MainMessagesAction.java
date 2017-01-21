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
public class MainMessagesAction {

	final static Log log = LogFactory.getLog(MainMessagesAction.class);

    private List<Map<String, String>> info = new ArrayList<Map<String, String>>();

    private String client_id;

    private String message;

    public Boolean getSuccess() {
        return true;
    }
    
    @Action("main-messages")
    public String execMainMessages(){
    	String res = "";
		log.info("Intro in Main Clients");
		System.out.println(client_id);
        info = ru.prbb.util.OracleDBManager.getInstance().findMessagesBySnils(client_id);
        System.out.println(info.size());
        return "success";
    }

    @Action("new-message")
    public String execNewMessage(){
        String res="";
        res = ru.prbb.util.OracleDBManager.getInstance().newMessage(message,client_id);
        return "success";
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public List<Map<String, String>> getInfo() {
        return info;
    }
    public void setInfo(List<Map<String, String>> info) {
        this.info = info;
    }
    public String getClient_id() {
        return client_id;
    }
    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }
}