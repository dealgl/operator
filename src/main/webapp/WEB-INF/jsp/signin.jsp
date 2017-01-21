<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/resources/css/ext-all.css">
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/resources/css/xtheme-gray.css">
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/overrides.css">
        <link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/app-theme.css">
        <script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/adapter/ext/ext-base.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-all.js"></script>
        <script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-lang-ru.js" charset="ISO-8859-5"></script>
        <script type="text/javascript">
            Ext.BLANK_IMAGE_URL = '<%=request.getContextPath() %>/js/ext/resources/images/default/s.gif';
        </script>
        <link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/js/ext/plugins/logindialog/css/overrides.css"/>
        <link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/js/ext/plugins/logindialog/css/flags.css"/>
        <link rel="stylesheet" type="text/css" href="<%= request.getContextPath()%>/js/ext/plugins/logindialog/css/virtualkeyboard.css"/>
        <script type="text/javascript" src="<%= request.getContextPath()%>/js/ext/plugins/logindialog/js/overrides.js"></script>
        <script type="text/javascript" src="<%= request.getContextPath()%>/js/ext/plugins/logindialog/js/Ext.ux.form.IconCombo.js"></script>
        <script type="text/javascript" src="<%= request.getContextPath()%>/js/ext/plugins/logindialog/js/Ext.ux.form.LoginDialog.js"></script>

        <title>Авторизация</title>
        <link rel="icon" type="image/png" href="<%=request.getContextPath() %>/img/favicon.png"/>
        <link rel="shortcut icon" type="image/vnd.microsoft.icon" href="<%=request.getContextPath() %>/img/favicon.ico"/>

        <script type="text/javascript" charset="UTF-8">
            Ext.onReady(function() {
                Ext.QuickTips.init();
                var loginDialog = new Ext.ux.form.LoginDialog({
                    modal : true,
                    basePath: '<%= request.getContextPath()%>/js/ext/plugins/logindialog/img/icons',
                    passwordVtype : null,
                    title: 'Авторизация',
                    message: 'Доступ разрешен только зарегистрированным пользователям.<br/>' +
                             'Пожалуйста, введите Ваше имя пользователя и пароль.',
                    usernameLabel: 'Логин',
                    passwordLabel: 'Пароль',
                    loginButton: 'Войти',
                    standardSubmit: true,
                    usernameField: 'j_username',
                    passwordField: 'j_password',
                    url: 'j_spring_security_check',
                    timeout : 60000,
                    listeners : {
                        submit : function(self) {
                            self.hide();
                            Ext.get('loading').insertHtml('afterBegin',
                                    '<div id="loading-indicator">' +
                                        '<img src="<%=request.getContextPath() %>/img/indicator.gif" width="31" height="31" style="margin-right:8px" align="absmiddle" alt=""/>' +
                                        'Загрузка...' +
                                    '</div>'
                            );
                            //                            Ext.get('loading').show();
                            //                            Ext.
                        }
                    }
                });

                setTimeout(function() {
                    Ext.get('loading-indicator').remove();
                    Ext.get('loading-mask').fadeOut({remove:true});
                    loginDialog.show();
                }, 400);

            });
        </script>
    </head>
    <body style='background: url("<%= request.getContextPath()%>/img/signin-background.jpg") repeat-x transparent'>
        <div id="loading-mask" style=""></div>
        <div id="loading">
            <div id="loading-indicator">
                <img src="<%=request.getContextPath() %>/img/indicator.gif" width="31" height="31" style="margin-right:8px" align="absmiddle" alt=""/>
                Загрузка...
            </div>
        </div>
    </body>
</html>
