package ru.prbb.util;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;

import javax.sql.DataSource;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class OracleDBManager {
    private static OracleDBManager _instance = null;

    final static Log log = LogFactory.getLog(OracleDBManager.class);

    private DataSource datasource;

    public JdbcTemplate getJdbcLkkTemplate() {
        return jdbcLkkTemplate;
    }

    public void setJdbcLkkTemplate(JdbcTemplate jdbcLkkTemplate) {
        this.jdbcLkkTemplate = jdbcLkkTemplate;
    }

    private JdbcTemplate jdbcLkkTemplate;

    public JdbcTemplate getJdbc4LkkTemplate() {
        return jdbc4LkkTemplate;
    }

    public void setJdbc4LkkTemplate(JdbcTemplate jdbc4LkkTemplate) {
        this.jdbc4LkkTemplate = jdbc4LkkTemplate;
    }

    private JdbcTemplate jdbc4LkkTemplate;

    public JdbcTemplate getJdbcLkaTemplate() {
        return jdbcLkaTemplate;
    }

    public void setJdbcLkaTemplate(JdbcTemplate jdbcLkaTemplate) {
        this.jdbcLkaTemplate = jdbcLkaTemplate;
    }

    private JdbcTemplate jdbcLkaTemplate;

    private JdbcTemplate jdbcPoidemTemplate;

    public JdbcTemplate getJdbcAnalyticsTemplate() {
        return jdbcAnalyticsTemplate;
    }

    public void setJdbcAnalyticsTemplate(JdbcTemplate jdbcAnalyticsTemplate) {
        this.jdbcAnalyticsTemplate = jdbcAnalyticsTemplate;
    }

    private JdbcTemplate jdbcAnalyticsTemplate;


    private static String url;

    private static Connection connection;


    private OracleDBManager() {
    }

    public static synchronized OracleDBManager getInstance() {
        if (_instance == null)
            _instance = new OracleDBManager();
        return _instance;
    }

    public DataSource getDatasource() {
        return datasource;
    }

    public void setDatasource(DataSource datasource) {

    }


    @SuppressWarnings("unchecked")
    public String logonUser(String login, String password) {
        String outputMessage = "0";
        //url ="jdbc:sqlserver://10.64.64.126:1433;databaseName=LKK"; mdwh3
        url = "jdbc:sqlserver://10.64.64.199:1433;databaseName=LKK_PROD";
        CallableStatement proc = null;
        Statement stmt = null;
        ResultSet rs = null;
        String query = "select t.user_id as id,\n" +
                "\t   t.user_login as user_login,\n" +
                "\t   t.user_role as user_role,\n" +
                "\t   t.user_fio as user_fio,\n" +
                "\t   t.user_email\tas user_email\n" +
                " from lkk_users t\n" +
                " where t.user_login='" + login + "' and t.user_password='" + password + "'";
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, "lkk_operator", "lkk_operator");
            stmt = connection.createStatement();
            rs = stmt.executeQuery(query);

            if (rs != null) {

                while (rs.next()) {
                    RequestContextHolder.currentRequestAttributes().setAttribute("user_login", login, RequestAttributes.SCOPE_SESSION);
                    RequestContextHolder.currentRequestAttributes().setAttribute("user_role", rs.getString("user_role"), RequestAttributes.SCOPE_SESSION);
                    RequestContextHolder.currentRequestAttributes().setAttribute("user_fio", rs.getString("user_fio"), RequestAttributes.SCOPE_SESSION);
                    RequestContextHolder.currentRequestAttributes().setAttribute("user_email", rs.getString("user_email"), RequestAttributes.SCOPE_SESSION);
                    outputMessage = "1";
                }

                rs.close();
                stmt.close();
                connection.close();

            } else {
                outputMessage = "2";
                rs.close();
                stmt.close();
                connection.close();
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public int insertPerson(Integer pSex,
                            String pFio,
                            String pFot,
                            String pBirthDate,
                            String pExperience,
                            String pJobTittle,
                            String pExpirienceLast,
                            String pExpirienceVacancyLast,
                            String pExpiriencePeriodLast,
                            String pSkills,
                            String pRecommendation,
                            String dateUpdate,
                            String vacancy,
                            String district
    ) {
        int outputMessage = 0;
        url = "jdbc:oracle:thin:@172.23.114.10:1521/prod";
        CallableStatement proc = null;
        ResultSet rs = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            connection = DriverManager.getConnection(url, "HR", "HR");
            proc = connection.prepareCall("{ ? = call INS_SERVICE.insertPerson(?,?,?,?,?,?,?,?,?,?,?,?,?,?) }");
            proc.registerOutParameter(1, Types.INTEGER);//
            proc.setInt(2, pSex);//gender
            proc.setString(3, pFio);
            proc.setString(4, pFot);
            proc.setString(5, pBirthDate);
            proc.setString(6, pExperience);
            proc.setString(7, pJobTittle);
            proc.setString(8, pExpirienceLast);
            proc.setString(9, pExpirienceVacancyLast);
            proc.setString(10, pExpiriencePeriodLast);
            proc.setString(11, pSkills);
            proc.setString(12, pRecommendation);
            proc.setString(13, dateUpdate);
            proc.setString(14, vacancy);
            proc.setString(15, district);
            proc.executeQuery();

            outputMessage = proc.getInt(1);
            proc.close();
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("outputMessage=" + outputMessage);
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertLanguage(int face_id, String language) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("begin INS_SERVICE.insertLanguage(" + face_id + ",'" + language + "');end;",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertEducation(int face_id, String period, String name, String org) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("begin INS_SERVICE.insertEducation(" + face_id + ",'" + period + "','" + name + "','" + org + "');end;",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertExpirience(int face_id, String period, String company, String adress, String industry, String vacancy, String desc) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("" +
                            "begin INS_SERVICE.insertExpirience(" + face_id + ",'" + period + "','" + company + "','" + adress + "'," +
                            "'" + industry + "'," +
                            "'" + vacancy + "'," +
                            "'" + desc + "');end;",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertAddInfo(int face_id, String autoCall) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("" +
                            "begin INS_SERVICE.insertAddInfo(" + face_id + ",'Готов к командировкам','не более часа',0," +
                            "''," +
                            "''," +
                            "'РФ');end;",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertContactInfo(int face_id, String name, String value) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("" +
                            "begin INS_SERVICE.insertContact(" + face_id + ",'" + name + "','" + value + "');end;",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public String setAutoCallStatus(String face_id, String value) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_addinfo set face_addinfo_autocall=" + value + " where face_addinfo_person_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }


        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setAutoCallStatusOnExt(String face_id, String value) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person_ext set face_autocall=" + value + " where face_person_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }


        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public String setAutoCallStatusExt(String face_id, String value) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person_ext set face_autocall=" + value + " where face_person_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }


        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public String setSuccessStatusResume(String face_id, String date, String time, String district, String address) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person set face_status_resume=1 " +
                            "," + " face_date_meeting=" + "'" + date + "'" +
                            "," + " face_time_meeting=" + "'" + time + "'" +
                            "," + " face_district_meeting=" + "'" + district + "'" +
                            "," + " face_address_meeting=" + "'" + address + "'" +
                            " where face_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setDeclineStatusResume(String face_id, String comment) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person set face_status_resume=2 " +
                            "," + " face_status_comment=" + "'" + comment + "'" +
                            " where face_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setReserveStatusResume(String face_id, String comment) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person set face_status_resume=3 " +
                            "," + " face_status_comment=" + "'" + comment + "'" +
                            " where face_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getSectionList() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select SECTION_ID,SECTION_NAME FROM SECTION",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("SECTION_ID"));
                        map.put("section", rs.getString("SECTION_NAME"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getSpecializationList() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select SPEC_ID,SPEC_NAME FROM specialization",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("SPEC_ID"));
                        map.put("name", rs.getString("SPEC_NAME"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getSpecializationListById(String id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select SPEC_ID,SPEC_NAME FROM specialization where SPEC_SECTION_ID=" + id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("SPEC_ID"));
                        map.put("name", rs.getString("SPEC_NAME"));
                        return map;
                    }
                });
        return info;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeList() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from get_resume_list",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_ID"));
                        map.put("fio", rs.getString("FACE_FIO"));
                        map.put("job", rs.getString("FACE_JOBTITLE"));
                        map.put("birth_date", rs.getString("FACE_BIRTHDAY"));
                        map.put("autocall", rs.getString("FACE_AUTOCALL"));
                        map.put("status", rs.getString("FACE_STATUS_RESUME"));
                        map.put("comment", rs.getString("FACE_STATUS_COMMENT"));
                        map.put("date", setFormatDate(rs.getString("FACE_DATE_MEETING")));
                        map.put("address", rs.getString("FACE_ADDRESS_MEETING"));
                        map.put("date_update", rs.getString("FACE_DATE_UPDATE"));
                        //map.put("district",rs.getString("FACE_DISTRICT_MEETING"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeListAutoCall() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from get_resume_list where face_autocall=1",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_ID"));
                        map.put("fio", rs.getString("FACE_FIO"));
                        return map;
                    }
                });
        return info;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeExtListAutoCall() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_person_ext where face_autocall=1",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_PERSON_ID"));
                        map.put("fio", rs.getString("FIO"));
                        return map;
                    }
                });
        return info;
    }


    private String setFormatDate(String string) {
        String res = "";
        if (string == null || string.equals("")) {
            res = string;
        } else
            res = string.substring(0, 10);
        return res;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeListByFiltr(String vacancy) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from get_resume_list where FACE_VACANCY_BANK like " + "'" + vacancy + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_ID"));
                        map.put("fio", rs.getString("FACE_FIO"));
                        map.put("job", rs.getString("FACE_JOBTITLE"));
                        map.put("birth_date", rs.getString("FACE_BIRTHDAY"));
                        map.put("autocall", rs.getString("FACE_AUTOCALL"));
                        map.put("status", rs.getString("FACE_STATUS_RESUME"));
                        map.put("date", setFormatDate(rs.getString("FACE_DATE_MEETING")));
                        map.put("address", rs.getString("FACE_ADDRESS_MEETING"));
                        map.put("vacancy", rs.getString("FACE_VACANCY_BANK"));
                        map.put("comment", rs.getString("FACE_STATUS_COMMENT"));
                        map.put("date_update", rs.getString("FACE_DATE_UPDATE"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeListByFiltrCity(String city) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from get_resume_list where FACE_DISTRICT_MEETING like " + "'" + city + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_ID"));
                        map.put("fio", rs.getString("FACE_FIO"));
                        map.put("job", rs.getString("FACE_JOBTITLE"));
                        map.put("birth_date", rs.getString("FACE_BIRTHDAY"));
                        map.put("autocall", rs.getString("FACE_AUTOCALL"));
                        map.put("status", rs.getString("FACE_STATUS_RESUME"));
                        map.put("date", setFormatDate(rs.getString("FACE_DATE_MEETING")));
                        map.put("address", rs.getString("FACE_ADDRESS_MEETING"));
                        map.put("vacancy", rs.getString("FACE_VACANCY_BANK"));
                        map.put("comment", rs.getString("FACE_STATUS_COMMENT"));
                        map.put("date_update", rs.getString("FACE_DATE_UPDATE"));
                        return map;
                    }
                });
        return info;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeInfoById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from get_resume_list where face_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("face_id", rs.getString("FACE_ID"));
                        map.put("face_fio", rs.getString("FACE_FIO"));
                        map.put("face_job", rs.getString("FACE_JOBTITLE"));
                        map.put("face_fot", rs.getString("FACE_FOT"));
                        map.put("face_age", setFormatAge(rs.getString("FACE_AGE")));
                        map.put("face_birth_date", rs.getString("FACE_BIRTHDAY"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeAddInfoById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select face_addinfo_autocall,face_addinfo_inline,face_addinfo_routetime,face_addinfo_citizenship from face_addinfo where FACE_ADDINFO_PERSON_ID=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("autoCall", rs.getString("face_addinfo_autocall"));
                        map.put("inLine", rs.getString("face_addinfo_inline"));
                        map.put("routetime", rs.getString("face_addinfo_routetime"));
                        map.put("citizenship", rs.getString("face_addinfo_citizenship"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getEducationById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_education where face_education_person_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_EDUCATION_ID"));
                        map.put("period", rs.getString("FACE_EDUCATION_PERIOD"));
                        map.put("name", rs.getString("FACE_EDUCATION_NAME"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getLanguageById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_languages where face_languages_person_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_LANGUAGES_ID"));
                        map.put("name", replaceSymbol(rs.getString("FACE_LANGUAGES_NAME")));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getExperienceById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_expirience where face_expirience_person_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_EXPIRIENCE_ID"));
                        map.put("period", replaceSymbol(rs.getString("FACE_EXPIRIENCE_PERIOD")));
                        map.put("company", rs.getString("FACE_EXPIRIENCE_COMPANY"));
                        map.put("vacancy", rs.getString("FACE_EXPIRIENCE_VACANCY"));
                        map.put("descr", rs.getString("FACE_EXPIRIENCE_DESCR"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getStatusResumeById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select face_id,face_status_resume,face_status_comment from face_person where face_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("face_id"));
                        map.put("status", rs.getString("face_status_resume"));
                        map.put("comment", rs.getString("face_status_comment"));
                        return map;
                    }
                });
        return info;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getPhoneById(String face_id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_contacts where face_contacts_person_id=" + face_id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_CONTACTS_ID"));
                        map.put("name", rs.getString("FACE_CONTACTS_NAME"));
                        map.put("value", rs.getString("FACE_CONTACTS_VALUE"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public String deleteResume(String name) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("delete from face_person where face_id="
                    + name, String.class);

        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String deleteResumeExt(String name) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("delete from face_person_ext where face_person_id="
                    + name, String.class);

        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public String insertExtResume(String direction,
                                  String fio,
                                  String recruter,
                                  String phone,
                                  String skype,
                                  String mark,
                                  String url,
                                  String district,
                                  String date_colloquy
    ) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("insert into face_person_ext " +
                            "(direction,fio,recruter,phone,skype,mark,url,district,date_colloquy)" +
                            " values " +
                            " (" + "'" + direction + "'" + ","
                            + "'" + fio + "'" + ","
                            + "'" + recruter + "'" + ","
                            + "'" + phone + "'" + ","
                            + "'" + skype + "'" + ","
                            + "'" + mark + "'" + ","
                            + "'" + url + "'" + ","
                            + "'" + district + "'" + ","
                            + "'" + date_colloquy + "'" + ")",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getResumeExtList() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select * from face_person_ext",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("FACE_PERSON_ID"));
                        map.put("fio", rs.getString("FIO"));
                        map.put("direction", rs.getString("DIRECTION"));
                        map.put("recruter", rs.getString("RECRUTER"));
                        map.put("phone", rs.getString("PHONE"));
                        map.put("skype", rs.getString("SKYPE"));
                        map.put("mark", rs.getString("MARK"));
                        //map.put("url",setFormatDate(rs.getString("FACE_DATE_MEETING")));
                        map.put("url", rs.getString("URL"));
                        map.put("district", rs.getString("DISTRICT"));
                        map.put("date_colloquy", rs.getString("DATE_COLLOQUY"));
                        map.put("autocall", rs.getString("FACE_AUTOCALL"));
                        //map.put("district",rs.getString("FACE_DISTRICT_MEETING"));
                        return map;
                    }
                });
        return info;
    }


    private String replaceSymbol(String str) {
        String res = "";
        res = str.replace("?", "-");
        return res;
    }

    @SuppressWarnings("unchecked")
    public String setAgeInfo(int face_id, String age) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update face_person set face_age=" + "'" + age + "'" +
                            " where face_id=" + face_id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getTransLoadTmpList(String user) {
        user = "13869";
        user = getRsIdByUser(user);
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select ID,FILENAME,RD_FIELD,DB_FIELD,CR_FIELD,NONAME1_FIELD,NONAME2_FIELD," +
                        "DESCRIPTION,C_FIELD,NONAME3_FIELD,NONAME4_FIELD,DATETIME " +
                        "from trans_load_tmp where portal_user=" + user,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();

                        map.put("id", rs.getString("ID"));
                        map.put("file", rs.getString("FILENAME"));
                        map.put("rd", rs.getString("RD_FIELD"));
                        map.put("db", rs.getString("DB_FIELD"));
                        map.put("cr", rs.getString("CR_FIELD"));
                        map.put("f1", rs.getString("NONAME1_FIELD"));
                        map.put("f2", rs.getString("NONAME2_FIELD"));
                        map.put("desc", rs.getString("DESCRIPTION"));
                        map.put("cd", rs.getString("C_FIELD"));
                        map.put("date", rs.getString("DATETIME"));
                        map.put("f3", rs.getString("NONAME3_FIELD"));
                        map.put("f4", rs.getString("NONAME4_FIELD"));

                        return map;
                    }
                });
        return info;
    }

    private String getSummFromFloat(String buf) {
        String res = "0";
        if (!buf.equals("0") && (!buf.equals("ОВП23"))) {
            Float par = Float.parseFloat(buf);
            Float result = par / 100;
            res = result.toString();
        }
        return res;
    }

    private String getNullSummFromFloat(String buf) {
        String res = "0";
        if (buf.equals("0000")) {
            res = "0";
        } else {
            Float par = Float.parseFloat(buf);
            Float result = par / 100;
            res = result.toString();
        }
        return res;
    }

    @SuppressWarnings("unchecked")
    public String insertTransLoadRS(/*String f_id,*/
                                    String dr_number,
                                    String cr_number,
                                    String dr_amount,
                                    String cr_amount,
                                    String comments,
                                    String dr_name,
                                    String s_inn,
                                    String s_kpp,
                                    String s_bik,
                                    String cr_name,
                                    String t_inn,
                                    String t_kpp,
                                    String t_bik,
                                    String date,
                                    String doc_kind,
                                    String shifr,
                                    String pack,
                                    String v6_id,
                                    String result,
                                    String link
    ) {
        String outputMessage = "";
//		String res = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("v_user_id", RequestAttributes.SCOPE_SESSION));
//		int user_id = Integer.parseInt(res);
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("insert into trans_load_rs (" +
                            "DR_NUMBER," +
                            "CR_NUMBER," +
                            "DR_AMOUNT," +
                            "CR_AMOUNT," +
                            "COMMENTS," +
                            "DR_NAME," +
                            "S_INN," +
                            "S_KPP," +
                            "S_BIK," +
                            "CR_NAME," +
                            "T_INN," +
                            "T_KPP," +
                            "T_BIK," +
                            "DATE_FILE," +
                            "DOC_KIND," +
                            "SHIFR," +
                            "PACK," +
                            "V6_ID," +
                            "RESULT," +
                            "LINK" +
                            ") values (" + "'" + dr_number + "'" + ","
                            + "'" + cr_number + "'" + ","
                            + "'" + dr_amount + "'" + ","
                            + "'" + cr_amount + "'" + ","
                            + "'" + comments + "'" + ","
                            + "'" + dr_name + "'" + ","
                            + "'" + s_inn + "'" + ","
                            + "'" + s_kpp + "'" + ","
                            + "'" + s_bik + "'" + ","
                            + "'" + cr_name + "'" + ","
                            + "'" + t_inn + "'" + ","
                            + "'" + t_kpp + "'" + ","
                            + "'" + t_bik + "'" + ","
                            + "'" + date + "'" + ","
                            + "'" + doc_kind + "'" + ","
                            + "'" + shifr + "'" + ","
                            + "'" + pack + "'" + ","
                            + "'" + v6_id + "'" + ","
                            + "'" + result + "'" + ","
                            + "'" + link + "'" + ")",

                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String deleteDoublesPreLoad() {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject(
                    "delete from trans_load_rs where link<>'C000000000' and trans_load_rs.f_id not in " +
                            "(select max(f_id) from trans_load_rs group by trans_load_rs.link)"
                    ,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getTransById(String id) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select ID,FILENAME,RD_FIELD,DB_FIELD,CR_FIELD,NONAME1_FIELD,NONAME2_FIELD," +
                        "DESCRIPTION,C_FIELD,NONAME3_FIELD,NONAME4_FIELD,DATETIME " +
                        "from trans_load_tmp where ID=" + id,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();

                        map.put("id", rs.getString("ID"));
                        map.put("file", rs.getString("FILENAME"));
                        map.put("rd", rs.getString("RD_FIELD"));
                        map.put("db", rs.getString("DB_FIELD"));
                        map.put("cr", rs.getString("CR_FIELD"));
                        map.put("f1", rs.getString("NONAME1_FIELD"));
                        map.put("f2", rs.getString("NONAME2_FIELD"));
                        map.put("desc", rs.getString("DESCRIPTION"));
                        map.put("cd", rs.getString("C_FIELD"));
                        map.put("date", rs.getString("DATETIME"));
                        map.put("f3", rs.getString("NONAME3_FIELD"));
                        map.put("f4", rs.getString("NONAME4_FIELD"));

                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getTransLoadRSList(String user) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcPoidemTemplate.query(
                "select F_ID," +
                        "DR_NUMBER," +
                        "CR_NUMBER," +
                        "DR_AMOUNT," +
                        "CR_AMOUNT," +
                        "COMMENTS," +
                        "DATE_FILE," +
                        "DOC_KIND," +
                        "SHIFR," +
                        "PACK," +
                        "V6_ID," +
                        "RESULT " +
                        "from trans_load_rs ",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();

                        map.put("f_id", rs.getString("F_ID"));
                        map.put("dr_number", rs.getString("DR_NUMBER"));
                        map.put("cr_number", rs.getString("CR_NUMBER"));
                        map.put("dr_amount", getSummFromFloat(rs.getString("DR_AMOUNT")));
                        map.put("cr_amount", getNullSummFromFloat(rs.getString("CR_AMOUNT")));
                        map.put("comments", rs.getString("COMMENTS"));
                        map.put("date", rs.getString("DATE_FILE"));
                        map.put("doc_kind", rs.getString("DOC_KIND"));
                        map.put("shifr", rs.getString("SHIFR"));
                        map.put("pack", rs.getString("PACK"));
                        map.put("v6_id", rs.getString("V6_ID"));
                        map.put("result", rs.getString("RESULT"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public String insertTransLoadTmpList(String fname,
                                         String rd,
                                         String db,
                                         String cr,
                                         String f1,
                                         String f2,
                                         String desc,
                                         String cField,
                                         String f3,
                                         String datePost
    ) {
        String outputMessage = "";
        //String res = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("v_user_id", RequestAttributes.SCOPE_SESSION));
        String res = "13869";
        int user_id = Integer.parseInt(getRsIdByUser(res));
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("insert into trans_load_tmp (FILENAME,RD_FIELD,DB_FIELD,CR_FIELD" +
                            ",NONAME1_FIELD,NONAME2_FIELD,DESCRIPTION,C_FIELD,NONAME3_FIELD,NONAME4_FIELD," +
                            "DATETIME,PORTAL_USER) values (" + "'" + fname + "'" + ","
                            + "'" + rd + "'" + ","
                            + "'" + db + "'" + ","
                            + "'" + cr + "'" + ","
                            + "'" + f1 + "'" + ","
                            + "'" + f2 + "'" + ","
                            + "'" + desc + "'" + ","
                            + "'" + cField + "'" + ","
                            + "'" + f3 + "'" + ","
                            + '0' + ","
                            + "'" + datePost + "'" + ","
                            + user_id + ")",


                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    private String getRsIdByUser(String user) {
        String res = "0";
        if (user.equals("3419")) { //GEB Калядина
            res = "7018";
        }
        if (user.equals("1501")) {//VUZ Мелекина
            res = "2351";
        }
        if (user.equals("5295")) {//VUZ Шаньгина
            res = "7175";
        }
        if (user.equals("13869")) {//VUZ Глухов
            res = "2935";
        }

        return res;
    }

    @SuppressWarnings("unchecked")
    public String updateFourField(String id, String f) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update trans_load_tmp " +
                            "set noname4_field=" + "'" + f + "'" +
                            " where id=" + id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public int importTransToRS(Integer f_id,
                               String dr_number,
                               String cr_number,
                               String dr_amount,
                               String cr_amount,
                               String comments,
                               String dr_name,
                               String s_inn,
                               String s_kpp,
                               String s_bik,
                               String cr_name,
                               String t_inn,
                               String t_kpp,
                               String t_bik,
                               String date,
                               String doc_kind,
                               String shifr,
                               String pack,
                               String v6_id,
                               String result
    ) {
        int outputMessage = 0;
        url = "jdbc:oracle:thin:@172.23.114.10:1521/prod";
        CallableStatement proc = null;
        ResultSet rs = null;
        try {
            Class.forName("oracle.jdbc.driver.OracleDriver");
            connection = DriverManager.getConnection(url, "HR", "HR");
            proc = connection.prepareCall("{ ? = call INS_SERVICE.insertPerson(?,?,?,?,?,?,?,?,?,?,?,?,?,?) }");
            proc.registerOutParameter(1, Types.INTEGER);//
            proc.executeQuery();
            outputMessage = proc.getInt(1);
            proc.close();
            connection.close();
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        System.out.println("outputMessage=" + outputMessage);
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String insertSettlementData(String id, String f) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbcPoidemTemplate.queryForObject("update trans_load_tmp " +
                            "set noname4_field=" + "'" + f + "'" +
                            " where id=" + id,
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    private String setFormatAge(String string) {
        String res = "";
        if (string == null || string.equals("")) {
            res = string;
        } else
            res = string.replace("&nbsp;", " ");
        return res;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> findClientBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcAnalyticsTemplate.query(
                //info = this.jdbc4LkkTemplate.query (

				/*"select cl.full_name as fio,\n" +
                        " cl.code as client_id, \n" +
						" convert(nvarchar(10),cl.birth_date,23) as birth_date , \n" +
								" p.Seria+''+p.Number as passport ,\n" +
								"      cl.SNILS as snils,\n" +
								" clients.login_email as email,\n" +
								" clients.login_phone as phone,\n" +
								" clients.reg_flag as regflag, " +
								" clients.lkk_old_user as old_user, "+
								" m.Stat as status,\n" +
								" w.Contract_Number as doc_number,\n" +
								" w.Contract_Type as doc_type,\n" +
								" acc.failed_auth_attempts as is_block_user,\n" +
								" doc.check_scan as doc_check\n" +
								" from mdwh4.DWH.[npf].[person] cl "+
								" inner join UT_Rep_NPF_01_Contract_Mtrlz m on cl.SNILS=m.SNILS \n" +
								" inner join UT_1cDWH_37_NPF_Passport_ST1 p on  cl.SNILS=p.SNILS \n" +
								" inner join Web_Contract w on w.SNILS=cl.SNILS \n" +
								" inner join mdwh4.LKK.dbo.clients clients on cl.SNILS=clients.SNILS \n" +
								" inner join mdwh4.LKK.dbo.accounts acc on clients.account_id=acc.id \n" +
								" left  join mdwh4.LKK.dbo.doc_upload doc on clients.id=doc.client_id \n" +
								" where cl.snils='"+snils+"' "+
								" union \n" + */
                " select top 1 cl.last_name+' '+cl.first_name+' '+cl.middle_name as fio,\n" +
                        "null as client_id,\n" +
                        "cl.birthday as birth_date, \n" +
                        "CONCAT(cl.passport_series,cl.passport_number) as passport,\n" +
                        "cl.snils as snils,\n" +
                        "cl.login_email as email, \n" +
                        "cl.login_phone as phone, \n" +
                        "cl.reg_flag as regflag,  \n" +
                        "cl.lkk_old_user as old_user,\n" +
                        "wc.Contract_Status as status, \n" +
                        "wc.Contract_Number as doc_number, \n" +
                        "wc.Contract_Type as doc_type, \n" +
                        "wc.Contract_Date_Begin as date_begin, \n" +
                        "acc.failed_auth_attempts as is_block_user ,\n" +
                        "doc.check_scan as doc_check \n" +
                        "from mdwh4.LKK_PROD.dbo.clients cl \n" +
                        "inner join mdwh4.LKK_PROD.dbo.accounts acc on cl.account_id=acc.id  \n" +
                        "left  join mdwh4.LKK_PROD.dbo.doc_upload doc on cl.id=doc.client_id  \n" +
                        " left join Web_Contract wc on wc.SNILS=cl.snils " +
                        " where cl.snils='" + snils + "' order by date_begin desc"
                ,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("client_id", rs.getString("client_id"));
                        map.put("fio", rs.getString("fio"));
                        map.put("snils", rs.getString("snils"));
                        map.put("doc_number", rs.getString("doc_number"));
                        map.put("doc_type", rs.getString("doc_type"));
                        map.put("status", rs.getString("status"));
                        map.put("regflag", rs.getString("regflag"));
                        map.put("old_user", rs.getString("old_user"));
                        map.put("birth_date", rs.getString("birth_date"));
                        map.put("passport", rs.getString("passport"));
                        map.put("email", rs.getString("email"));
                        map.put("phone", rs.getString("phone"));
                        map.put("is_block_user", rs.getString("is_block_user"));
                        map.put("doc_check", rs.getString("doc_check"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public String findEmailBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select email as email from security.clients " +
                        " where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("email", rs.getString("email"));
                        return map;
                    }
                });
        return info.get(0).get("email");
    }

    @SuppressWarnings("unchecked")
    public String blockClient(String snils) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update accounts\n" +
                            "set failed_auth_attempts=10\n" +
                            "where id in (select account_id from clients where snils='" + snils + "')",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public String unregClient(String snils) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update clients set reg_flag=0 where snils='" + snils + "'",
                    String.class);
			/*http://jira.futurenpf.ru/browse/NEWLKK-106
			outputMessage = (String)jdbc4LkkTemplate.queryForObject("delete from clients where snils='"+snils+"'",
					String.class);
*/
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String unlockClient(String snils) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update accounts\n" +
                            "set failed_auth_attempts=0\n" +
                            "where id in (select account_id from clients where snils='" + snils + "')",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    public byte[] getClientScan(int id) {
        List<byte[]> info = new ArrayList<byte[]>();
        info = this.jdbc4LkkTemplate.query(
                "SELECT pass_scan as image from doc_upload where client_id=1320",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        return rs.getBytes("image");
                    }
                });
        return info.size() > 0 ? info.get(0) : null;
    }

    @SuppressWarnings("unchecked")
    public String setMatchClient(String snils) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update security.clients " +
                            "set match='1'" +
                            " where id=" + snils + "",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setMatchDoc(String clientId) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update doc_upload  " +
                            "set check_scan='1'" +
                            " where client_id=(select id from LKK_PROD.[dbo].[clients] c where c.snils='" + clientId + "')",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setUnMatchDoc(String clientId) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update doc_upload  " +
                            "set check_scan='2'" +
                            " where client_id=(select id from LKK_PROD.[dbo].[clients] c where c.snils='" + clientId + "')",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> findMessagesBySnils(String clientId) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select id as id, direction as type_message, is_read as is_read, is_answered as is_answered, client_id as client_id,date_posted as date_posted, body as body " +
                        "from messages where client_id=" +
                        "(select id from clients where snils='" + clientId + "') order by date_posted desc",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("id"));
                        map.put("client_id", rs.getString("client_id"));
                        map.put("date_posted", rs.getString("date_posted"));
                        map.put("type_message", rs.getString("type_message"));
                        map.put("body", rs.getString("body"));
                        String res1 = rs.getString("is_read");
                        if (String.valueOf(res1).equals("1")) {
                            map.put("status_message", "Просмотрено");
                        } else
                            map.put("status_message", "Создано");
                        String res2 = rs.getString("is_answered");
                        if (String.valueOf(res2).equals("1")) {
                            map.put("status_message", "Отвечено");
                        } else
                            map.put("status_message", "Создано");
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public String newMessage(String message, String client_id) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject(" INSERT INTO messages(\n" +
                            "             date_posted, body, client_id, employee_id,is_read,is_answered,direction)\n" +
                            "    VALUES ( getdate(),'" + message + "'," + getClientIdBySnils(client_id) + "," + getUserIdByFio() + ",0,0,2)",
                    String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String updateInputMessage(String message_id) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update messages set is_read=1,is_answered=1 where id=" + message_id, String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> authUserByCredentials(String login, String pwd) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select t.user_id as id,\n" +
                        "\t   t.user_login as user_login,\n" +
                        "\t   t.user_role as user_role,\n" +
                        "\t   t.user_fio as user_fio,\n" +
                        "\t   t.user_email\tas user_email\n" +
                        " from lkk_users t\n" +
                        " where t.user_login='" + login + "' and t.user_password='" + pwd + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("id"));
                        map.put("user_role", rs.getString("user_role"));
                        map.put("user_fio", rs.getString("user_fio"));
                        map.put("user_email", rs.getString("user_email"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getAllNotAnsweredMessages() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select date_posted,\n" +
                        "\t   (select last_name+' '+first_name+' '+middle_name from clients where id=client_id) as fio,\n" +
                        "\t   (select snils from clients where id=client_id) as snils,\n" +
                        "\t   body as text\n" +
                        "from [dbo].[messages] m\n" +
                        "where m.direction<>2 and m.is_answered=0\n" +
                        "and m.client_id in (select id from clients)\n" +
                        "order by date_posted desc",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("date", rs.getString("date_posted"));
                        map.put("fio", rs.getString("fio"));
                        map.put("snils", rs.getString("snils"));
                        map.put("text", rs.getString("text"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getAllNotCheckedClients() {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select cl.id as clientId, cl.snils as snils, last_name+' '+first_name+' '+middle_name as fio, cl.birthday as birthday," +
                        "cl.reg_flag as reg_flag,ac.created as created, " +
                        "doc.check_scan as doc_check, \n" +
                        "cl.passport_series+cl.passport_number as passport " +
                        "from doc_upload doc\n" +
                        "inner join clients cl on doc.client_id=cl.id\n" +
                        "inner join accounts ac on cl.account_id=ac.id\n" +
                        "where doc.check_scan=0\n" +
                        "order by created desc\n",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("clientId", rs.getString("clientId"));
                        map.put("snils", rs.getString("snils"));
                        map.put("fio", rs.getString("fio"));
                        map.put("birthday", rs.getString("birthday"));
                        map.put("reg_flag", rs.getString("reg_flag"));
                        map.put("passport", rs.getString("passport"));
                        map.put("doc_check", rs.getString("doc_check"));
                        map.put("created", rs.getString("created"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getAllNotCheckedClientsBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select cl.id as clientId, cl.snils as snils, last_name+' '+first_name+' '+middle_name as fio, cl.birthday as birthday," +
                        "cl.reg_flag as reg_flag,ac.created as created, " +
                        "doc.check_scan as doc_check, \n" +
                        "cl.passport_series+cl.passport_number as passport " +
                        "from doc_upload doc\n" +
                        "inner join clients cl on doc.client_id=cl.id\n" +
                        "inner join accounts ac on cl.account_id=ac.id\n" +
                        "where doc.check_scan=0 and cl.snils='" + snils + "' " +
                        " order by created desc\n",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("clientId", rs.getString("clientId"));
                        map.put("snils", rs.getString("snils"));
                        map.put("fio", rs.getString("fio"));
                        map.put("birthday", rs.getString("birthday"));
                        map.put("reg_flag", rs.getString("reg_flag"));
                        map.put("passport", rs.getString("passport"));
                        map.put("doc_check", rs.getString("doc_check"));
                        map.put("created", rs.getString("created"));
                        return map;
                    }
                });
        return info;
    }


    @SuppressWarnings("unchecked")
    public String getEmailPhoneBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select login_email from clients where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("mail", rs.getString("login_email"));
                        return map;
                    }
                });
        return info.get(0).get("mail");
    }

    @SuppressWarnings("unchecked")
    public String getPasswordBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select password from accounts where id in (select account_id from clients where snils='" + snils + "')",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("password", rs.getString("password"));
                        return map;
                    }
                });
        return info.get(0).get("password");
    }

    @SuppressWarnings("unchecked")
    public String getPhoneBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select login_phone from clients where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("phone", rs.getString("login_phone"));
                        return map;
                    }
                });
        return info.get(0).get("phone");
    }

    @SuppressWarnings("unchecked")
    public String getFioBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select last_name+' '+first_name+' '+middle_name as fio from clients where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("fio", rs.getString("fio"));
                        return map;
                    }
                });
        return info.get(0).get("fio");
    }


    @SuppressWarnings("unchecked")
    public String getClientIdBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select id from clients where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("id"));
                        return map;
                    }
                });
        return info.get(0).get("id");
    }

    @SuppressWarnings("unchecked")
    public String getUserIdByFio() {
        String fio = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("user_fio", RequestAttributes.SCOPE_SESSION)).trim();
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select user_id from lkk_users where user_fio ='" + fio + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("id", rs.getString("user_id"));
                        return map;
                    }
                });
        return info.get(0).get("id");
    }


    @SuppressWarnings("unchecked")
    public String getClientFioBySnils(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query("select last_name+' '+first_name+' '+middle_name as fio from clients where snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("fio", rs.getString("fio"));
                        return map;
                    }
                });
        return info.get(0).get("fio");
    }


    @SuppressWarnings("unchecked")
    public String smsSendClient(String snils) {
        String outputMessage = "";
        String outputMessage1 = "";
        String phone = "+" + getPhoneBySnils(snils);
        String tempPassword = ru.prbb.util.Translate.generateString();
        try {
            jdbcLkaTemplate.execute("update clients_notices_texts set " +
                    " text='Ваш временный пароль " + tempPassword + " для личного кабинета действует сутки' " +
                    " where id=109");
            outputMessage1 = putTempPassword(snils, tempPassword);
        } catch (Throwable e) {
            e.printStackTrace();
        }

        try {
            jdbcLkaTemplate.execute("insert into clients_notices (contract_id,phone,clients_notices_texts_id) values (1,'" + phone + "',109)"
            );
        } catch (Throwable e) {
            e.printStackTrace();
        }

        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String putTempPassword(String snils, String pwd) {
        String outputMessage = "";
        try {
            jdbc4LkkTemplate.execute("update accounts set password='" + pwd + "' where id in (select account_id from clients where snils='" + snils + "')");
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String generateToken(String snils) {
        String outputMessage = "";
        String tokenPart = ru.prbb.util.Translate.generateString();
        outputMessage = tokenPart.concat("-e94f-11e6-bec8-005056ab2c0a");
        try {
            jdbc4LkkTemplate.execute("insert into LKK.dbo.password_recovery(dt,credential_type,credential_value,recovery_token,expire_date,success,account_id)" +
                    " values (GETDATE(),'snils','" + snils + "','" + outputMessage + "',GETDATE()+1,0,(select account_id from clients where snils='" + snils + "'))");
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String changePassword(String newPwd) {
        String outputMessage = "";
        String fio = String.valueOf(RequestContextHolder.currentRequestAttributes().getAttribute("user_login", RequestAttributes.SCOPE_SESSION)).trim();
        try {
            jdbc4LkkTemplate.execute("update lkk_users set user_password='" + newPwd + "' where user_login='" + fio + "'");
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }

    @SuppressWarnings("unchecked")
    public String setViewStatusMessage(String message_id) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update messages set is_read=1 where client_id=" + message_id, String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }


    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getRegAttempts(String snils) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "SELECT \n" +
                        "      [created]\n" +
                        "      ,[message_code]\n" +
                        "      ,[snils]\n" +
                        "      ,[phone]\n" +
                        "      ,[email]\n" +
                        "		,[reg_check_overall_result] " +
                        "		,[reg_check_reg_message] " +

                        "      ,[last_name]+' '+[first_name]+' '+[second_name] as fio\n" +
                        "      ,CONCAT([pass_ser],[pass_num]) as pass\n" +
                        "  FROM [LKK_PROD].[dbo].[reg_log] rg\n" +
                        "  WHERE rg.snils='" + snils + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("created", rs.getString("created"));
                        map.put("message_code", rs.getString("message_code"));
                        map.put("snils", rs.getString("snils"));
                        map.put("phone", rs.getString("phone"));
                        map.put("email", rs.getString("email"));
                        map.put("fio", rs.getString("fio"));
                        map.put("pass", rs.getString("pass"));
                        map.put("reg_check_overall_result", rs.getString("reg_check_overall_result"));
                        map.put("reg_check_reg_message", rs.getString("reg_check_reg_message"));

                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getRegAttemptsByPhone(String phone) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "SELECT \n" +
                        "      [created]\n" +
                        "      ,[message_code]\n" +
                        "      ,[snils]\n" +
                        "      ,[phone]\n" +
                        "      ,[email]\n" +
                        "		,[reg_check_overall_result] " +
                        "		,[reg_check_reg_message] " +

                        "      ,[last_name]+' '+[first_name]+' '+[second_name] as fio\n" +
                        "      ,CONCAT([pass_ser],[pass_num]) as pass\n" +
                        "  FROM [LKK_PROD].[dbo].[reg_log] rg\n" +
                        "  WHERE rg.phone='" + phone + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("created", rs.getString("created"));
                        map.put("message_code", rs.getString("message_code"));
                        map.put("snils", rs.getString("snils"));
                        map.put("phone", rs.getString("phone"));
                        map.put("email", rs.getString("email"));
                        map.put("fio", rs.getString("fio"));
                        map.put("pass", rs.getString("pass"));
                        map.put("reg_check_overall_result", rs.getString("reg_check_overall_result"));
                        map.put("reg_check_reg_message", rs.getString("reg_check_reg_message"));

                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getRegAttemptsByMail(String mail) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "SELECT \n" +
                        "      [created]\n" +
                        "      ,[message_code]\n" +
                        "      ,[snils]\n" +
                        "      ,[phone]\n" +
                        "      ,[email]\n" +
                        "		,[reg_check_overall_result] " +
                        "		,[reg_check_reg_message] " +
                        "      ,[last_name]+' '+[first_name]+' '+[second_name] as fio\n" +
                        "      ,CONCAT([pass_ser],[pass_num]) as pass\n" +
                        "  FROM [LKK_PROD].[dbo].[reg_log] rg\n" +
                        "  WHERE rg.email='" + mail + "'",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("created", rs.getString("created"));
                        map.put("message_code", rs.getString("message_code"));
                        map.put("snils", rs.getString("snils"));
                        map.put("phone", rs.getString("phone"));
                        map.put("email", rs.getString("email"));
                        map.put("fio", rs.getString("fio"));
                        map.put("pass", rs.getString("pass"));
                        map.put("reg_check_overall_result", rs.getString("reg_check_overall_result"));
                        map.put("reg_check_reg_message", rs.getString("reg_check_reg_message"));

                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> findClientByPhone(String phone) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcAnalyticsTemplate.query(
                " select top 1 cl.last_name+' '+cl.first_name+' '+cl.middle_name as fio,\n" +
                        "null as client_id,\n" +
                        "cl.birthday as birth_date, \n" +
                        "CONCAT(cl.passport_series,cl.passport_number) as passport,\n" +
                        "cl.snils as snils,\n" +
                        "cl.login_email as email, \n" +
                        "cl.login_phone as phone, \n" +
                        "cl.reg_flag as regflag,  \n" +
                        "cl.lkk_old_user as old_user,\n" +
                        "wc.Contract_Status as status, \n" +
                        "wc.Contract_Number as doc_number, \n" +
                        "wc.Contract_Type as doc_type, \n" +
                        "wc.Contract_Date_Begin as date_begin, \n" +
                        "acc.failed_auth_attempts as is_block_user ,\n" +
                        "doc.check_scan as doc_check \n" +
                        "from mdwh4.LKK_PROD.dbo.clients cl \n" +
                        "inner join mdwh4.LKK_PROD.dbo.accounts acc on cl.account_id=acc.id  \n" +
                        "left  join mdwh4.LKK_PROD.dbo.doc_upload doc on cl.id=doc.client_id  \n" +
                        " left join Web_Contract wc on wc.SNILS=cl.snils " +
                        " where cl.login_phone='7" + phone + "' order by date_begin desc"
                ,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("client_id", rs.getString("client_id"));
                        map.put("fio", rs.getString("fio"));
                        map.put("snils", rs.getString("snils"));
                        map.put("doc_number", rs.getString("doc_number"));
                        map.put("doc_type", rs.getString("doc_type"));
                        map.put("status", rs.getString("status"));
                        map.put("regflag", rs.getString("regflag"));
                        map.put("old_user", rs.getString("old_user"));
                        map.put("birth_date", rs.getString("birth_date"));
                        map.put("passport", rs.getString("passport"));
                        map.put("email", rs.getString("email"));
                        map.put("phone", rs.getString("phone"));
                        map.put("is_block_user", rs.getString("is_block_user"));
                        map.put("doc_check", rs.getString("doc_check"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> findClientByMail(String mail) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbcAnalyticsTemplate.query(
                " select top 1 cl.last_name+' '+cl.first_name+' '+cl.middle_name as fio,\n" +
                        "null as client_id,\n" +
                        "cl.birthday as birth_date, \n" +
                        "CONCAT(cl.passport_series,cl.passport_number) as passport,\n" +
                        "cl.snils as snils,\n" +
                        "cl.login_email as email, \n" +
                        "cl.login_phone as phone, \n" +
                        "cl.reg_flag as regflag,  \n" +
                        "cl.lkk_old_user as old_user,\n" +
                        "wc.Contract_Status as status, \n" +
                        "wc.Contract_Number as doc_number, \n" +
                        "wc.Contract_Type as doc_type, \n" +
                        "wc.Contract_Date_Begin as date_begin, \n" +
                        "acc.failed_auth_attempts as is_block_user ,\n" +
                        "doc.check_scan as doc_check \n" +
                        "from mdwh4.LKK_PROD.dbo.clients cl \n" +
                        "inner join mdwh4.LKK_PROD.dbo.accounts acc on cl.account_id=acc.id  \n" +
                        "left  join mdwh4.LKK_PROD.dbo.doc_upload doc on cl.id=doc.client_id  \n" +
                        " left join Web_Contract wc on wc.SNILS=cl.snils " +
                        " where cl.login_email='" + mail + "' order by date_begin desc"
                ,
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("client_id", rs.getString("client_id"));
                        map.put("fio", rs.getString("fio"));
                        map.put("snils", rs.getString("snils"));
                        map.put("doc_number", rs.getString("doc_number"));
                        map.put("doc_type", rs.getString("doc_type"));
                        map.put("status", rs.getString("status"));
                        map.put("regflag", rs.getString("regflag"));
                        map.put("old_user", rs.getString("old_user"));
                        map.put("birth_date", rs.getString("birth_date"));
                        map.put("passport", rs.getString("passport"));
                        map.put("email", rs.getString("email"));
                        map.put("phone", rs.getString("phone"));
                        map.put("is_block_user", rs.getString("is_block_user"));
                        map.put("doc_check", rs.getString("doc_check"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getAllNotCheckedClientsByPhone(String phone) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select cl.id as clientId, cl.snils as snils, last_name+' '+first_name+' '+middle_name as fio, cl.birthday as birthday," +
                        "cl.reg_flag as reg_flag,ac.created as created, " +
                        "doc.check_scan as doc_check, \n" +
                        "cl.passport_series+cl.passport_number as passport " +
                        "from doc_upload doc\n" +
                        "inner join clients cl on doc.client_id=cl.id\n" +
                        "inner join accounts ac on cl.account_id=ac.id\n" +
                        "where doc.check_scan=0 and cl.login_phone='7" + phone + "' " +
                        " order by created desc\n",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("clientId", rs.getString("clientId"));
                        map.put("snils", rs.getString("snils"));
                        map.put("fio", rs.getString("fio"));
                        map.put("birthday", rs.getString("birthday"));
                        map.put("reg_flag", rs.getString("reg_flag"));
                        map.put("passport", rs.getString("passport"));
                        map.put("doc_check", rs.getString("doc_check"));
                        map.put("created", rs.getString("created"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public List<Map<String, String>> getAllNotCheckedClientsByMail(String mail) {
        List<Map<String, String>> info = new ArrayList<Map<String, String>>();
        info = this.jdbc4LkkTemplate.query(
                "select cl.id as clientId, cl.snils as snils, last_name+' '+first_name+' '+middle_name as fio, cl.birthday as birthday," +
                        "cl.reg_flag as reg_flag,ac.created as created, " +
                        "doc.check_scan as doc_check, \n" +
                        "cl.passport_series+cl.passport_number as passport " +
                        "from doc_upload doc\n" +
                        "inner join clients cl on doc.client_id=cl.id\n" +
                        "inner join accounts ac on cl.account_id=ac.id\n" +
                        "where doc.check_scan=0 and cl.login_email='" + mail + "' " +
                        " order by created desc\n",
                new RowMapper() {
                    public Object mapRow(ResultSet rs, int rowNum) throws SQLException {
                        Map<String, String> map = new HashMap<String, String>();
                        map.put("clientId", rs.getString("clientId"));
                        map.put("snils", rs.getString("snils"));
                        map.put("fio", rs.getString("fio"));
                        map.put("birthday", rs.getString("birthday"));
                        map.put("reg_flag", rs.getString("reg_flag"));
                        map.put("passport", rs.getString("passport"));
                        map.put("doc_check", rs.getString("doc_check"));
                        map.put("created", rs.getString("created"));
                        return map;
                    }
                });
        return info;
    }

    @SuppressWarnings("unchecked")
    public String setCheckSendStatusMessage(String message_id) {
        String outputMessage = "";
        try {
            outputMessage = (String) jdbc4LkkTemplate.queryForObject("update messages set is_autosend=1 where id=" + message_id, String.class);
        } catch (Throwable e) {
            e.printStackTrace();
        }
        return outputMessage;
    }


}

