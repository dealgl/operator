package ru.prbb.arm.hr.action.geb;


import java.io.BufferedInputStream;
import java.io.BufferedOutputStream;
import java.io.BufferedReader;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.URL;
import java.net.URLConnection;
import java.util.HashMap;
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
 * Created 2013-06-17
*/
@Component
@Result(type = "json")
public class GebTransPreLoadAction {

	final static Log log = LogFactory.getLog(GebTransPreLoadAction.class);

	private String p_doc_kind;
	
	private String p_shifr;
	
	private String p_pack;
	
	private String SD;
	
	private String SC;
	
	private String transId;
	
	private String link;
	
	private String credSum;
	
	private String debSum;
	
	private String dbAmountTmp;
	
	private String crAmountTmp;
	
	private String p_ground;
	
	private String fileDate;
	
	private String operId;
	
	
	private List<Map<String, String>> infoTmp;
	
	public List<Map<String, String>> getInfoTmp() {
		return infoTmp;
	}

	public void setInfoTmp(List<Map<String, String>> infoTmp) {
		this.infoTmp = infoTmp;
	}

	private List<Map<String, String>> info;
	
	public List<Map<String, String>> getInfo() {
		return info;
	}

	public void setInfo(List<Map<String, String>> info) {
		this.info = info;
	}

	public String getTransId() {
		return transId;
	}

	public void setTransId(String transId) {
		this.transId = transId;
	}

	public Boolean getSuccess() {
        return true;
    }
	
	@Action("geb-trans-pre-load")
	public String gebTransPreLoadExecute(){
		String res="";
		String res1="";
		String B1="";
		String B2="";
		
		System.out.println(transId);
		String row[]  = transId.split(",");
		
		for (int i=0;i<row.length;i++){//start cycle for
			
			info = OracleDBManager.getInstance().getTransById(row[i]);
			System.out.println(info.get(0).get("rd"));
			String rd = info.get(0).get("rd");
			String rds = rd.substring(0,2);
			
			if (rds.equals("RD") || rds.equals("LN")){
				String dataSource = "FILE";
				p_doc_kind = "70";
				GetDefPaym( 70, B1, B2);
				p_shifr = "09/6";
				p_pack = "1";
				
				int p_origin = 1500;//OpenWay
			    int p_run_operation = 0;
			    int p_pack_mode = 0;
			    operId = "3869";//id oper
			    p_ground = info.get(0).get("desc");
			    int p_make_carry_from_payment = 1;        
			      
			      //*initialization data *//
			   SD =info.get(0).get("db") ;
			   SC = info.get(0).get("cr");
			   link =info.get(0).get("cd");
			   String TR_CODE =info.get(0).get("f3");
			   fileDate=info.get(0).get("date");
			   debSum =info.get(0).get("f1"); 
			   credSum ="0000";

			   String buf = info.get(0).get("f4");
			   int conversion=0;
			   conversion =getCntCnv(buf);
	
			   if (conversion==2){
				   
				   p_doc_kind = "15";
				   p_shifr = "09/6";
				   p_pack = "1";
				   if (SD.trim().equals("ОВП23") || SD.trim().equals("ОВП")){
						   credSum =  info.get(0).get("f1");
						   SD =FindCrAcc(info.get(0).get("id"),link,SD);
						   debSum = dbAmountTmp;

				   }
				   
				   if (SC.trim().equals("ОВП23") || SC.trim().equals("ОВП") ){
						   SC = FindDbAcc(info.get(0).get("id"),link,SC);
						   credSum = crAmountTmp;
						   debSum = info.get(0).get("f1");
				   }
				   
			   }
			   if (conversion>2){
				   
			   }
			   
			   
			   
			   /*switch (conversion)
			   {
			   	case 2:
			   		
			   }*/
		
				   res = OracleDBManager.getInstance().insertTransLoadRS(SD,SC,debSum,credSum,p_ground,
								"",//dr_name
								"",//s_inn
								"",//s_kpp
								"",//s_bik
								"",//cr_name
								"",//t_inn
								"",//t_kpp
								"",//t_bik
								fileDate,
								p_doc_kind,
								p_shifr,
								p_pack,
								operId,
								"",//result
								link
			); 
		  
			   
			}
			
		}//end cycle for
		
		res1 = OracleDBManager.getInstance().deleteDoublesPreLoad();
		return "success";
    }

	private String FindDbAcc(String id, String link, String sc) {
		String res = "";
		String user ="2935";
		infoTmp= OracleDBManager.getInstance().getTransLoadTmpList(user);
		for (int i=0;i<infoTmp.size();i++){
			if (!id.equals(infoTmp.get(i).get("id")) && 
					(!link.trim().equals("C000000000")) &&
					(sc.trim().equals(infoTmp.get(i).get("db"))) &&
					(infoTmp.get(i).get("cd").equals(link))
				)
			{
				res = infoTmp.get(i).get("cr");
				crAmountTmp = infoTmp.get(i).get("f1");
			}
		}
		return res;
	}

	private String FindCrAcc(String id, String link, String sd) {
		String res = "";
		String user = "2935";

		infoTmp= OracleDBManager.getInstance().getTransLoadTmpList(user); 
		for (int i=0;i<infoTmp.size();i++){
			if (!id.equals(infoTmp.get(i).get("id")) && 
				(!link.trim().equals("C000000000")) &&
				(sd.trim().equals(infoTmp.get(i).get("cr"))) &&
				(infoTmp.get(i).get("cd").equals(link))
			){
				res = infoTmp.get(i).get("db");
				dbAmountTmp = infoTmp.get(i).get("f1");
			}
		}
		
		return res;
	}
	
	
	
	

	private int getCntCnv(String str){
		int CntCnv=0;
		int pos = str.indexOf(":");
		if (pos!=-1){
			str=str.substring(pos+1, str.length());
			CntCnv = Integer.parseInt(str);
		}
		return CntCnv;
	}
	
	private void GetDefPaym(int i, String b1, String b2) {
		
		
	}

	
}