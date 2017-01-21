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
                title : '<span >��������� �� �����</span>',
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
                                fieldLabel : '��� E-Mail ��� �������� �����',
                                name : 'from',
                                emptyText : '������� ����� ��� �������� �����',
                                allowBlank : false,
                                vtype : 'email'
                            },
                            {
                                fieldLabel : '���� ���������',
                                name : 'typereq',
                                emptyText : '������� ���� ���������',
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
                                title : '������ ��������',
                                width : 530,
                                defaults : {
                                    hideLabel : true
                                },
                                items : [
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file',
                                        buttonText : '��������',
                                        width : 500
                                    }),
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file1',
                                        buttonText : '��������',
                                        width : 500
                                    }),
                                    new Ext.ux.form.FileUploadField({
                                        name : 'file2',
                                        buttonText : '��������',
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
                text: '���������',
                handler : function() {
                    container.getForm().submit({
                        url: 'mail/send-mail.html',
                        timeout : 30000,
                        standardSubmit : true,
                        waitMsg: '�������� ���������...',
                        success: function() {
                            container.message("��������� ����������", null, function() {
                            	container.window.close();
                            });
                        },
                        failure: function(form, action) {
                            if (action.failureType == 'server') {
                                var msg = Ext.decode(action.response.responseText);
                                if (msg.code == 'login') {
                                    container.sessionExpired();
                                } else {
                                    container.error('������ ��� ���������� ���������', msg.message);
                                }
                            } else if (action.failureType == 'connect') {
                                container.error('������ ����������');
                            } else if (action.failureType == 'client') {
                                container.error('��������� ������������ ���������� �����', container.getForm().invalidList());
                            } else {
                                container.error('����������� ������');
                            }
                        }
                    });
                }
            },
            {
                xtype : 'button',
                text: '������',
                handler : function() {
            	container.window.close();
                }
            }
        ],

        sessionExpired : function () {
            var msg = '�� �� ���������������� � ������� ��� ���� ������ ��������<br/>����������, ������� � ������� ��������';
            Ext.MessageBox.show({
                title: '������',
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
                title: '����������',
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
                title: '������',
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