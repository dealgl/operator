package ru.prbb.arm.hr.action.dictionary;

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
public class ListAction {

	final static Log log = LogFactory.getLog(ListAction.class);
	
    private String faceId;

	private List<Map<String, String>> info;
	
	private List<Map<String, String>> answer;
	
	private String startString;
    
    public String getStartString() {
		return startString;
	}

	public void setStartString(String startString) {
		this.startString = startString;
	}

	public List<Map<String, String>> getAnswer() {
		return answer;
	}

	public void setAnswer(List<Map<String, String>> answer) {
		this.answer = answer;
	}

	private List<Map<String, String>> education;
    
    private List<Map<String, String>> language;
    
    private List<Map<String, String>> experience;
    
    private List<Map<String, String>> status;
    
    public List<Map<String, String>> getStatus() {
		return status;
	}

	public void setStatus(List<Map<String, String>> status) {
		this.status = status;
	}

	private List<Map<String, String>> phone;
	
	private List<Map<String, String>> skills; 
    
    public List<Map<String, String>> getSkills() {
		return skills;
	}

	public void setSkills(List<Map<String, String>> skills) {
		this.skills = skills;
	}

	public List<Map<String, String>> getPhone() {
		return phone;
	}

	public void setPhone(List<Map<String, String>> phone) {
		this.phone = phone;
	}

	public List<Map<String, String>> getExperience() {
		return experience;
	}

	public void setExperience(List<Map<String, String>> experience) {
		this.experience = experience;
	}

	public List<Map<String, String>> getLanguage() {
		return language;
	}

	public void setLanguage(List<Map<String, String>> language) {
		this.language = language;
	}

	public Boolean getSuccess() {
        return true;
    }

    public List<Map<String, String>> getInfo() {
        return info;
    }

    public List<Map<String, String>> getEducation() {
        return education;
    }
    
	public void setEducation(List<Map<String, String>> education) {
		this.education = education;
	}

	public String getFaceId() {
		return faceId;
	}

	public void setFaceId(String faceId) {
		this.faceId = faceId;
	}
    
    @Action("get-section")
    public String getSection(){
        info = OracleDBManager.getInstance().getSectionList();
        return "success";
    }
    
    @Action("get-education-info")
    public String getEducationInfo(){
    	education = OracleDBManager.getInstance().getEducationById(faceId);
        return "success";
    }

    @Action("get-language-info")
    public String getLanguageInfo(){
        language = OracleDBManager.getInstance().getLanguageById(faceId);
        return "success";
    }
    
    @Action("get-experience-info")
    public String getExperienceInfo(){
    	experience = OracleDBManager.getInstance().getExperienceById(faceId);
        return "success";
    }

    @Action("get-status-resume-info")
    public String getStatusResumeInfo(){
    	status = OracleDBManager.getInstance().getStatusResumeById(faceId);
        return "success";
    }
    
    @Action("get-phone-info")
    public String getPhoneInfo(){
    	phone = OracleDBManager.getInstance().getPhoneById(faceId);
        return "success";
    }
  
    @Action("get-skills-info")
    public String getSkillsList(){
    	//skills = OracleDBManager.getInstance().getSkillsById(faceId);
        return "success";
    }
    
    @Action("get-regions-by")
    public String getRegionsStr(){
    //	answer = OracleDBManager.getInstance().getRegionsByStr(startString);
        return "success";
    }
    
    
    
}
