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
public class TransPreLoadAction {

	final static Log log = LogFactory.getLog(TransPreLoadAction.class);

	private String transId;
	
	
	public String getTransId() {
		return transId;
	}

	public void setTransId(String transId) {
		this.transId = transId;
	}

	public Boolean getSuccess() {
        return true;
    }
	
	@Action("trans-pre-load")
	public String TransPreLoadExecute(){
		String B1="";
		String B2="";
		
		System.out.println(transId);
		String row[]  = transId.split(",");
		
		for (int i=0;i<row.length;i++){//start cycle for
			
			String rd = "RD000057";
			String rds = rd.substring(0,2);
			
			if (rds.equals("RD") || rds.equals("LN")){
				//FillMemory ???
				String dataSource = "FILE";
				String p_doc_kind = "70"; //defaul params
				GetDefPaym( 70, B1, B2);
				String p_shifr = B1;
				String p_pack = B2;
				
				int p_origin = 1500;//OpenWay
			    int p_run_operation = 0;
			    int p_pack_mode = 0;
			    int  p_oper = 3869;//id oper
			    String p_ground = "Выдача наличных в банкомате";
			    int p_make_carry_from_payment = 1;        
			      
			      //*initialization data *//
			   String SD = "40802810109090056203";
			   String SC = "20208810401020000020";
			   String LINK ="C000000000";
			   String TR_CODE ="A1ATvc";
			   String FILE_DATE="20140115";
			   String DebSum ="000000000050000"; 
			   String CredSum ="0000";

			   String buf = "0";
			   //   pz:= POS( ':',buf);
				
				
				
				
			}
			
		}//end cycle for
		
		return "success";
    }

	private void GetDefPaym(int i, String b1, String b2) {
	/*	col:=FindSGColByName('doc_kind',sgDef);
	row  := sgDef.Cols[Col].IndexOf( IntToStr(Doc_Kind) );
	shifr:= GetDataSGByColName(row,'shifr',sgDef,'');
	pack := GetDataSGByColName(row,'pack', sgDef,'');
		*/
	}

	
}