package ru.prbb.arm.hr.action.test;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.stereotype.Component;

import ru.prbb.util.OracleDBManager;

import java.io.IOException;
import java.net.Authenticator;
import java.net.PasswordAuthentication;
import java.util.List;
import java.util.Map;

/**
 * @author denis
 */
@Component
@Result(type = "json")
public class TestAction {

	final static Log log = LogFactory.getLog(TestAction.class);
	
    private List<Map<String, String>> params;
    
    private List<Map<String, String>> spec;
    
    private String id;
    
    private String message;
    
    private String sexFormValue;
    
    private String salaryFrom;
    
    private String district;
    
    
    public String getDistrict() {
		return district;
	}

	public void setDistrict(String district) {
		this.district = district;
	}

	public String getSalaryFrom() {
		return salaryFrom;
	}

	public void setSalaryFrom(String salaryFrom) {
		this.salaryFrom = salaryFrom;
	}

	public String getSalaryTo() {
		return salaryTo;
	}

	public void setSalaryTo(String salaryTo) {
		this.salaryTo = salaryTo;
	}

	public String getAgeFrom() {
		return ageFrom;
	}

	public void setAgeFrom(String ageFrom) {
		this.ageFrom = ageFrom;
	}

	public String getAgeTo() {
		return ageTo;
	}

	public void setAgeTo(String ageTo) {
		this.ageTo = ageTo;
	}

	private String salaryTo;
    
    private String ageFrom;
    
    private String ageTo;
    
    public String getSexFormValue() {
		return sexFormValue;
	}

	public void setSexFormValue(String sexFormValue) {
		this.sexFormValue = sexFormValue;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	private int sex;
    private String FIO;
    
    private String vacancyFiltr;
    
    private String vacancyBank;
    
    public String getVacancyBank() {
		return vacancyBank;
	}

	public void setVacancyBank(String vacancyBank) {
		this.vacancyBank = vacancyBank;
	}

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

    @Action("test")
    public String execute(){
    	int face_id=0;
    	
    	//String district_id = OracleDBManager.getInstance().getIdByDistrict(district);
		String district_id="";
    	//for prod
    	/*System.setProperty("proxySet", "true");
    	System.setProperty("http.proxyHost", "172.16.17.23");
		System.setProperty("http.proxyPort", "3128");*/
    	
   	
    	/*System.setProperty("proxySet", "true");
    	System.setProperty("http.proxyHost", "172.16.17.100");
		System.setProperty("http.proxyPort", "8080");
		System.setProperty("http.proxyUser", "dgluhov");
		System.setProperty("http.proxyPassword", "Samsung321");*/
    	
    	System.setProperty("proxySet", "false");
    	System.clearProperty("http.proxyHost");
		System.clearProperty("http.proxyPort");
		String filtr = vacancyFiltr.replaceAll(" ", "+");
    	int gender = Integer.parseInt(sexFormValue);
        try {
        	System.out.println("sexFormValue="+sexFormValue);
        	log.debug("http.proxy="+System.getProperty("http.proxyHost"));
        	String url = "http://hh.ru/resumesearch/result?text={0}"+"&a="+district_id+"&"+"gen="+gender+"&salaryFrom="+salaryFrom+"&salaryTo="+salaryTo+"&ageFrom="+ageFrom+"&ageTo="+ageTo;
        	
    
        	Document doc = Jsoup.connect(String.format(url, filtr)).get();
        	
        	System.out.println(doc.baseUri());
        	//Document doc = Jsoup.connect("http://example.com").cookie("auth", "token").post();
        	Element lcell = doc.select("td.l-cell").first();
        	Element table = (Element) lcell.childNode(1);
			Element tbody = (Element) table. childNode(0);
			
			int countNodes = tbody.childNodeSize();
			message =String.valueOf(countNodes); 
			System.out.println("countNodes="+countNodes);
			//for (int i=0;i<tbody.childNodeSize();i++){
			for (int i=0;i<countNodes;i++){
				String DATEUPDATE="";
				//System.out.println("Output i="+i);
				Element tr =(Element) tbody.childNode(i);
				
				Element td  = (Element) tr.childNode(1);
				//--Last Update
				Element output_add =(Element) td.childNode(2);
				int count =output_add.childNodeSize();
				for (int c=0;c<count;c++){
					//String tag =output_add.childNode(c).nodeName();//span
					String value =output_add.childNode(c).attr("class");//output__tab m-output__date
					if (value.contentEquals("output__tab m-output__date")) {
						String tag =output_add.childNode(c).outerHtml();
						DATEUPDATE=tag.substring(tag.indexOf(">")+1, tag.indexOf("</"));
						//System.out.println("output_add : " + dateUpdate);
					}
					
					
				}
				
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
						"",
						DATEUPDATE,
						vacancyBank,
						district
				);
				
				
				parseAddInfo(HREF,face_id);
				
				
			}
			
			
					
		} catch (IOException e) {
			e.printStackTrace();
		}
        
        return "success";
    }

