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
        id :'view-design-cards-form-component',
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
                title: '�������',
                items :[
                        {
                           	xtype:'fieldset',
                            autoHeight: true,
                            items :[
                                    	{
                                             html:	
	                                            	'<br>'+
	                                            	'<br>'+
	                                            	'<table>'+
		                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa Ǹ� DDA ��������� Infinite 466081 �������� </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Gold 554538 ������ </b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card Ǹ� DDA ��������� Gold 528686 ������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa Ǹ� DDA ��������� Platinum 489016 ������������ ������</b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card Ǹ� DDA ��������� Business 5586 �������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� ISIC 545421 </b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> description 7</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa Ǹ� DDA ��������� Gold 405845 �������� ����</b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Visa Ǹ� DDA ��������� Business 4058 ������� </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k10.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Visa ��������� �������� Electron 405846 ����� (Jeans Effect) </b></td>'+
		                            				   	'</tr>'+
			                            				    '</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k11.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Visa Ǹ� DDA ��������� Electron 405846 ��������� ������ </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/k12.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card Ǹ� DDA ��������� Gold 554538 ������</b></td>'+
				                           				'</tr>'+
			                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Standard 528686 ������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Standard 545421 ������</b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Gold 554558 ������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa Ǹ� DDA ��������� Classic 405844 �����</b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Priority Pass </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa Ǹ� DDA ��������� Classic 405844 �������</b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Gift 531153 ����������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card Ǹ� DDA ��������� Platinum 528686 ����</b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Master Card ��������� �������� Standard 545421 ������� ����</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d10.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> description 22</b></td>'+
		                            				   	'</tr>'+
			                            				    '</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d11.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card ��������� �������� Cirrus Maestro 676479 ������ �������� </b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/d12.jpg"/>'+
			                           				   		'<br>'+
			                           				   		'<b> Master Card Ǹ� DDA ��������� Standard 545421 ������� ����</b></td>'+
			                           				   	'</tr>'+
			                               				 	'<tr>'+
		                               				   		'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s1.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ��������� ��������  VISA Gold 405845 �����</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s2.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Gold 528686 ������ </b></td>'+
		                               				 	'</tr>'+
		                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s3.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Gold 554558 �����</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s4.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Virtual 502003 �������� </b></td>'+
		                               				 	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s5.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Visa ��������� ��������  VISA Gold 405845 ������</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s6.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card ��������� �������� Business 5586 ������� </b></td>'+
		                               				   	'</tr>'+
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s7.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card Ǹ� DDA ��������� Standard 545421 �����</b></td>'+
			                               				   	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s8.jpg"/>'+
		                               				   		'<br>'+
		                               				   		'<b> Master Card Ǹ� DDA ���������  Standard 528686 ������� ���� </b></td>'+
		                               				   	'</tr>'+	
		                               				   	'</tr>'+
			                               				 	'<tr>'+
			                               				 	'<td><img width="160" height="100" border="0" alt="" src="/portal/img/s9.jpg"/>'+
		                            				   		'<br>'+
		                            				   		'<b> Master Card ��������� �������� Platinum 528686 ��������</b></td>'+
			                               				   	'<td></td>'+
		                            				   	'</tr>'+
	                                            	'</table>'
                                        } 
                                     
                                    	
                                   ]
                         }           
                        ] 
                        
            }
        ],
        
        loadData : function(data) {
        	this.setTitle("�������� ������� ����������� ����");        	
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