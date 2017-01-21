package ru.prbb.arm.hr.action.resume;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;

import java.util.List;
import java.util.Map;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class InfoAction {

	final static Log log = LogFactory.getLog(InfoAction.class);
	
    private List<Map<String, String>> params;
    
    private List<Map<String, String>> spec;
    
    private String id;
    
    public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public List<Map<String, String>> getSpec() {
		return spec;
	}

	public void setSpec(List<Map<String, String>> spec) {
		this.spec = spec;
	}

	public Boolean getSuccess() {
        return true;
    }

    public List<Map<String, String>> getParams() {
        return params;
    }
    
    @Action("prepare-request")
    public String prepareRequest(){
        spec =OracleDBManager.getInstance().getSpecializationList();
        return "success";
    }
    
    @Action("get-specialization")
    public String getSpecialization(){
        System.out.println("get-Section!!!");
        spec =OracleDBManager.getInstance().getSpecializationListById(id);
        return "success";
    }
    
}
