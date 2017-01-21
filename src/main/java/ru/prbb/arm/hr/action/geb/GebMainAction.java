package ru.prbb.arm.hr.action.geb;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.commons.net.ftp.FTPClient;
import org.apache.commons.net.ftp.FTPFile;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;



/**
 * @author denis
 */
@Component
@Result(type = "json")
public class GebMainAction {

	final static Log log = LogFactory.getLog(GebMainAction.class);
	
	private String xmlStr;
	
	private String orgId;
	
	private List<Map<String, String>> transferFiles = new ArrayList<Map<String, String>>();
	
	public List<Map<String, String>> getTransferFiles() {
		return transferFiles;
	}

	public void setTransferFiles(List<Map<String, String>> transferFiles) {
		this.transferFiles = transferFiles;
	}

	public String getOrgId() {
		return orgId;
	}

	public void setOrgId(String orgId) {
		this.orgId = orgId;
	}

	private List<Map<String, String>> file;
	
	public List<Map<String, String>> getFile() {
		return file;
	}

	public void setFile(List<Map<String, String>> file) {
		this.file = file;
	}

	public void setXmlStr(String xmlStr) {
		this.xmlStr = xmlStr;
	}

	public String getXmlStr() {
		return xmlStr;
	}
	
    public Boolean getSuccess() {
        return true;
    }
    
    @Action("geb-main")
    public String gebMain(){
    	String res = "";
		res = getTransferFilesInfo();
        return "success";
    }

    private String getTransferFilesInfo(){ 
		String res = "getTransferFilesInfo";
		HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap = new HashMap<String, String>();
        hashMap.put("files","S0006US1.036");
        hashMap.put("path","C:\\Users\\dgluhov\\Downloads\\S0006US1.036");
        transferFiles.add(hashMap);
        return res;
	}

}