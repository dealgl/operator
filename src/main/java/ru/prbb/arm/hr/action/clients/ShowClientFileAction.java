package main.java.ru.prbb.arm.hr.action.clients;

import java.io.ByteArrayInputStream;
import java.io.InputStream;

import javax.servlet.http.HttpServletResponse;
import org.apache.struts2.interceptor.ServletResponseAware;

import org.apache.struts2.ServletActionContext;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.convention.annotation.Result;
import org.apache.struts2.convention.annotation.Action;
import org.springframework.stereotype.Component;


/**
 * @author denis
 */
@Component
@Result(type = "stream")
public class ShowClientFileAction implements ServletResponseAware {

    final static Log log = LogFactory.getLog(ShowClientFileAction.class);

    private HttpServletResponse response;

    private int id;

    private byte[] content;

    public Boolean getSuccess() {
        return true;
    }

    @Action("show-client-file")
    public String exeShowClientFileProceed() throws Exception {
        response.setContentType("image/JPG");
        content=ru.prbb.util.OracleDBManager.getInstance().getClientScan(id);
        ServletActionContext.getResponse().setHeader("Content-disposition", "attachment;filename=" + "scan.JPG");
        return "success";
    }

    @Override
    public void setServletResponse(HttpServletResponse arg0) {
        response = arg0;

    }

    public void setId(int id) {
        this.id = id;
    }

    public InputStream getScan() {
        return new ByteArrayInputStream(content);
    }

    public String getInputName() {
        return "scan";
    }

    public String getContentType() {
        return "image/JPG";
    }

}
