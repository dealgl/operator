package main.java.ru.prbb.arm.hr.action.clients;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class MainClientsAction {

	final static Log log = LogFactory.getLog(MainClientsAction.class);
	
    public Boolean getSuccess() {
        return true;
    }
    
    @Action("main-clients")
    public String execMainClients(){
    	String res = "";
		log.info("Intro in Main Clients");
        //info = ru.prbb.util.OracleDBManager.getInstance().findClientBySnils(snils);
        return "success";
    }

}