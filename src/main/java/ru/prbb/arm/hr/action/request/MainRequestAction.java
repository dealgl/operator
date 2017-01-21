package ru.prbb.arm.hr.action.request;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;

import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class MainRequestAction {

	final static Log log = LogFactory.getLog(MainRequestAction.class);
	
    private List<Map<String, String>> params;
    
    private List<Map<String, String>> spec;
    
    private String id;
    
    private int sex;
    private String FIO;
    
    private String vacancyFiltr;
    
    public String getVacancyFiltr() {
		return vacancyFiltr;
	}

	public void setVacancyFiltr(String vacancyFiltr) {
		this.vacancyFiltr = vacancyFiltr;
	}

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

    @Action("main-request")
    public String getMainRequest(){
    	int face_id=0;
		//for prod
    	//System.setProperty("http.proxyHost", "172.16.2.23");
		//System.setProperty("http.proxyPort", "3128");
  /*  	System.setProperty("proxySet","false");
    	System.clearProperty("http.proxyHost");
		System.clearProperty("http.proxyPort");
        try {
			System.out.println("vacancyFiltr="+vacancyFiltr);
			Document doc = Jsoup.connect("http://hh.ru/resumesearch/result?a=1941&text="+vacancyFiltr+"&from=CLUSTER_SPECIALIZATION&pos=full_text&logic=normal&profArea=20").get(); 
        	
        	Element lcell = doc.select("td.l-cell").first();
        	Element table = (Element) lcell.childNode(1);
			Element tbody = (Element) table.childNode(0);
			
			int countNodes = tbody.childNodeSize();
			System.out.println("countNodes="+countNodes);
			//for (int i=0;i<tbody.childNodeSize();i++){
			for (int i=0;i<countNodes;i++){
				System.out.println("Output i="+i);
				Element tr =(Element) tbody.childNode(i);
				
				Element td  = (Element) tr.childNode(1);
				//-------FOT
				Element main_info =(Element) td.childNode(0);
				String FOTTAG =main_info.childNode(0).outerHtml();
				int pos =FOTTAG.indexOf(">");
				int pos1 =FOTTAG.indexOf("&"); 
				String FOT =FOTTAG.substring(FOTTAG.indexOf(">")+1,pos1);
				System.out.println("FOT : " + FOT.trim());
				//-----AGE
				Element output_age=(Element) td.childNode(1);
				String AGETAG =main_info.childNode(1).outerHtml();
				int posAgeTag1 =AGETAG.indexOf("</"); 
				String AGE =AGETAG.substring(AGETAG.indexOf(">")+1,posAgeTag1);
				System.out.println("AGE : " + AGE.trim());
				//-----GENDER
				Element output_main =(Element) td.childNode(1);
				String GENDER = output_main.childNode(0).attr("content");
				System.out.println("GENDER : " + GENDER.trim());
				//-----BIRTHDAY
				String BIRTHDAY = output_main.childNode(1).attr("content");
				System.out.println("BIRTHDAY : " + BIRTHDAY.trim());
				//-----JOBNAME
				String JOBNAME = output_main.childNode(3).childNode(0).outerHtml();
				String JOBNAMEVALUE =JOBNAME.substring(JOBNAME.indexOf(">")+1,JOBNAME.indexOf("</")); 
				System.out.println("JOBNAME : " + JOBNAMEVALUE);
				//-----HREF
				String HREF = output_main.childNode(3).childNode(0).attr("href");
				System.out.println("HREF : " + HREF);				
				//-----NAME
				String NAMETAG = output_main.childNode(4).outerHtml();
				String FULLNAME=NAMETAG.substring(NAMETAG.indexOf(">")+1, NAMETAG.indexOf("</"));  
				System.out.println("FULLNAME : " + FULLNAME.trim());
				int countOutputMainChildNode =output_main.childNodeSize(); 
				System.out.println("countOutputMainChildNode : " + countOutputMainChildNode);
				//-----EXPERIENCE
				String EXPERIENCETAG = output_main.childNode(countOutputMainChildNode-3).outerHtml();
				String EXPERIENCE=EXPERIENCETAG.substring(EXPERIENCETAG.indexOf(">")+1, EXPERIENCETAG.indexOf("</"));  
				System.out.println("EXPERIENCE : " + EXPERIENCE.trim());
				//------LASTWORKEXPERIENCE
				//String LASTWORKEXPERIENCE = output_main.childNode(countOutputMainChildNode-1).childNode(6).childNode(0).outerHtml();
				//System.out.println("LASTWORKEXPERIENCE : " + LASTWORKEXPERIENCE);
				//------LASTVACANCYEXPERIENCE
				//String LASTVACANCYEXPERIENCETAG = output_main.childNode(countOutputMainChildNode-1).childNode(0).childNode(0).outerHtml();
				//String LASTVACANCYEXPERIENCE =LASTVACANCYEXPERIENCETAG.substring(LASTVACANCYEXPERIENCETAG.indexOf(">")+1, LASTVACANCYEXPERIENCETAG.indexOf("</a")); 
				//System.out.println("LASTVACANCYEXPERIENCE : " + LASTVACANCYEXPERIENCE);
				//------LASTPERIODEXPERIENCE
				//String LASTPERIODEXPERIENCETAG = output_main.childNode(countOutputMainChildNode-1).childNode(0).childNode(2).outerHtml();
				//String LASTPERIODEXPERIENCE = LASTPERIODEXPERIENCETAG.substring(LASTPERIODEXPERIENCETAG.indexOf(">")+1, LASTPERIODEXPERIENCETAG.indexOf("</"));
				//System.out.println("LASTPERIODEXPERIENCE : " + LASTPERIODEXPERIENCE);
				
				//String CONTACT = "+79262322166";
				//String CONTACT_MAIL = "resavia78@gmail.com";
				
				if (GENDER.trim().equals("male")){
					sex =1;  
				}	else
					sex=0;
					
				
				face_id=OracleDBManager.getInstance().insertPerson(
						sex,
						FULLNAME.trim(),
						FOT.trim(),
						BIRTHDAY.trim(),
						EXPERIENCE.trim(),
						JOBNAMEVALUE,
						"",
						"",
						"",
						"",
						""
				);
				
				
				parseAddInfo(HREF,face_id);
				
				
			}
			
			
					
		} catch (IOException e) {
			e.printStackTrace();
		}*/
        
        return "success";
    }

	private void parseAddInfo(String href,int face_id) {
		
	}
    
    
}
