package ru.prbb.util.struts;

import com.opensymphony.xwork2.config.ConfigurationManager;
import org.apache.struts2.RequestUtils;
import org.apache.struts2.dispatcher.mapper.ActionMapping;
import org.apache.struts2.dispatcher.mapper.DefaultActionMapper;

import javax.servlet.http.HttpServletRequest;

public class ActionMapper extends DefaultActionMapper {

    @Override
    public ActionMapping getMapping(HttpServletRequest request, ConfigurationManager configManager) {
        String resourcePath = RequestUtils.getServletPath(request);
        if ("".equals(resourcePath) && null != request.getPathInfo()) {
            resourcePath = request.getPathInfo();
        }

        if (resourcePath.startsWith("/struts")) {
            return null;
        } else {
            return super.getMapping(request, configManager);
        }
    }
}