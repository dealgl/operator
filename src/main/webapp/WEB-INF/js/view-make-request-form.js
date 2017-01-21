/**
 *  multi request param form  
 */

(function() {
	
	  var _viewSpec = Ext.id();
	  var _vacancy = Ext.id();
	  var _vacancyBank= Ext.id();
	  var _district= Ext.id();
	  var _ageFrom = Ext.id();
	  var _ageTo = Ext.id();
	  var _salaryFrom = Ext.id();
	  var _salaryTo = Ext.id();  
	  
	  var  sex=''; 
	
	var store = new Ext.data.Store({
		autoDestroy: true,
        reader: new Ext.data.JsonReader({
            root: 'spec',
            fields: 
           	['id','name']
        })
    });

	var sm = new Ext.grid.CheckboxSelectionModel({
		singleSelect:false
	});
	
	var sectionSelect = new Ext.form.ComboBox( {
		fieldLabel : '����. �������',
		width : 400,
		hiddenName : 'id',
		valueField : 'section',
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : 'dictionary/get-section.html'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'info'
			}, [ {name : 'section'},
			     {name : 'id'},
			     
			     ])
		}),
		allowBlank : true,
		emptyText : '�������� �������',
		displayField : 'section',
		loadingText : '�����...',
		triggerAction : 'all',
        listeners : {
        select : function(combo, record) {
			Ext.Ajax.request( {
				url : 'request/get-specialization.html',
				params : {
					id : record.data.id
				},
				timeout : 10 * 60 * 1000, // 10 min
				waitMsg : '��������� �� �������',
				success : function(xhr) {
					var answer = Ext.decode(xhr.responseText);
					if (answer.success) {
						container.loadData(answer);
			} else if (answer.code == 'login') {
				App.ui.sessionExpired();
			} else {
				App.ui.error('��������� ������ �������', answer.message);
			}
		},
		failure : function() {
			App.ui.error('������ ����������');
		}
			});
        }
    }
	});
	
    var specGrid =new Ext.grid.GridPanel ({
    	height:180,
    	columnLines : true,
        autoScroll: true,
        store: store,
        columns: [
            new Ext.grid.RowNumberer({width: 30}),
            sm,
            {
                header: '��������',
                width: 500,
                sortable : true,
                dataIndex: 'name'
            }
        ],
        viewConfig : {
            forceFit: true,
            stripeRows: true,
            emptyText: '������ �� �������'
        },
        sm : sm
    });
	
    var sexRadioGroup = new Ext.form.RadioGroup({
        xtype : 'radiogroup',
        fieldLabel : '���',
        //style : 'margin-left: 10px;margin-right: 10px',
        width : 300,
        columns : 1,
        items: [
            {
                boxLabel: '�� ����� ��������',
                name: 'all',
                //checked : true,
                inputValue: 1
            },
            {
            	boxLabel: '�������',
                name: 'all',
                inputValue: 2
            },
            {
            	boxLabel: '�������',
                name: 'all',
                inputValue: 3
            }
        ],
        listeners :{
                change : function(self, radio) {
    			if (radio.inputValue == 1){
    				sex ='-1';
    			}			
    			if (radio.inputValue == 2){
        			sex ='0';
        		}		
    			if (radio.inputValue == 3){
        			sex ='1';
        		}
    	 
    				//Ext.getCmp(_fromDate).setDisabled(radio.inputValue == 1);
                    //Ext.getCmp(_toDate).setDisabled(radio.inputValue == 1);
        		}
            }

    });
    
    var employmentType = new Ext.form.CheckboxGroup({
        xtype: 'checkboxgroup',
        fieldLabel: '¸� ����¾�¸',
        itemCls: 'x-check-group-alt',
        columns: 1,
        items: [
            {boxLabel: '������ ���������', name: 'cb-col-1'},
            {boxLabel: '��������� ���������', name: 'cb-col-2'/*, checked: true*/},
            {boxLabel: '��������� ������', name: 'cb-col-3'},
            {boxLabel: '������������', name: 'cb-col-4'},
            {boxLabel: '����������', name: 'cb-col-5'}
        ]
    });
    
    var expirienceType = new Ext.form.CheckboxGroup({
        xtype: 'checkboxgroup',
        fieldLabel: '���� ������',
        itemCls: 'x-check-group-alt',
        columns: 1,
        items: [
            {boxLabel: '��� �����', name: 'cb-col-1'},
            {boxLabel: '�� 1 ���� �� 3 ���', name: 'cb-col-2'/*, checked: true*/},
            {boxLabel: '�� 3 �� 6 ���', name: 'cb-col-3'},
            {boxLabel: '����� 6 ���', name: 'cb-col-4'}
        ]
    });
    
	container = new Ext.FormPanel({
		id :'view-make-request-form-component',
		frame :true,
	    closable : true,
	    header : false,
	    autoScroll : true,
		labelWidth : 100,
		items : {
			xtype : 'panel',
			frame : true,
			autoScroll : true,
			items : {
				xtype : 'panel',
				frame : true,
				items : {
					xtype : 'fieldset',
					autoHeight : true,
					defaultType : 'textfield',
					items : [
						    {
							xtype : 'fieldset',
							border : false,
							style : 'padding:10;margin:10;',
							layout : 'column',
							items : [
    				    		 {
							     	xtype : 'fieldset',
							     	border : false,
							     	style : 'padding:10;margin:10;',
							     	layout : 'column',
							     	items : [
							     				{
							     			         xtype : 'fieldset',
							     			         border : false,
							     			         style : 'padding:0;margin:0;',
							     			         labelWidth : 150,
							     			         items : [	
							     			                  	{
							     			                  	id : _vacancy,
							     		                  		xtype : 'textfield',
							     								fieldLabel : '������������ ��������',
							     								allowBlank : true,
							     								width :500,
							     								name : 'filtr'
							     			                  	},
							     			                  	/*{
								     			                  	id : _vacancyBank,
								     		                  		xtype : 'textfield',
								     								fieldLabel : '�������� � �� ������',
								     								allowBlank : true,
								     								width :200,
								     								name : 'filtrBank'
							     			                  	},*/
							     			                  	
							     			                   {
							     									id : _vacancyBank,
							     			                  		xtype : 'combo',
							     									width : 150,
							     									fieldLabel : '�������� � �� ������',
							     									mode : 'local',
							     									hiddenName : 'SITE',
							     									valueField : 'name',
							     									displayField : 'name',
							     									triggerAction : 'all',
							     									typeAhead : true,
							     									forceSelection : true,
							     									selectOnFocus : true,
							     									allowBlank : false,
							     									emptyText : '�������� � �� ������',
							     									store : new Ext.data.ArrayStore({
							     												fields : ['id', 'name'],
							     												data : [
							     														['0','��'],
							     														['1','���'],
							     														['2','������'],
							     														]
							     											}),
							     											listeners : {
							     												select : function(combo, rec) {
							     																				}
							     														}
							     								},
							     			                  	
							     			                  	{
							     			                  		id : _district,
							     			                  		xtype : 'combo',
							     			                  		emptyText:'������� �����',
							     			                  		fieldLable:'Test',
							     			                  		store: new Ext.data.Store({
							     			                  			proxy:new Ext.data.HttpProxy({
							     			                  				url:'dictionary/get-regions-by.html'
							     			                  			}),
							     			                  			reader:new Ext.data.JsonReader({
							     			                  				root:'answer',
							     			                  				totalProperty:'total'
							     			                  			},[
							     			                  			   {
							     			                  				   name:'name'
							     			                  			   }
							     			                  			   ]
							     			                  			
							     			                  			)
							     			                  			
							     			                  		}),
							     			                  		minChars: 2,
							     			                  		displayField :'name',
							     			                  		typeAhead:false,
							     			                  		width :200,
							     			                  		loadingText:'�����...',
							     			                  		hideTrigger:true,
							     			                  		queryParam:'startString',
							     			                  		listeners : {
							     			                  			beforequery:function(qe){
							     			                  				qe.query=qe.combo.getValue();
							     			                  			}
							     			                  			
							     			                  		}
							     			                  		
							     			                  	}
							     			                  	
							     			                  ]
							     				}
							     				
							     				
							     			                  
							     	         ]
							     	}/*,


							         
					  {
						xtype : 'fieldset',
						title : '������ ������',
						autoHeight : true,
						defaultType : 'textfield',
						items : [
						         
						         
						         
						         
						         {
							xtype : 'combo',
							width : 150,
							fieldLabel : '����',
							mode : 'local',
							hiddenName : 'SITE',
							valueField : 'id',
							displayField : 'name',
							triggerAction : 'all',
							typeAhead : true,
							forceSelection : true,
							selectOnFocus : true,
							allowBlank : false,
							emptyText : '���������� ������� ����',
							store : new Ext.data.ArrayStore({
										fields : ['id', 'name'],
										data : [
												['0','HeadHunter.ru'],
												['1','SuperJob.ru']]
									}),
									listeners : {
										select : function(combo, rec) {
																		}
												}
									}
					
									]
					  	}*/
					  				]
					    		},
					    		 {
									xtype : 'fieldset',
									border : false,
									style : 'padding:10;margin:10;',
									layout : 'column',
									items : [
												{
											         xtype : 'fieldset',
											         border : false,
											         style : 'padding:0;margin:0;',
											         labelWidth : 100,
											         columnWidth : .70,
											         items : [	sectionSelect
											                  ]
												}
									         ]
					    		 },
					    		 {
					    			 	id : _viewSpec,
					    			 	xtype : 'panel',
						                frame : true,
						                collapsible : true,
						                title: '�������������',
						                items :[
						                        {
						                           	xtype:'fieldset',
						                            autoHeight: true,
						                            items :[
						                                    specGrid	
													]
						                        }
										]
						                        
						            },
						            {
									xtype : 'fieldset',
									border : false,
									style : 'padding:10;margin:10;',
									layout : 'column',
									items : [
												{
													xtype : 'label',
													text :'������� ��'
										     	},
										     	{
													id : _ageFrom,
													xtype : 'textfield',
													allowBlank : false,
													style : 'margin-left: 10px;margin-right: 10px',
													name : 'ageFrom',
													width :40,
												},
												{
													xtype : 'label',
													text :'  �� '
										     	},
										     	{
													id : _ageTo,
													xtype : 'textfield',
													allowBlank : false,
													style : 'margin-left: 10px;margin-right: 100px',													name : 'ageTo',
													width :40,
												},
												{
													xtype : 'label',
													text :'  ����������� '
										     	},
												{
													xtype : 'combo',
													width : 200,
													fieldLabel : '�����������',
													mode : 'local',
													style : 'margin-left: 10px',
													hiddenName : 'education',
													valueField : 'id',
													displayField : 'name',
													triggerAction : 'all',
													typeAhead : true,
													forceSelection : true,
													selectOnFocus : true,
													emptyText : '�� ����� ��������',
													store : new Ext.data.ArrayStore({
																fields : ['id', 'name'],
																data : [
																		['0','������'],
																		['1','������ ��������'],
																		['2','������ �������'],
																		['3','������ �������� ����'],
																		['4','������ ������ ����'],
																		['5','������������� ������'],
																		['6','�������'],
																		['7','������� �����������']
																		 ]
															}),
															listeners : {
																select : function(combo, rec) {
																								}
																		}
												}
									         ]
						            },
						            {
										xtype : 'fieldset',
										border : false,
										style : 'padding:10;margin:10;',
										layout : 'column',
										items : [
													{
														xtype : 'label',
														text :'������° ��'
											     	},
											     	{
														id : _salaryFrom,
														xtype : 'textfield',
														style : 'margin-left: 10px;margin-right: 10px',
														name : 'salaryFrom',
														allowBlank : false,
														width :100,
													},
													{
														xtype : 'label',
														text :'  �� '
											     	},
											     	{
														id : _salaryTo,
														xtype : 'textfield',
														style : 'margin-left: 10px;margin-right: 10px',
														name : 'salaryTo',
														allowBlank : false,
														width :100,
													},
													{
														xtype : 'combo',
														width : 70,
														mode : 'local',
														hiddenName : 'currency',
														valueField : 'id',
														displayField : 'name',
														triggerAction : 'all',
														typeAhead : true,
														forceSelection : true,
														selectOnFocus : true,
														store : new Ext.data.ArrayStore({
																	fields : ['id', 'name'],
																	data : [
																			['0','RUR'],
																			['1','EUR'],
																			['1','USD']
																			 ]
																}),
																listeners : {
																	select : function(combo, rec) {
																									}
																			}
													}
													
										
										         ]
							            },
										sexRadioGroup,
										employmentType,
										expirienceType
					    		]
				}
			}
		},
		tbar : [	
			{
		       	xtype : 'button',
		       	text : '�����',					   	
			   	handler : function() {
				//alert(Ext.getCmp(_vacancyBank).getValue());
				if (Ext.getCmp(_ageFrom).getValue()==''){
					App.ui.error('���������� ��������� ���������� ���� "������� ��"');
				} else
				if (Ext.getCmp(_ageTo).getValue()==''){
					App.ui.error('���������� ��������� ���������� ���� "������� ��"');
				} else
				if (Ext.getCmp(_salaryFrom).getValue()==''){
						App.ui.error('���������� ��������� ���������� ���� "������° ��"');
				} else
				if (Ext.getCmp(_salaryTo).getValue()==''){
					App.ui.error('���������� ��������� ���������� ���� "������° ��"');
				} else
				if (Ext.getCmp(_vacancy).getValue()==''){
					App.ui.error('���������� ��������� ���������� ���� "������������ ��������"');
				} else
				Ext.Ajax.request( {
					url : 'test/test.html',
					params : {
						vacancyFiltr : Ext.encode(Ext.getCmp(_vacancy).getValue()),
						vacancyBank : Ext.getCmp(_vacancyBank).getValue(),
						sexFormValue : sex,
						salaryFrom :  Ext.getCmp(_salaryFrom).getValue(),
						salaryTo : Ext.getCmp(_salaryTo).getValue(),
						ageFrom : Ext.getCmp(_ageFrom).getValue(),
						ageTo :	Ext.getCmp(_ageTo).getValue(),
						district : Ext.getCmp(_district).getValue()
					},
					timeout : 10 * 60 * 1000, // 10 min
					waitMsg : '������ � �����...',
					success : function(xhr) {
						var answer = Ext.decode(xhr.responseText);
						if (answer.success) {
							var ret = answer.message;
							Ext.MessageBox.show( {
								title : '����������',
								msg : '�������������� ������ �������� ��� ��������� � ���� "������ ����������"',
								buttons : Ext.MessageBox.OK,
								icon : Ext.MessageBox.INFO
							});
							container.loadData(answer);
				} else if (answer.code == 'login') {
					App.ui.sessionExpired();
				} else {
					App.ui.error('��������� ������ �������', answer.message);
				}
			},
			failure : function() {
				App.ui.error('������ ����������');
			}
				});

				
				
				
			   	}
		    },
		    "-",
			{
		       	xtype : 'button',
		       	text : '�������� �����',					   	
			   	handler : function() {
				
			   	}
		    }
		],
		setWindow : function(window) {
			this.window = window;
		},
		
		loadData : function(data) {
			this.data = data;
			
			Ext.layout.FormLayout.prototype.trackLabels = true;
			store.loadData(data);
			
			this.setTitle("������������ ������� ������ ��� �������<br/>");
			
		}
	});	
	
return container;

})();
