/**
 * Organization Info view
 */

(function () {

    var container;
    
  //  var id_sec = '';
    
    var _viewDoc = Ext.id();
   /* var _winFiles =  Ext.id();
    var _adr =  Ext.id();
    var _currency = Ext.id(); 
    var _koef_0 = Ext.id();
    var _koef_1 = Ext.id();
    var _bloomCode = Ext.id();
    var _period = Ext.id();
    var _group = Ext.id();*/

	/*var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'file',
            fields: 
           	['file','name','address']
        })

    });*/
    
    container = new Ext.FormPanel({
        id :'view-web-services-form-component',
        frame :true,
        closable : true,
        header : false,
        layout:'absolute',
        autoScroll : true,
        labelWidth : 250,
        preventBodyReset: true,
         
        defaults: {
            style: {
                marginBottom: '5px'
            }
        }, 
        items : [            
            {
                id : _viewDoc,
            	xtype : 'panel',
                frame : true,
                collapsible : true,
                title: 'Дизайны',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	{
                                             html:	
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	data['userID']
	                                            	
                                        } 
                                     
                                    	
                                   ]
                         }           
                        ] 
                        
            } 
        ],
        
        loadData : function(data) { 
        	this.setTitle("тест");        	
        	this.data = data;
        	//alert(data['userID']);
            /*if (data['userID']){
            	store.loadData(data);
            }*/
        }/*,
        setWindow : function(window) {
            this.window = window;
        }*/
    });

    return container;

})();