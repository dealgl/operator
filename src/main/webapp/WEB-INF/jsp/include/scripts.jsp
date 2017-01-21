<%@ page import="org.springframework.web.context.request.RequestContextHolder" %>
<%@ page import="org.springframework.web.context.request.RequestAttributes" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>


<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/resources/css/xtheme-gray.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/ux/statusbar/css/statusbar.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/ux/css/fileuploadfield.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/overrides.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/app-theme.css">

<script type="text/javascript" src="/tcs-rates1/js/amq/dojo.js"></script>
<script type="text/javascript" src="/tcs-rates1/js/amq/amq_dojo_adapter.js"></script>
<script type="text/javascript" src="/tcs-rates1/js/amq/amq.js"></script>

   <script type="text/javascript">

   function urlDecode(str){
	    str=str.replace(new RegExp('\\+','g'),' ');
	    return unescape(str);
   }

	amq = org.activemq.Amq;
	
	function receiveMessage(message)
	{
		 if (message.childNodes[0].data == '1') { 
	         alert ("Внимание, перегрузка сервера через 20 минут");
	     } else if (message.childNodes[0].data == '2') {
	    	 alert ("Внимание, тестирование системы оповещения в АРМ-ах"); 
	     } else {
	    	 alert ("Внимание: " + urlDecode(message.childNodes[0].data));
	     }
	}
	function amqInit()
	{
	    amq.init({ uri: '/reports-0.1/amq', logging: true});
	    amq.addListener('arm-supervisor-<%= System.currentTimeMillis()%>','topic://ARM.MESSAGE',receiveMessage);
	   
	}
	
	//dojo.addOnLoad(amqInit);

</script>


<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ux-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-lang-ru.js" charset="ISO-8859-5"></script>
<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=request.getContextPath() %>/js/ext/resources/images/default/s.gif';
</script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/application.js" charset="ISO-8859-5"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/main-page.js" charset="ISO-8859-5"></script>









