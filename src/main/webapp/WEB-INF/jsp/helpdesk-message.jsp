<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib prefix="s" uri="/struts-tags" %>

<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/resources/css/ext-all.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/overrides.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/css/app-theme.css">
<link rel="stylesheet" type="text/css" href="<%=request.getContextPath() %>/js/ext/ux/css/fileuploadfield.css">
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/adapter/ext/ext-base.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-all.js"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ext-lang-ru.js" charset="ISO-8859-5"></script>
<script type="text/javascript" src="<%=request.getContextPath() %>/js/ext/ux/FileUploadField.js"></script>
<script type="text/javascript">
    Ext.BLANK_IMAGE_URL = '<%=request.getContextPath() %>/js/ext/resources/images/default/s.gif';
</script>
<script type="text/javascript" src="<%= request.getContextPath()%>/js/ext-overrides.js"></script>
<script type="text/javascript" src="<%= request.getContextPath()%>/js/application.js"></script>

<script type="text/javascript" charset="UTF-8">
Ext.onReady(function() {
    Ext.QuickTips.init();

    var fileStore = new Ext.data.ArrayStore({
        fields : ['name'],
        idIndex : 0
    });
    var sm = new Ext.grid.CheckboxSelectionModel();

    var win;
    var container = new Ext.FormPanel({
        fileUpload : true,
        border : false,
        layout : 'fit',
        items : [
            {
                xtype : 'panel',
                title : '<span class="z-warning">Сообщение об ошибке</span>',
                frame : true,
                autoScroll : true,
                items :[
                    {
                        xtype : 'fieldset',
                        defaultType :'textfield',
                        labelWidth : 200,
                        defaults : {
                            width : Ext.isIE ? 316 : 326
                        },
                        items : [
                            {
                                fieldLabel : 'Ваш E-Mail для обратной связи',
                                name : 'from',
                                emptyText : 'Введите адрес для обраиной связи',
                                allowBlank : false,
                                xtype : 'textfield'
                                //vtype : 'email'
                            },
                            {
                            	xtype : 'combo',
                            	fieldLabel: 'Укажите причину обращения',
                            	valueField : 'id',
                            	mode: 'local',
                            	displayField : 'request',
                            	name : 'typereq',
                                triggerAction: 'all',
                                typeAhead: true,
                                forceSelection : true,
                                selectOnFocus:true,
                                store : new Ext.data.ArrayStore({
                                    fields : ['id', 'request'],
                                    data : [
                                        ["0" , "Ошибка/Вопрос"],
                                        ["1" , "Предложение"]
                                    ]
                                }),
                                listeners : {
                                select : function(combo, rec) {
//									if (rec.data.id==1) {
//									alert("предложение");
//		                            	//Ext.get('_toId').getValue();
//									}else 
//										alert("вопрос");
                                	}
                            	}
                            },
                              {
                                hideLabel : true,
                                xtype : 'htmleditor',
                                width : 530,
                                height : 170,
                                name : 'text'
                            },
                            {
                                xtype : 'fieldset',
                                collapsible : true,
//                                collapsed : true,
                                title : 'Панель вложений',
                                width : 530,
                                defaults : {
                                    hideLabel : true
                                },
                                items : [
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file',
                                        buttonText : 'Добавить',
                                        width : 500
                                    }),
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file1',
                                        buttonText : 'Добавить',
                                        width : 500
                                    }),
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file2',
                                        buttonText : 'Добавить',
                                        width : 500
                                    })
                                ]
                            }
                        ]
                    }
                ]
            }
        ],
        buttons : [
            {
                xtype : 'button',
                text: 'Отправить',
                handler : function() {
                    container.getForm().submit({
                        url: 'mail/send-mail.html',
                        timeout : 3000,
                        standardSubmit : true,
                        waitMsg: 'Отправка сообщения в Help Desk...',
                        success: function(form, action) {
                   	 	 var msg = Ext.decode(action.response.responseText);
                   		 if (msg.code == 'filesize') {
                   			 container.error(msg.message);
                            } else {
                               container.message("Сообщение отправлено", null, function() {
                               win.close();
                            });
                           }
                       },
                        failure: function(form, action) {
                            if (action.failureType == 'server') {
                                var msg = Ext.decode(action.response.responseText);
                                if (msg.code == 'login') {
                                    container.sessionExpired();
                                } else {
                                    container.error('Ошибка при оправлении сообщения', msg.message);
                                }
                            } else if (action.failureType == 'connect') {
                                container.error('Сервер недоступен');
                            } else if (action.failureType == 'client') {
                                container.error('Проверьте правильность заполнения полей', container.getForm().invalidList());
                            } else {
                                container.error('Неизвестная ошибка');
                            }
                        }
                    });
                }
            },
            {
                xtype : 'button',
                text: 'Отмена',
                handler : function() {
                    win.close();
                    
                }
            }
        ],

        sessionExpired : function () {
            var msg = 'Вы не зарегистрированы в системе или Ваша сессия устарела<br/>Пожалуйста, войдите в систему повторно';
            Ext.MessageBox.show({
                title: 'Ошибка',
                msg: msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR,
                fn : function() {
                    window.location = '';
                }
            });
        },

        message : function (text, additional, callback, animEl) {
            var msg = String.format(text);
            if (additional) {
                msg += String.format('<br/><br/><span class="z-tooltip">{0}</span>', additional);
            }
            Ext.MessageBox.show({
                title: 'Информация',
                msg: msg,
                modal : true,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.INFO,
                fn : callback,
                animEl : animEl
            });
        },

        error : function (text, additional) {
            var msg = String.format(text);
            if (additional) {
                msg += String.format('<br/><br/><span class="z-tooltip">' + additional + '</span>');
            }
            Ext.MessageBox.show({
                title: 'Ошибка',
                msg: msg,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    });

    win = new Ext.Window({
        layout:'fit',
        width: 600,
        height: 415,
        plain: true,
        modal: true,
        border : false,
        items: container,
        listeners : {
            close : function() {
                window.close();
            }
        }
    });

    container.getForm().setValues({
        from : Ext.get('_fromId').getValue(),
        to : Ext.get('_toId').getValue()
    });

    win.doLayout();
    win.show();
});
</script>
</head>
<body style='background: url("<%= request.getContextPath()%>/img/signin-background.jpg") repeat-x transparent'>
    <input id="_fromId" type="hidden" value="<s:property value="from"/>">
    <input id="_toId" type="hidden" value="Help Desk <<s:property value="to"/>>">
</body>
</html>
