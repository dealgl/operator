package ru.prbb.arm.hr.action.settlement;

import java.io.BufferedInputStream;
import java.io.BufferedReader;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.UnsupportedEncodingException;
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
public class VisaImportAction {

	final static Log log = LogFactory.getLog(VisaImportAction.class);

	private File file1;
    private String contentType1;
    private String filename1;
    private String settlDate;
    private String settlChannel;
    public String getSettlChannel() {
		return settlChannel;
	}

	public void setSettlChannel(String settlChannel) {
		this.settlChannel = settlChannel;
	}

	private String settlCur;
    
    public String getSettlDate() {
		return settlDate;
	}

	public String getSettlCur() {
		return settlCur;
	}

	public void setSettlCur(String settlCur) {
		this.settlCur = settlCur;
	}

	public void setSettlDate(String settlDate) {
		this.settlDate = settlDate;
	}

	public void setUpload(File file) {
    	this.file1 = file;
    }

    public void setUploadContentType(String contentType) {
        this.contentType1 = contentType;
    }

    public void setUploadFileName(String filename) {
        this.filename1 = filename;
    }

	public Boolean getSuccess() {
        return true;
    }
    
    @Action("visa-import")
    public String visaImportExecute(){
    	System.out.println("File1="+file1);
    	System.out.println("FileContanType="+contentType1);
    	System.out.println("File Name="+filename1);
    	String path = file1.toString();
    	System.out.println("path="+path);
    	
    	String res = "";
    	
    	try {
		BufferedReader reader;
		List<Map<Integer, String>> info = new ArrayList<Map<Integer, String>>();

		BufferedInputStream in =new BufferedInputStream(new FileInputStream(path));
		InputStreamReader isr = new InputStreamReader(in, "Cp1251");
		reader = new BufferedReader(isr);
		String line;
		int count=0;
		int row=0;
		while ((line = reader.readLine()) !=null ) 
		{
			Map<Integer, String> map = new HashMap<Integer, String>();		
			String str = line;
			map.put(count, str);
			info.add(map);
			count++;
		}
		System.out.println(info.size());
		
		for (int i=0;i<count;i++){
			String currStr = info.get(i).get(i);
			int currRow = i;
			if (currStr.contains("ONLINE SETTLMNT DATE:")){
				settlDate = currStr.substring(currStr.indexOf("ONLINE SETTLMNT DATE:")+21, currStr.length()).trim();
				System.out.println(settlDate);
			}
			if (currStr.contains("AMOUNT (")){
				settlCur = currStr.substring(currStr.indexOf("AMOUNT (")+8, currStr.length()-2).trim();
				System.out.println(settlCur+"/"+currRow);
			}
			
			if (currStr.contains("CA ID:")){
				
				settlChannel = currStr.substring(currStr.indexOf("CA ID:")+8, currStr.length()-2).trim();
				System.out.println(settlCur+"/"+currRow);
			}
			
			
			
			
		}
		
		
		
		reader.close();
		
		
		
		
		
		} catch (FileNotFoundException e) {
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
    	return "success";
    }
    
}