(function() {

    var container;
    
    var _winFiles =  Ext.id();

    container = new Ext.Panel({
        frame:true,
        layout : 'anchor',
        width: 350,
        height:150,
        title:'������ VISA �����',
        autoScroll: true,
        items :[
          	        {
                	        	   id : _winFiles,
                	               xtype : 'form',
                	               layout : 'fit',               
                	               fileUpload : true,               
                	               items : [
                						{
                				     		xtype : 'fileuploadfield',
                				            name : 'upload',
                				            buttonText : '�������� ����',
                				            width : 290
                				        }
                	                ],
                	                buttons : [
                	                           {
                	                        	   xtype : 'button',
                	                               text : '����������',
                	                               handler : function(self) {
                	                        	   		Ext.getCmp(_winFiles).getForm().submit({                    	
                	                        	   			url: 'settlement/visa-import.html',
                	                                        waitMsg: '��������',
                	                                        timeout: 10 * 60 * 1000,
                	                                        success: function(form, action) {
                	                                            App.ui.message('�������� ��������� �������');
                	                                            	container.window.close();
                	                                            	
                											},
                	                                        failure: function(form, action) {
                	                                            if (action.failureType == 'server') {
                	                                                var msg = Ext.decode(action.response.responseText);
                	                                                App.ui.error(msg.message.replace(/\n/g, '<br/>'));
                	                                            } else if (action.failureType == 'connect') {
                	                                                App.ui.error('������ ����������');
                	                                            } else {
                	                                                App.ui.error('����������� ������');
                	                                            }
                	                                        }
                	                                    });        	   		
                	                               }
                	                           },
                	                           {
                	                               text : '������',
                	                               handler : function() {
                	                        	   		container.window.close();
                	                               }
                	                           }
                	                ]
                	            }
                	      
                ],
                setWindow : function(window) {
					this.window = window;
				}

    });	
    
    return container;

})();