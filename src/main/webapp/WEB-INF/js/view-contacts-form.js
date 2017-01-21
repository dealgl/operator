/**
 * Organization Info view
 */

(function () {

    var container;
    
    var id_sec = '';
    
    var _viewDoc = Ext.id();
    var _winFiles =  Ext.id();
    var _adr =  Ext.id();
    var _currency = Ext.id(); 
    var _koef_0 = Ext.id();
    var _koef_1 = Ext.id();
    var _bloomCode = Ext.id();
    var _period = Ext.id();
    var _group = Ext.id();
    



	var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'file',
            fields: 
           	['file','name','address']
        })

    });
    
     
    
    container = new Ext.FormPanel({
        id :'view-pickup-cards-form-component',
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
                title: '���������',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	{
                                             html:	
                                            	 	'<b><i>  �������� �������� ���������:</b></i>'+
                                            	 	'<br> 1. ������ � ��������'+
	                                            	'<br> 2. �� ����������� ����� - ���������������, ������ � ������� (JPEG,JPG,TIF)'+
	                                            	'<br> 3. �� �����'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<b> ��������� �� ������� ��������� ���������� �� ��������� �������: </b>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "�������������" </b> ������, ����������� 6�.'+
	                                            	'<hr>       ����� ������������ � ������������� ������'+
	                                            	'<br> �������� ����� /������������� ������, ������ ����, ����������� ���, Fraud/'+
	                                            	'<br> ���������� ������� 4085'+
	                                            	'<br> ����� Lotus: Igor V Cherkasov/IT/Probusiness Bank'+
	                                            	'<br> ����: (495)7339342'+
	                                            	'<br> ��� (903)6766235'+
	                                            	'<br>'+
	                                            	'<br> ��������� �������� /������������� ������/'+
	                                            	'<br> ���������� ������� ----'+
	                                            	'<br> ����� Lotus: Viktoriya R Chistyakova/IT/Probusiness Bank'+
	                                            	'<br> ����: (495)7339342'+
	                                            	'<br> ��� (903)6767150'+
	                                            	'<br>'+
	                                            	'<br> ������� ������� /����������� ���/'+
	                                            	'<br> ���������� ������� ----'+
	                                            	'<br> ����� Lotus: Natalya V Shurkova/IT/Probusiness Bank'+
	                                            	'<br> ����: (495)7339342'+
	                                            	'<br> ��� (903)6767152'+
	                                            	'<br>'+
	                                            	'<br> ���������� ������ /������ ����, Fraud/'+
	                                            	'<br> ���������� ������� ----'+
	                                            	'<br> ����� Lotus: Maksim I Shahkirimov/IT/Probusiness Bank,'+ 
	                                            	'<br> ����: (495)7339342'+
	                                            	'<br> ��� (903)------'+
	                                            	'<br>'+
	                                            	'<br> ���� ������  '+
	                                            	'<br> ���������� ������� 4336'+
	                                            	'<br> ����� Lotus: Leonid V Yashin/IT/Probusiness Bank'+
	                                            	'<br> ����: (495)7339342'+
	                                            	'<br> ��� (963)6440139'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "�÷-����"</b>'+
	                                            	'<hr>       ���������� ���������� ���� � �������������� ������������'+
	                                            	'<br> ��������� ��������'+
	                                            	'<br> ���������� �������: 2634'+
	                                            	'<br> ����� Lotus: Alexander V Larchenko/UPO/VUZ/Probusiness Bank'+
	                                            	'<br> ����:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "��������-�����"</b>'+
	                                            	'<hr>       ����� ����� ��������� �������'+
	                                            	'<br> �������� �������'+
	                                            	'<br> ���������� �������: 3391'+
	                                            	'<br> ����� Lotus: Natalya A Shevchenko/URN/EXV/Probusiness Bank'+
	                                            	'<br> ����:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "���ͽ��������"</b>'+
		                                            '<hr>       ���������� ���������� ���� � �������������� ������������'+
	                                            	'<br> ���� �����'+
	                                            	'<br> ���������� �������: xxxx'+
	                                            	'<br> ����� Lotus: Yuriy V Yurtin/RBD/GEB/Probusiness Bank'+
	                                            	'<br> ����:'+ 
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<hr>'+
	                                            	'<b> "����24.��"</b>'+
	                                            	'<hr>       ���������� ���������� ���� � �������������� ������������'+
	                                            	'<br> �������� ���� �������������'+
	                                            	'<br> ���������� �������: (343) 2222222 ��. 9-278'+
	                                            	'<br> ����� Lotus: mironova@bank24.ru'+ 
	                                            	'<br> ����:'+ 
	                                            	'<br>'+
	                                            	'<br>'    
                                        } 
                                     
                                    	
                                   ]
                         }           
                        ] 
                        
            }
        ],
        
        loadData : function(data) {
        	this.setTitle("������� ������� ���� �� ����������");        	
        	this.data = data;
            if (data['file'][0]){
            	store.loadData(data);
            }
        },
        setWindow : function(window) {
            this.window = window;
        }
    });

    return container;

})();