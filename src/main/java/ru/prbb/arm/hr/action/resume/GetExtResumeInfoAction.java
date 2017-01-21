package ru.prbb.arm.hr.action.resume;

import java.util.List;
import java.util.Map;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class GetExtResumeInfoAction {

	final static Log log = LogFactory.getLog(GetExtResumeInfoAction.class);
	
	private String date_from; 
	
	private String date_to;
	
	private List<Map<String, String>> listResume;

	private List<Map<String,String>> info;
	private List<Map<String,String>> addInfo;
    
	private Boolean success = true;
	
	private String message;
	
	private String faceId;
	
	private String vacancy;
	
	private String city;
	
	private String index;
	
	private String countIndex;
	
	private List<Map<String, String>> listAutoCallResume;

	public List<Map<String, String>> getListAutoCallResume() {
		return listAutoCallResume;
	}

	public void setListAutoCallResume(List<Map<String, String>> listAutoCallResume) {
		this.listAutoCallResume = listAutoCallResume;
	}

	public String getCountIndex() {
		return countIndex;
	}

	public void setCountIndex(String countIndex) {
		this.countIndex = countIndex;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	private String declineComment;

	public String getDeclineComment() {
		return declineComment;
	}

	public void setDeclineComment(String declineComment) {
		this.declineComment = declineComment;
	}

	public String getVacancy() {
		return vacancy;
	}

	public void setVacancy(String vacancy) {
		this.vacancy = vacancy;
	}

	public String getFaceId() {
		return faceId;
	}

	public void setFaceId(String faceId) {
		this.faceId = faceId;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	private String face_id;

	private String ids;
	
	private String idr;// id record
	
	private String date;
	
	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getAddress() {
		return address;
	}

	public void setAddress(String address) {
		this.address = address;
	}

	private String time;
	
	private String district;
	
	public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	private String address;
	

	public String getIds() {
		return ids;
	}

	public void setIds(String ids) {
		this.ids = ids;
	}

	private String autoCall;
	
	public List<Map<String, String>> getAddInfo() {
		return addInfo;
	}

	public void setAddInfo(List<Map<String, String>> addInfo) {
		this.addInfo = addInfo;
	}
	
	public String getAutoCall() {
		return autoCall;
	}

	public void setAutoCall(String autoCall) {
		this.autoCall = autoCall;
	}

	public String getFace_id() {
		return face_id;
	}

	public void setFace_id(String faceId) {
		face_id = faceId;
	}

	public List<Map<String, String>> getInfo() {
		return info;
	}

	public void setInfo(List<Map<String, String>> info) {
		this.info = info;
	}

	public List<Map<String, String>> getListResume() {
		return listResume;
	}

	public void setListResume(List<Map<String, String>> listResume) {
		this.listResume = listResume;
	}

	public String getDate_to() {
		return date_to;
	}

	public void setDate_to(String dateTo) {
		date_to = dateTo;
	}

	public String getDate_from() {
		return date_from;
	}

	public void setDate_from(String dateFrom) {
		date_from = dateFrom;
	}

	public Boolean getSuccess() {
        return success;
    }

	public String getIdr() {
		return idr;
	}

	public void setIdr(String idr) {
		this.idr = idr;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}
  
   @Action("get-ext-resume-info")
   public String execute(){
	//   	 info =OracleDBManager.getInstance().getExtResumeInfoById(face_id); 
	   	 //addInfo =OracleDBManager.getInstance().getExtResumeAddInfoById(face_id);
	   	 countIndex = index;
	   	 listAutoCallResume =OracleDBManager.getInstance().getResumeExtListAutoCall();
       return "success";
   }
 }
