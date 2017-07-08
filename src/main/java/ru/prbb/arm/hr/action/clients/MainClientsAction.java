package main.java.ru.prbb.arm.hr.action.clients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;

import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Result(type = "json")
public class MainClientsAction {

    final static Log log = LogFactory.getLog(MainClientsAction.class);

    public String getClient_id() {
        return client_id;
    }

    public void setClient_id(String client_id) {
        this.client_id = client_id;
    }

    private String client_id;

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    private String type;

    public String getClientId() {
        return clientId;
    }

    public void setClientId(String clientId) {
        this.clientId = clientId;
    }

    private String clientId;

    public String getSnils() {
        return snils;
    }

    public void setSnils(String snils) {
        this.snils = snils;
    }

    private String snils;

    public String getNewpassword() {
        return newpassword;
    }

    public void setNewpassword(String newpassword) {
        this.newpassword = newpassword;
    }

    private String newpassword;

    private byte[] content;

    public List<Map<String, String>> getInfo() {
        return info;
    }

    public void setInfo(List<Map<String, String>> info) {
        this.info = info;
    }

    private List<Map<String, String>> info = new ArrayList<Map<String, String>>();

    public Boolean getSuccess() {
        return true;
    }

    @Action("change-password")
    public String execChangePassword() {
        String res = "";
        res = ru.prbb.util.OracleDBManager.getInstance().changePassword(newpassword);
        return "success";
    }

    @Action("main-clients")
    public String execMainClients() {
        String res = "";
        clientId = client_id;
        //info = ru.prbb.util.OracleDBManager.getInstance().findClientBySnils(snils);
        return "success";
    }

    @Action("all-messages")
    public String execAllMessages() {
        info = ru.prbb.util.OracleDBManager.getInstance().getAllNotAnsweredMessages();
        return "success";
    }

    @Action("all-not-check")
    public String execAllNotCheck() {
        info = ru.prbb.util.OracleDBManager.getInstance().getAllNotCheckedClients();
        return "success";
    }

    @Action("all-not-check-snils")
    public String execAllNotCheckBySnils() {
        if (type.equals("0")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getAllNotCheckedClientsBySnils(snils);
        }
        if (type.equals("1")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getAllNotCheckedClientsByPhone(snils);
        }
        if (type.equals("2")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getAllNotCheckedClientsByMail(snils);
        }
        return "success";
    }

    @Action("attempts")
    public String execAttempts() {
        if (type.equals("0")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getRegAttempts(snils);
        }
        if (type.equals("1")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getRegAttemptsByPhone(snils);
        }
        if (type.equals("2")) {
            info = ru.prbb.util.OracleDBManager.getInstance().getRegAttemptsByMail(snils);
        }

        return "success";
    }

}