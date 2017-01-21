package ru.prbb.arm.hr.action.vuz;


import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Action;
import org.apache.struts2.convention.annotation.Result;
import org.springframework.stereotype.Component;
import ru.prbb.util.OracleDBManager;

import java.util.List;
import java.util.Map;




/**
 * @author den
 */
@Component
@Result(type = "json")
public class VuzLoadTransAction {

	final static Log log = LogFactory.getLog(VuzLoadTransAction.class);
	
	private List<Map<String, String>> file;
	
	private List<Map<String, String>> transferFiles ;//= new ArrayList<Map<String, String>>();

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
    
    @Action("vuz-load-trans")
    public String vuzLoadTransExecute(){
    	String dbAccount="";
    	String crAccount="";
    	
    	String dbAccount1="";
    	String crAccount1="";

    	String code="";
    	String link="";
    	int cnt_cells;
    	int cnt_all;
    	
    	String code1="";
    	String link1="";
    	int cnt_cells1;
    	int cnt_all1;
    	
    	int numrow = 0;
    	
    	String update="";
    	String update1="";
    	
    	
    	transferFiles = OracleDBManager.getInstance().getTransLoadTmpList("13869");
    	
    	for (int i=0;i<transferFiles.size();i++){
    		
    		if (transferFiles.get(i).get("rd").substring(0,2).equals("RD")
    			|| 
    			(transferFiles.get(i).get("rd").substring(0,2).equals("LN"))
    	    			|| 
    	    	(transferFiles.get(i).get("rd").substring(0,2).equals("CN"))
    		)
    		{

    			
    			dbAccount=transferFiles.get(i).get("db");
    			
    			crAccount=transferFiles.get(i).get("cr");
    			code = transferFiles.get(i).get("f3");
    			link = transferFiles.get(i).get("cd");
    			
    			
    			if (crAccount.equals("ОВП23") || (crAccount=="ОВП23")){
    				cnt_cells=0;
    				cnt_all=0;	
    				for (int k=0;k<transferFiles.size();k++){
    					dbAccount1=transferFiles.get(k).get("db");
    					crAccount1=transferFiles.get(k).get("cr");
    	    			code1 = transferFiles.get(k).get("f3");
    	    			link1 = transferFiles.get(k).get("cd");
    	    			
    	    			if ((link.trim().equals(link1.trim())) && (crAccount.trim().equals(dbAccount1.trim())) && (code.trim().equals(code1.trim()))){
    	    				cnt_cells =cnt_cells+1;
    	    				numrow = k;
    	    			}
    	    			if ((link.trim().equals(link1)) && (code.trim().equals(code1.trim()))){
    	    				cnt_all =cnt_all+1;
    	    			}
    				}//end for k
    				
    				String rownumber =cnt_cells+":"+cnt_all;  
    				
    				transferFiles.get(i).put("f4", rownumber);
    				update = OracleDBManager.getInstance().updateFourField(transferFiles.get(i).get("id"),rownumber); 
    				//1:2
    				if ((cnt_cells==1) && (cnt_all==2) && (i<numrow)) {
    					String rd = "LN:"+numrow;
    					transferFiles.get(i).put("rd",rd);	
    				}
    				
    				if ((cnt_cells==1) && (cnt_all==2) && (i>numrow)){
    					String cd = "CN:"+numrow;
    					transferFiles.get(i).put("rd",cd);
    				}
    				
    				//:>2
    				if ((cnt_cells>1) && (cnt_all>2))  {
    					String ld = "CN:"+numrow;
    					transferFiles.get(i).put("rd",ld);
    				}
    				if ((cnt_cells==1) && (cnt_all>2))  {
    					String ld1 = "LN:"+numrow;
    					transferFiles.get(i).put("rd",ld1);
    				}
    			} //end if
    			
    			if (dbAccount.equals("ОВП23") || (dbAccount=="ОВП23")){
    				cnt_cells=0;
    				cnt_all=0;
    				for (int k=0;k<transferFiles.size();k++){
    					crAccount1=transferFiles.get(k).get("cr");
    	    			code1 = transferFiles.get(k).get("f3");
    	    			link1 = transferFiles.get(k).get("cd");
    	    			
    	    			if ((link.trim().equals(link1.trim())) && (dbAccount.trim().equals(crAccount1.trim())) && (code.trim().equals(code1.trim()))){
    	    				cnt_cells =cnt_cells+1;
    	    				numrow =k; 
    	    			}
    	    			
    	    			if ((link.trim().equals(link1.trim())) && (code.trim().equals(code1.trim()))){
    	    				cnt_all =cnt_all+1;
    	    			}
    				}//end for 
    				
    				String rownumber1 =cnt_cells+":"+cnt_all;  
    				transferFiles.get(i).put("f4", rownumber1);
    				update1 = OracleDBManager.getInstance().updateFourField(transferFiles.get(i).get("id"),rownumber1);
    				
    				//1:2
    				if ((cnt_cells==1) && (cnt_all==2) && (i<numrow)) {
    					String rd = "LN:"+numrow;
    					transferFiles.get(i).put("rd",rd);	
    				}
    				if ((cnt_cells==1) && (cnt_all==2) && (i>numrow)){
    					String cd = "CN:"+numrow;
    					transferFiles.get(i).put("rd",cd);
    				}
    				
    				//:>2
    				if ((cnt_cells>1) && (cnt_all>2))  {
    					String ld = "CN:"+numrow;
    					transferFiles.get(i).put("rd",ld);
    				}
    				if ((cnt_cells==1) && (cnt_all>2))  {
    					String ld1 = "LN:"+numrow;
    					transferFiles.get(i).put("rd",ld1);
    				}
    				
    			}//end if 
    		}
    		
    		
    		
    	}
    	
    	
    	return "success";
    }
    
}