	private void parseAddInfo(String href,int face_id) {
		
		Document doc;
		try {
			doc = Jsoup.connect("http://hh.ru"+href).get();
			Element personInfo = doc.select("body.l-ambient").first();
			
			Element rowContent =(Element) personInfo.childNode(4);//g-row m-row_content
			Element resume =(Element) rowContent.childNode(2);//m-colspan3 resume
			
			/*Element inLineaddItemTag =(Element) resume.childNode(0);
			Element inLineaddItemTag1=(Element) inLineaddItemTag.childNode(1);//resume_main_block_main
			Element inLineaddItemTag2=(Element) inLineaddItemTag1.childNode(0);
			Element inLineaddItemTag3=(Element) inLineaddItemTag2.childNode(0);//resume_inlinelist
			System.out.println("inLineaddItemTag3="+inLineaddItemTag3);
			Element inLineaddItemTag4=(Element) inLineaddItemTag3.childNode(3);//resume_inlinelist
			*/
			
			Element educationtag =(Element) resume.childNode(3);//educationtag
			String valueTag = resume.childNode(3).attr("class");//
			System.out.println("valueTag="+valueTag);
			if (valueTag.contentEquals("resume-block")) {

			if (educationtag.childNodeSize()>0){

				
			if 	(educationtag.childNode(1).childNodeSize()>1) { 
			Element educationtag1 =(Element) educationtag.childNode(1).childNode(0);//educationtag1
			String periodEduTag = educationtag1.childNode(0).childNode(0).outerHtml();
			String periodEdu = periodEduTag.substring(periodEduTag.indexOf(">")+1, periodEduTag.indexOf("</"));
			String nameOrgEduTag = educationtag1.childNode(0).childNode(1).childNode(0).outerHtml();
			String nameOrgEdu=nameOrgEduTag.substring(nameOrgEduTag.indexOf(">")+1, nameOrgEduTag.indexOf("</"));
			
			if (educationtag1.childNode(0).childNodeSize()>0) {
				
			String nameEduTag = educationtag1.childNode(0).childNode(1).childNode(1).outerHtml();
			String nameEdu =nameEduTag.substring(nameEduTag.indexOf(">")+1, nameEduTag.indexOf("</")); 
			
			OracleDBManager.getInstance().insertEducation(face_id,periodEdu,nameEdu.trim(),nameOrgEdu.trim());
			}
			Element languageBlock =(Element) educationtag.childNode(2);
					
			for (int i=0;i<languageBlock.childNodeSize();i++){
				if (i>0){
				String languageTag = languageBlock.childNode(i).outerHtml();
				String language =languageTag.substring(languageTag.indexOf(">")+1, languageTag.indexOf("</")); 
				OracleDBManager.getInstance().insertLanguage(face_id,language);				
				}
			}
			}
			else {
				
				Element educationtag1 =(Element) educationtag.childNode(1).childNode(0);//educationtag1
				for (int j=0;j<educationtag1.childNodeSize();j++){
					String periodEduTag =educationtag1.childNode(j).childNode(0).outerHtml();
					String periodEdu = periodEduTag.substring(periodEduTag.indexOf(">")+1, periodEduTag.indexOf("</"));
					String nameOrgEduTag = educationtag1.childNode(j).childNode(1).childNode(0).childNode(0).outerHtml();
					String nameOrgEduTag1=nameOrgEduTag.substring(nameOrgEduTag.indexOf(">")+1, nameOrgEduTag.indexOf("</"));
					String nameOrgEdu = nameOrgEduTag1.substring(nameOrgEduTag1.indexOf(">")+1, nameOrgEduTag1.length());
					
					if (educationtag1.childNode(0).childNodeSize()>0) {
						
						String nameEduTag = educationtag1.childNode(j).childNode(1).childNode(0).childNode(1).outerHtml();
						String nameEdu =nameEduTag.substring(nameEduTag.indexOf(">")+1, nameEduTag.indexOf("</")); 
						System.out.println(nameEdu);
						OracleDBManager.getInstance().insertEducation(face_id,periodEdu,nameEdu.trim(),nameOrgEdu.trim());
						}		
				}
				
				
				
				
				Element languageBlock =(Element) educationtag.childNode(2);
				
				for (int i=0;i<languageBlock.childNodeSize();i++){
					if (i>0){
					String languageTag = languageBlock.childNode(i).outerHtml();
					String language =languageTag.substring(languageTag.indexOf(">")+1, languageTag.indexOf("</")); 
					OracleDBManager.getInstance().insertLanguage(face_id,language);				
					}
				}
			}
			
			
			
			}
		}
			//System.out.println("2222=");
			Element experienceTag =(Element) resume.childNode(2);
			//System.out.println("3333=");
			Element experienceTag1 = (Element) experienceTag.childNode(1);
			
			
			String value =experienceTag.childNode(1).attr("class");//
			//check on experience
			if (value.contentEquals("resume__experience")) {

				for (int k=0;k<experienceTag1.childNodeSize();k++){
					Element itemExperience = (Element)experienceTag1.childNode(k);
					String periodTag =itemExperience.childNode(0).outerHtml();
					String period  =periodTag.substring(periodTag.indexOf(">")+1, periodTag.indexOf("<s")); 
					System.out.println("periodTag="+period);
					
					
					Element itemOrg =(Element) itemExperience.childNode(1);
					String orgTag =itemOrg.childNode(0).outerHtml();
					String org =orgTag.substring(orgTag.indexOf(">")+1, orgTag.indexOf("</"));
					System.out.println("org="+org);
					
					Element itemName =(Element) itemExperience.childNode(2);
					String nameTag =itemName.childNode(0).outerHtml();
					String name =nameTag.substring(nameTag.indexOf(">")+1, nameTag.indexOf("</")); //fix bug
					System.out.println("name="+name);
					
					String descExperience = itemExperience.childNode(3).outerHtml();
					String desc =descExperience.substring(descExperience.indexOf(">")+1, descExperience.indexOf("</")); 
					System.out.println("desc="+desc);
					
					OracleDBManager.getInstance().insertExpirience(face_id,period,org,"","",name,desc);	
					
				}			
			
			}
			
			
			Element agetag =(Element) resume.childNode(0);//nopaddings_resume__mainblock
			
			String ageValue = agetag.childNode(0).attr("class");
			if (ageValue.contentEquals("resume__mainblock__aside")){
				Element main_block_main =(Element) agetag.childNode(1); 

				Element resume_personal = (Element) main_block_main.childNode(0); 
				Element resume_inlinelist = (Element) resume_personal.childNode(1); 
				Element resume_inlinelist_item1 = (Element) resume_inlinelist.childNode(0); 
				String resume_inlinelist_itemTag =resume_inlinelist_item1.childNode(0).childNode(0).outerHtml();
				OracleDBManager.getInstance().setAgeInfo(face_id,resume_inlinelist_itemTag);
			} else
				if (ageValue.contentEquals("resume__onsite"))
			{
				System.out.println("222");
			}
				else 
				{
					Element main_block_main =(Element) agetag.childNode(0).childNode(0).childNode(1);
					Element resume_inlinelist = (Element) main_block_main.childNode(0);
					String ageTag = resume_inlinelist.childNode(0).outerHtml();
					
					String ageName =ageTag.substring(ageTag.indexOf(">")+1, ageTag.indexOf("</")); //fix bug
					OracleDBManager.getInstance().setAgeInfo(face_id,ageName);
				}
			
			

			
			OracleDBManager.getInstance().insertAddInfo(face_id,"0");

			OracleDBManager.getInstance().insertContactInfo(face_id,"телефон","+79271466565");	

			Element skills =(Element) resume.childNode(2);
			if (skills.childNodeSize()>3){
			
			String isSkillsTag = resume.childNode(2).childNode(3).attr("class");//
			System.out.println("valueTag="+isSkillsTag);
			if (isSkillsTag.contentEquals("resume-block")) {
				Element skillsTag =(Element) resume.childNode(2).childNode(3).childNode(1);
				
				for (int k=0;k<skillsTag.childNodeSize();k++){
					String skillsLevelTag = skillsTag.childNode(k).outerHtml();
					String skillsLevel = skillsLevelTag.substring(skillsLevelTag.indexOf(">")+1, skillsLevelTag.indexOf("</"));
					//OracleDBManager.getInstance().insertSkills(face_id,skillsLevel);		
				}
				
			}			
			
			}
			
			if (resume.childNode(2).childNodeSize()>=5){
			Element aboutMeTag =(Element) resume.childNode(2).childNode(5).childNode(0).childNode(1);
			
			for (int n=0;n<aboutMeTag.childNodeSize();n++){
				String aboutLevelTag = aboutMeTag.childNode(n).outerHtml();
				if (!aboutLevelTag.startsWith("<")){
					System.out.println("ABOUT!!!="+aboutLevelTag);
//					OracleDBManager.getInstance().insertAbout(face_id,aboutLevelTag);
				}
			}
			
		
			if (resume.childNode(2).childNode(5).childNodeSize()>1)
			{
			Element recommendationTag =(Element) resume.childNode(2).childNode(5).childNode(1);
			
			for (int d=1;d<recommendationTag.childNodeSize();d++){
				Element recommendationLevelTag =(Element) recommendationTag.childNode(d);
				String recommendationOrgTag =recommendationLevelTag.childNode(0).outerHtml();
				String recommendationOrg = recommendationOrgTag.substring(recommendationOrgTag.indexOf(">")+1, recommendationOrgTag.indexOf("</")); 
				System.out.println("recommendationOrg="+recommendationOrg);
				
				String recommendationNameTag =recommendationLevelTag.childNode(1).outerHtml();
				String recommendationName = recommendationNameTag.substring(recommendationNameTag.indexOf(">")+1, recommendationNameTag.indexOf("</"));
				System.out.println("recommendationName="+recommendationName);
				
				String recommendationContactTag =recommendationLevelTag.childNode(2).outerHtml();
				String recommendationContact = recommendationContactTag.substring(recommendationContactTag.indexOf(">")+1, recommendationContactTag.indexOf("</"));
				System.out.println("recommendationContact="+recommendationContact);
			}
			}
			}

			/*if (experienceTag.childNodeSize()>1) {
				
			
			Element recomendationItemTag = (Element) experienceTag.childNode(3);
			Element recomendationItemTag1 = (Element) recomendationItemTag.childNode(0);
			String recomTag =recomendationItemTag1.childNode(1).outerHtml();
			String recom =recomTag.substring(recomTag.indexOf(">")+1, recomTag.indexOf("</")); 
			}*/
			
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
    
    
}
