package main.java.ru.prbb.arm.hr.action.clients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

@Component
@Result(type = "json")
public class SendEmailClientAction {

    final static Log log = LogFactory.getLog(SendEmailClientAction.class);

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

    @Action("send-email-client")
    public String execSendEmailClient() {
        String res = "";
        String res1 = "";
        snils = snils.replaceFirst(" ", "%20");
        HttpClient httpClient = new DefaultHttpClient();
        HttpPost p = new HttpPost("https://lkk-api.futurenpf.ru/v1/users/request-password-recovery-cc?cc_token=V53BHTAI6EMFJX08&snils=" + snils);
        try {
            HttpResponse r = httpClient.execute(p);
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";
    }

    @Action("send-email-client-login")
    public String execSendEmailClientLogin() {
        String res = "";
        String password = "";
        String text = "";
        String email = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("user_email", RequestAttributes.SCOPE_SESSION)).trim() + "%20";
        res = ru.prbb.util.OracleDBManager.getInstance().getEmailPhoneBySnils(snils);
        password = ru.prbb.util.OracleDBManager.getInstance().getPasswordBySnils(snils);
        text = "Login%20" + res + "%20Password%20" + password;
        String url = "https://cabinet.futurenpf.ru/api/client/send_email_by_url?token=uDuFsA5BUQjFw7UC7B4aTFxo3PoGzCeoRE4Q9BSGcRmwkbyENmJyQPB&subject=LoginPassword&emails=".concat(email).concat("&html=").concat(text);
        HttpClient httpClient = new DefaultHttpClient();
        HttpPost p = new HttpPost(url);
        try {
            HttpResponse r = httpClient.execute(p);
            System.out.println(r.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
        return "success";
    }


}