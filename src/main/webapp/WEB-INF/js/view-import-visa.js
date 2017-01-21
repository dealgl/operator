(function() {

    var container;
    
    var _winFiles =  Ext.id();

    container = new Ext.Panel({
        frame:true,
        layout : 'anchor',
        width: 350,
        height:150,
        title:'Импорт VISA файла',
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
                				            buttonText : 'Добавить файл',
                				            width : 290
                				        }
                	                ],
                	                buttons : [
                	                           {
                	                        	   xtype : 'button',
                	                               text : 'Прикрепить',
                	                               handler : function(self) {
                	                        	   		Ext.getCmp(_winFiles).getForm().submit({                    	
                	                        	   			url: 'settlement/visa-import.html',
                	                                        waitMsg: 'Загрузка',
                	                                        timeout: 10 * 60 * 1000,
                	                                        success: function(form, action) {
                	                                            App.ui.message('Операция выполнена успешно');
                	                                            	container.window.close();
                	                                            	
                											},
                	                                        failure: function(form, action) {
                	                                            if (action.failureType == 'server') {
                	                                                var msg = Ext.decode(action.response.responseText);
                	                                                App.ui.error(msg.message.replace(/\n/g, '<br/>'));
                	                                            } else if (action.failureType == 'connect') {
                	                                                App.ui.error('Сервер недоступен');
                	                                            } else {
                	                                                App.ui.error('Неизвестная ошибка');
                	                                            }
                	                                        }
                	                                    });        	   		
                	                               }
                	                           },
                	                           {
                	                               text : 'Отмена',
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