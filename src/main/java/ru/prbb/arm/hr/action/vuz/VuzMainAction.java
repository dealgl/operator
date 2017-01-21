package ru.prbb.arm.hr.action.vuz;

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
 * @author den
 */
@Component
@Result(type = "json")
public class VuzMainAction {

	final static Log log = LogFactory.getLog(VuzMainAction.class);
	
	private List<Map<String, String>> file;
	
	private List<Map<String, String>> transferFiles = new ArrayList<Map<String, String>>();

	public List<Map<String, String>> getTransferFiles() {
		return transferFiles;
	}

	public void setTransferFiles(List<Map<String, String>> transferFiles) {
		this.transferFiles = transferFiles;
	}
	
	public List<Map<String, String>> getFile() {
		return file;
	}

	public void setFile(List<Map<String, String>> file) {
		this.file = file;
	}
	
    public Boolean getSuccess() {
        return true;
    }
    
    @Action("vuz-main")
    public String vuzMainExecute(){
    	String res = "";
		res = getTransferFilesInfo();
        return "success";
    }
    
    
	private String getTransferFilesInfo(){ 
		String res = "getTransferFilesInfo";
		HashMap<String, String> hashMap = new HashMap<String, String>();
        hashMap = new HashMap<String, String>();
        hashMap.put("files","S0003RU1.015");
        hashMap.put("path","C:\\Users\\dgluhov\\Downloads\\S0003RU1.015");
        transferFiles.add(hashMap);
        return res;
	}

    
    
}