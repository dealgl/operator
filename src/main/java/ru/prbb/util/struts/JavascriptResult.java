package ru.prbb.util.struts;

import com.opensymphony.xwork2.ActionInvocation;
import org.apache.commons.io.IOUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.apache.struts2.dispatcher.StrutsResultSupport;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class JavascriptResult extends StrutsResultSupport {

    static final Log log = LogFactory.getLog(JavascriptResult.class);

    private String charset = "ISO-8859-5";

    private class BufferedPage {
        String script;
        long timeStamp;

        private BufferedPage(String script, long timeStamp) {
            this.script = script;
            this.timeStamp = timeStamp;
        }
    }

    private static Map<String, BufferedPage> cache = new HashMap<String, BufferedPage>();

    @Override
    public void doExecute(String location, ActionInvocation invocation) throws Exception {

        HttpServletResponse response = (HttpServletResponse) invocation.getInvocationContext().get(HTTP_RESPONSE);
        ServletContext servletContext = (ServletContext) invocation.getInvocationContext().get(SERVLET_CONTEXT);

        response.setContentType("application/x-javascript;charset=" + charset);
        response.setHeader("Content-Disposition", "inline");

        PrintWriter writer = response.getWriter();
        BufferedPage page = cache.get(location);
        try {
            URL url = servletContext.getResource(location);
            long lastModified = url.openConnection().getLastModified();
            if (page == null || lastModified != page.timeStamp) {
                String script = IOUtils.toString(new InputStreamReader(servletContext.getResourceAsStream(location), charset));
                page = new BufferedPage(script, lastModified);
                cache.put(location, page);
            }
            writer.write(page.script);
        } finally {
            if (writer != null) {
                writer.flush();
                writer.close();
            }
        }
    }

    public String getCharset() {
        return charset;
    }

    public void setCharset(String charset) {
        this.charset = charset;
    }
}

