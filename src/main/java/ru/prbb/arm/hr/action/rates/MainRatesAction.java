package ru.prbb.arm.hr.action.rates;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class MainRatesAction {

	final static Log log = LogFactory.getLog(MainRatesAction.class);
	
    public Boolean getSuccess() {
        return true;
    }
    
    @Action("main-rates")
    public String execMainRates(){
    	String res = "";
		log.info("Intro in Main Rates3");
        return "success";
    }

}