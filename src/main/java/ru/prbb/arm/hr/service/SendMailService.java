package main.java.ru.prbb.arm.hr.service;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.security.*;
import org.springframework.security.providers.AuthenticationProvider;
import org.springframework.security.providers.UsernamePasswordAuthenticationToken;

import javax.activation.DataHandler;
import javax.activation.DataSource;
import javax.activation.FileDataSource;
import javax.mail.*;
import javax.mail.internet.*;
import java.util.Properties;

public class SendMailService {

    final static Log log = LogFactory.getLog(SendMailService.class);

    public static boolean sendPassword(String email){
        String to = email;
        String from = "d.gluhov@mail.ru";
        Properties properties = System.getProperties();
        properties.put("mail.smtp.auth", true);
        properties.put("mail.smtp.starttls.enable", true); // added this line
        properties.put("mail.smtp.host", "smtp.mail.ru");
        properties.put("mail.smtp.port", "25");

        Session session = Session.getInstance(properties,
                new javax.mail.Authenticator() {
                    protected PasswordAuthentication getPasswordAuthentication() {
                        return new PasswordAuthentication("d.gluhov@mail.ru", "Kary123");
                    }
                });

        try {
            MimeMessage message = new MimeMessage(session);

            message.setFrom(new InternetAddress(from));
            message.addRecipient(Message.RecipientType.TO,
                    new InternetAddress(to));
            message.setSubject("НПФ БУДУЩЕЕ Личный кабинет");


            // Create the message part
            BodyPart messageBodyPart = new MimeBodyPart();

            // Fill the message
            messageBodyPart.setText("Ваш пароль ***** ");

            // Create a multipar message
            Multipart multipart = new MimeMultipart();

            // Set text message part
            multipart.addBodyPart(messageBodyPart);

            // Part two is attachment
            /*messageBodyPart = new MimeBodyPart();
            String filename = "C:/Soft/JavaLib/javax.mail.jar";
            DataSource source = new FileDataSource(filename);
            messageBodyPart.setDataHandler(new DataHandler(source));
            messageBodyPart.setFileName(filename);
            multipart.addBodyPart(messageBodyPart);
*/
            // Send the complete message parts
            message.setContent(multipart );


            Transport.send(message);
            System.out.println("Sent message successfully....");

        } catch (AddressException e) {
            e.printStackTrace();
        } catch (MessagingException e) {
            e.printStackTrace();
        }

        return true;
    }

}


