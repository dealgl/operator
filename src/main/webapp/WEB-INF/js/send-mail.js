/**
 * HotLine 
 */

(function() {
	
	var container;
	
     container = new Ext.FormPanel({
    	id : 'send-mail-component', 
        fileUpload : true,
        border : false,
        layout : 'fit',
        width :570,
        height : 500,
        items : [
            {
                xtype : 'panel',
                title : '<span >Сообщение на Почту</span>',
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
                                vtype : 'email'
                            },
                            {
                                fieldLabel : 'Тема сообщения',
                                name : 'typereq',
                                emptyText : 'Введите тему сообщения',
                                allowBlank : false,
                                xtype : 'textfield'
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
                        timeout : 30000,
                        standardSubmit : true,
                        waitMsg: 'Отправка сообщения...',
                        success: function() {
                            container.message("Сообщение отправлено", null, function() {
                            	container.window.close();
                            });
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
            	container.window.close();
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
        },
         
        setWindow : function(window) {
        this.window = window;
    } ,
    loadData : function(data) {
    	this.data = data;
/*        var inf = {};
        inf['from'] = data['from'];
        this.getForm().setValues(inf);*/
    }


    });


    return container; 
    
})();