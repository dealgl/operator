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
public class MainMessagesAction {

    final static Log log = LogFactory.getLog(MainMessagesAction.class);
    private List<Map<String, String>> info = new ArrayList<Map<String, String>>();
    private String client_id;
    private String snils;
    private String client;
    private String message;
    private String fio;
    private String message_id;

    public Boolean getSuccess() {
        return true;
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

    public String getFio() {
        return fio;
    }

    public void setFio(String fio) {
        this.fio = fio;
    }

    public String getClient() {
        return client;
    }

    public void setClient(String client) {
        this.client = client;
    }

    public String getSnils() {
        return snils;
    }

    public void setSnils(String snils) {
        this.snils = snils;
    }

    public String getMessage_id() {
        return message_id;
    }

    public void setMessage_id(String message_id) {
        this.message_id = message_id;
    }

    @Action("main-messages")
    public String execMainMessages() {
        String res = "";
        info = ru.prbb.util.OracleDBManager.getInstance().findMessagesBySnils(client_id);
        snils = client_id;
        client = ru.prbb.util.OracleDBManager.getInstance().getClientFioBySnils(client_id);
        return "success";
    }

    @Action("check-view")
    public String execCheckView() {
        String res = "";
        String res1 = "";
        String is[] = message_id.split(",");
        for (int c = 0; c < is.length; c++) {
            res1 = ru.prbb.util.OracleDBManager.getInstance().setViewStatusMessage(is[c]);
        }
        return "success";
    }

    @Action("new-message")
    public String execNewMessage() {
        String res = "";
        String res1 = "";
        String is[] = message_id.split(",");
        res = ru.prbb.util.OracleDBManager.getInstance().newMessage(message, client_id);
        for (int c = 0; c < is.length; c++) {
            res1 = ru.prbb.util.OracleDBManager.getInstance().updateInputMessage(is[c]);
        }
        return "success";
    }

}