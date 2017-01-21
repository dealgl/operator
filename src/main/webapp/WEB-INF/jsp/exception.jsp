<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <jsp:include page="include/scripts.jsp"/>
        <title>PORTAL PLASTIC</title>
        <script type="text/javascript" charset="UTF-8">
            Ext.onReady(function() {
                Ext.QuickTips.init();
                App.ui.error('<s:property value="message"/>', '<s:property value="detail"/>');        
            });
        </script>
    </head>
</html>