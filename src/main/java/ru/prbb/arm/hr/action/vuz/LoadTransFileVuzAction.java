package ru.prbb.arm.hr.action.vuz;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;





/**
 * @author den
 * Created 2013-06-17
*/
@Component
@Result(type = "json")
public class LoadTransFileVuzAction {

	final static Log log = LogFactory.getLog(LoadTransFileVuzAction.class);

	private String path;
	
	private String id;
	
	private String newDesc;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getNewDesc() {
		return newDesc;
	}

	public void setNewDesc(String newDesc) {
		this.newDesc = newDesc;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public Boolean getSuccess() {
        return true;
    }
	
	@Action("load-trans-file-vuz")
	public String execute(){

		log.debug("!!!correct!!!"+path);
		String is[] =path.split(","); 
		String result = "";
		String dt="";
		for (int c=0;c<is.length;++c)
			{
				String transName="";
			 	BufferedOutputStream out=null;
				URL url,urlOut;
				BufferedReader reader;
				try {
						BufferedInputStream in =new BufferedInputStream(new FileInputStream("c:\\Users\\dgluhov\\Downloads\\S0001US1.014"));
						InputStreamReader isr = new InputStreamReader(in, "Cp1251");
						reader = new BufferedReader(isr);
						String line;
						
						int count= 0;
						while ((line = reader.readLine()) !=null ) 
							{
								String str = line;
								if (str.substring(0,2).equals("FH")){
									dt =str.substring(45, 53);
									System.out.println(dt);
								}
								
								
								
								count++;
								if (count != 1) 
									{ 
										
										String code   = str.substring(0, 26).trim();
										//transName	= getTransNameVUZ(code);
										//transName = "Oplata test";
										//String res = new String(transName.getBytes("Cp1251"),"Cp1251");
										//str= str.substring(0,120) + res + str.substring(220,str.length());
										
										String firstSym = str.substring(0,2).toUpperCase();
										if (firstSym.equals("RD")){
										String rd = str.substring(0,8);
										System.out.println(rd);
										
										String debit = str.substring(26,58).trim();
										System.out.println(debit);

										String credit = str.substring(58,90).trim();
										System.out.println(credit);
										
										
										String f1  = str.substring(90,105).trim();
										System.out.println(f1);
										String f2  = str.substring(105,120).trim();
										System.out.println(f2);
										
										String desc  = str.substring(120,220);
										System.out.println(desc);

										String cd  = str.substring(220,230).trim();
										System.out.println(cd);
										
										String datePost = dt;
										System.out.println(datePost);
										
										String f3  = str.substring(18,26).trim();
										System.out.println(f3);
										
										result = OracleDBManager.getInstance().insertTransLoadTmpList("",rd, debit, credit, f1, f2, desc, cd, f3, datePost);
										}
									
									
									} 
								else  
									{
									
									
									}
								
							}
					reader.close();
				} catch (FileNotFoundException e) {
					e.printStackTrace();
				} catch (IOException e) {
					e.printStackTrace();
				} 
		}
		return "success";
    }

	private String getTransNameVUZ(String code) {
		String res="";
		System.out.println("getTransNameVUZ-> " + code );
		//res=OracleDBManager.getInstance().getTransName(code,"ВУЗБАНК");
		return res;
	}
	
    @Action("save-single-trans")
    public String SaveSingleTransExecute(){
		String output = "";
		String idStr[] =id.split(",");
		String str[]=newDesc.split(",");
		for (int s=0;s<idStr.length;s++){
			System.out.println(idStr[s]+"/"+str[s]);	
    	}


		
		
       	//output = OracleDBManager.getInstance().saveSingleVuzFile(id,newDesc,debit,credit);
        return "success";
    }

}