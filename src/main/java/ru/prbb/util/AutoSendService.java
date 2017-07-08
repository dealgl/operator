package main.java.ru.prbb.util;

import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.DefaultHttpClient;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.sql.*;

@Service
public class AutoSendService {

    private static String url;

    private static Connection connection;

    private void sendMessage(String id, String snils, String body, String fio,
                             String birthday, String pass, String phone, String mail) {

        String subj = "id=" + id + "%20сообщение%20из%20онлайн%20чата%20от%20".concat(fio.replaceAll(" ", "%20"));
        String email = "lkk@futurenpf.ru";
        StringBuffer sb = new StringBuffer();
        sb.append("Сообщение:");
        if (!body.equals(null)) {
            sb.append(body.replaceAll(" ", "%20").replaceAll("\n", "%20"));
            System.out.println(sb);
        }
        sb.append("%20ФИО:");
        if (!fio.equals(null)) {
            sb.append(fio.replaceAll(" ", "%20"));
        }
        sb.append("%20Дата%20рождения:");
        if (birthday != null) {
            sb.append(birthday.replaceAll(" ", "%20"));
        }
        sb.append("%20Номер%20СНИЛС:");
        if (snils != null) {
            sb.append(snils.replaceAll(" ", "%20"));
        }
        sb.append("%20Номер%20паспорта:");
        if (pass != null) {
            sb.append(pass.replaceAll(" ", "%20"));
        }
        sb.append("%20Номер%20телефона(логин):");
        if (phone != null) {
            sb.append(phone.replaceAll(" ", "%20"));
        }
        sb.append("%20e-mail(логин):");
        if (mail != null) {
            sb.append(mail.replaceAll(" ", "%20"));
        }

        String text = sb.toString();
        String url = "https://cabinet.futurenpf.ru/api/client/send_email_by_url?token=uDuFsA5BUQjFw7UC7B4aTFxo3PoGzCeoRE4Q9BSGcRmwkbyENmJyQPB&subject=".concat(subj).concat("&emails=").concat(email).concat("&html=").concat(text);
        HttpClient httpClient = new DefaultHttpClient();
        HttpPost p = new HttpPost(url);
        try {
            HttpResponse r = httpClient.execute(p);
            String res1 = null;
            res1 = ru.prbb.util.OracleDBManager.getInstance().setCheckSendStatusMessage(id);
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    synchronized public void invokeMethod() {

        url = "jdbc:sqlserver://10.64.64.199:1433;databaseName=LKK_PROD";
        Statement stmt = null;
        ResultSet rs = null;
        String query = "SELECT m.[id]\n" +
                "      ,m.[date_posted]\n" +
                "      ,m.[body]\n" +
                "      ,m.[is_read]\n" +
                "      ,m.[is_answered]\n" +
                "      ,m.[direction]\n" +
                "      ,m.[client_id]\n" +
                "\t  ,cl.snils\n" +
                " ,cl.last_name+' '+cl.first_name+' '+cl.middle_name as fio " +
                " ,cl.birthday " +
                " ,CONCAT(cl.passport_series,cl.passport_number) as pass " +
                " ,cl.login_phone as phone \n" +
                " ,cl.login_email as email \n" +
                "  FROM [LKK_PROD].[dbo].[messages] m,[LKK_PROD].[dbo].[clients] cl\n" +
                "  where m.is_autosend is null\n" +
                "  and m.date_posted>='2017-07-04'\n" +
                "  and m.direction=1\n" +
                "  and m.client_id=cl.id\n";
        try {
            Class.forName("com.microsoft.sqlserver.jdbc.SQLServerDriver");
            connection = DriverManager.getConnection(url, "lkk_operator", "lkk_operator");
            stmt = connection.createStatement();
            rs = stmt.executeQuery(query);
            while (rs.next()) {
                sendMessage(rs.getString("id"), rs.getString("snils"), rs.getString("body"), rs.getString("fio"),
                        rs.getString("birthday"), rs.getString("pass"), rs.getString("phone"), rs.getString("email"));
            }
        } catch (ClassNotFoundException e) {
            e.printStackTrace();
        } catch (SQLException e) {
            e.printStackTrace();
        }


    }
}
