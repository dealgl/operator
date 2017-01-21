package ru.prbb.arm.hr.action.geb;


import java.util.ArrayList;

import java.util.List;
import java.util.Map;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import ru.prbb.util.OracleDBManager;


/**
 * @author den
 */
@Component
@Result(type = "json")
public class ImportToRsAction {

	final static Log log = LogFactory.getLog(ImportToRsAction.class);
	
	private String transId;
	
	public String getTransId() {
		return transId;
	}

	public void setTransId(String transId) {
		this.transId = transId;
	}

	private List<Map<String, String>> rsTrans;
	
    public List<Map<String, String>> getRsTrans() {
		return rsTrans;
	}

	public void setRsTrans(List<Map<String, String>> rsTrans) {
		this.rsTrans = rsTrans;
	}

	public Boolean getSuccess() {
        return true;
    }
    
    @Action("import-to-rs")
    public String importToRsExecute(){
    	System.out.println(transId);
    	//rsTrans = OracleDBManager.getInstance().importTransToRS("13869");
    	return "success";
    }
    
}