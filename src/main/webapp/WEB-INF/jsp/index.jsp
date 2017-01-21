<%@ page import="org.springframework.web.context.request.RequestContextHolder" %>
<%@ page import="org.springframework.web.context.request.RequestAttributes" %>
 

<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd"> 
<%@ taglib prefix="s" uri="/struts-tags" %>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <jsp:include page="include/scripts.jsp"/>
        <title>Оператор ЛКК</title>
        <link rel="icon" type="image/png" href="<%=request.getContextPath() %>/img/favicon.png"/>
        <link rel="shortcut icon" type="Fimage/vnd.microsoft.icon" href="<%=request.getContextPath() %>/img/favicon.ico"/>
    </head>
    <body>
        <div id="loading-mask" style=""></div>
      <!--  <div id="header-table" class="x-hidden">
            <table width="100%" cellpadding="0" cellspacing="0">
                <tr valign="left">
                    <td id="left-logo" width="250">
                        <img width="250" height="100" border="0" alt="" src="<%=request.getContextPath() %>/img/logo-1.gif"/>
                    </td>
                </tr>
            </table>
        </div> -->

       	<div>     

	   	 <ul id="task-ext-projects" class="x-hidden">

             <li>
                 <img src="<%=request.getContextPath() %>/img/member.gif" class="icon-show-all" alt="">
                 <a href="#" onclick="menu.getClients();"
                    ext:qtitle="Клиенты"
                    ext:qtip="Клиенты"
                 ><font size="2">Клиенты</font>
                 </a>
             </li>

             <li>
                 <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                 <a href="#" onclick="menu.getMessages();"
                    ext:qtitle="Сообщения"
                    ext:qtip="Сообщения"
                 ><font size="2">Сообщения</font>
                 </a>
             </li>

             <li>
                 <img src="<%=request.getContextPath() %>/img/print.gif" class="icon-show-all" alt="">
                 <a href="#" onclick="menu.checkClients();"
                    ext:qtitle="Сверка скана"
                    ext:qtip="Сверка скана"
                 ><font size="2">Сверка скана</font>
                 </a>
             </li>

             <!--
                             <li>
                                 <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                                 <a href="#" onclick="menu.setCourse();"
                                    ext:qtitle="Установка алгоритма расчета курсов"
                                    ext:qtip="Установка алгоритма расчета курсов"
                                         ><font size="2">Установка алгоритма расчета курсов</font>
                                 </a>
                             </li>
                             <li>
                                 <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                                 <a href="#" onclick="menu.showCandidateSheets();"
                                    ext:qtitle="История изменения используемого базового биржевого курса"
                                    ext:qtip="История изменения используемого базового биржевого курса"
                                         ><font size="2">История изменения биржевого курса</font>
                                 </a>
                             </li>

                             <li>
                                 <img src="<%=request.getContextPath() %>/img/document-excel-table.png" class="icon-show-all" alt="">
                                 <a href="#" onclick="menu.showCandidateSheetsExt();"
                                    ext:qtitle="Обновление курсов валют"
                                    ext:qtip="Обновление курсов валют"
                                         ><font size="2">Обновление курсов валют</font>
                                 </a>
                             </li>
                             -->
                
    	</ul> 

	   	 <ul id="task-reports" class="x-hidden">
                <li>
                    <img src="<%=request.getContextPath() %>/img/grid.png" class="icon-show-all" alt="">
                    <a href="#" onclick="menu.showReportsParamsForm();"
                       ext:qtitle="Отчет"
                       ext:qtip="Отчет"
                            >Отчет 
                    </a>
                </li>
    	</ul> 

    	<ul id="task-settings" class="x-hidden">
               <!-- 
               
               <li>
               
                    <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                    <a href="#" onclick="menu.showVuz();"
                       ext:qtitle="Обмен файлов между УПК и ВУЗ"
                       ext:qtip="Обмен файлов между УПК и ВУЗ"
                            ><font size="2"> ВУЗ-БАНК</font> 
                    </a>
                </li>

                <li>
                    <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                    <a href="#" onclick="menu.showGEB();"
                       ext:qtitle="Обмен файлов между УПК и ГЭБ"
                       ext:qtip="Обмен файлов между УПК и ГЭБ"
                            ><font size="2"> ГЭБ</font> 
                    </a>
                </li>
				<li>
                    <img src="<%=request.getContextPath() %>/img/bogus.png" class="icon-show-all" alt="">
                    
                    <a href="#" onclick="menu.showSettlementMain();"
                       ext:qtitle="Регистрация пользователей"
                       ext:qtip="Регистрация пользователей"
                            ><font size="2">Урегулирование(Settlement)</font> 
                    </a>
                </li> -->                
                 <li>
                    <img src="<%=request.getContextPath() %>/img/users.png" class="icon-show-all" alt="">
                    <a href="#" onclick="menu.showUserProfile();"
                       ext:qtitle="Профиль пользователя"
                       ext:qtip="Профиль пользователя"
                            ><font size="2">Профиль</font>
                    </a>
                </li>
                <li>
                    <img src="<%=request.getContextPath() %>/img/users.png" class="icon-show-all" alt="">
                    <a href="#" onclick="menu.showChangePasswordForm();"
                       ext:qtitle="Сменить пароль"
                       ext:qtip="Сменить пароль"
                            ><font size="2">Сменить пароль</font>
                    </a>
                </li> 
                <li>
                    <img src="<%=request.getContextPath() %>/img/users.png" class="icon-show-all" alt="">
                    <a href="<%=request.getContextPath() %>/signout.html" style="color: #FF0000;" target="_blank"
                       ext:qtitle="Выход"
                       ext:qtip="Выход"
                            ><font size="2">Выход</font>
                    </a>
                </li>
    	</ul>
        </div>
         
        <div id="intro-panel" class="x-hidden">
        <h5><font size="2">Если у Вас возникли вопросы или предложения вы можете отправить запрос</font></h5>
        <h5><font size="2">Наши сотрудники свяжутся с Вами</font></h5> 
		<a href="<%=request.getContextPath() %>/helpdesk.html"><font size=+1>Отправить сообщение</font></a><br/><br/><br/>
        <h5><font size="2">С уважением, служба поддержки SERVICE DESK!</font></h5> 
        </div>
 
    </body>
</html>