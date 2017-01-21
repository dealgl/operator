package ru.prbb.arm.hr.action.settlement;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.ServletActionContext;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class MainSettlementAction {

	final static Log log = LogFactory.getLog(MainSettlementAction.class);

    private List<Map<String, String>> info = new ArrayList<Map<String, String>>();

    private String date_begin;
    
    public String getDate_begin() {
		return date_begin;
	}

	public void setDate_begin(String dateBegin) {
		date_begin = dateBegin;
	}

	public String getDate_end() {
		return date_end;
	}

	public void setDate_end(String dateEnd) {
		date_end = dateEnd;
	}

	private String date_end;
    
    
	public List<Map<String, String>> getInfo() {
		return info;
	}

	public void setInfo(List<Map<String, String>> info) {
		this.info = info;
	}

	public Boolean getSuccess() {
        return true;
    }
    
    @Action("main-settlement")
    public String mainSettlementExecute(){
        System.out.println("date_begin="+date_begin);
        System.out.println("date_end="+date_end);
        //info = OracleDBManager.getInstance().getFileSettlementInfo("","");
        //String res  = OracleDBManager.getInstance().getFileSettlementInfo("","");
        //info = OracleDBManager.getInstance().getFileSettlementInfo("","");
    	return "success";
    }
    
}