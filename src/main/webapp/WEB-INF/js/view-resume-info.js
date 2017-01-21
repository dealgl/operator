/**
 * Organization Info view
 */

(function() {

	var container;
	var _USERID = Ext.id();
	var _USERFIRSTNAME = Ext.id();
	var _USERMIDDLENAME = Ext.id();
	var _USERLASTNAME = Ext.id();
	var _USERLOGIN = Ext.id();
	var _USERBIRTHDATE = Ext.id();
	var _USERROLE = Ext.id();
	var _POSITION = Ext.id();
	var _VOZRAST = Ext.id();
	var _SALARY = Ext.id();
	var _USERPOSITION = Ext.id();
	var _USERLOTUSADDRESS = Ext.id();
	var _USERPHONE = Ext.id();
	var _USERSEX = Ext.id();

	var _FLINFO = Ext.id();
	var _ADDRESSGRIDTBAR = Ext.id();
	var _NEWADDRESSBTN = Ext.id();
	var _EDITADDRESSBTN = Ext.id();
	var _DELADDRESSBTN = Ext.id();
	var _REFRESHADDRESSBTN = Ext.id();
	var _CONTACTGRIDTBAR = Ext.id();
	var _DELCONTACTBTN = Ext.id();
	var isExpandable = true;
	var _DOCUMENTGRIDTBAR = Ext.id();
	var _DOCUMENTFLOWGRIDTBAR = Ext.id();
	var _FILEGRIDTBAR = Ext.id();
	
	var _FIO = Ext.id();
	
	var _convCheck = Ext.id();
	var _nonConvCheck = Ext.id();
	var _commentConvCheck = Ext.id();
	
	var _CITIZENCHIP = Ext.id();
	var _ORDER = Ext.id();
	var _ROUTETIME = Ext.id();
	var _INLINE = Ext.id();
	var _COURSESGRIDTBAR = Ext.id();
	
	var faceId;
	var autoCall;
	
	var indexCnt;
	
	var phoneTextBox = {
		xtype : 'phonefield',
		width : 150
	};
	var _winFiles = Ext.id();

 	var storeAutoCall = new Ext.data.Store( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'listAutoCallResume',
			fields : [ 'id','fio']
		})
	});
	
	
	var contactStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'language',
			fields : [ 'id', 'name' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-language-info.html',
			params : {
            	faceId : faceId	
            }
		}),
		listeners : {
			beforeload : function(self, options) {
				self.setBaseParam ( 'faceId', faceId )
			}
		}
	});
	
	var coursesStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'courses',
			fields : [ 'id', 'name','period','organization' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-language-info.html',
			params : {
				faceId : faceId	
        	}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
		}
		
	});
	
	var skillsStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'skills',
			fields : [ 'id', 'name' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-skills-info.html',
			params : {
				faceId : faceId	
        	}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
		}
	});

	var aboutMeStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'abouts',
			fields : [ 'id', 'name' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-abouts-info.html',
			params : {
				faceId : faceId	
        	}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
		}
	});
	
	var recommendationStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'recommendations',
			fields : [ 'id', 'name','fio','contact' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-recommendations-info.html',
			params : {
				faceId : faceId	
        	}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
		}
	});
	
	var contactCombo = new Ext.form.ComboBox( {
		width : 280,
		mode : 'local',
		name : 'contact',
		valueField : 'id',
		displayField : 'name',
		triggerAction : 'all',
		store : new Ext.data.Store( {
			proxy : new Ext.data.HttpProxy( {
				url : 'customer/contact-list.html'
			}),
			reader : new Ext.data.JsonReader( {
				root : 'contacts'
			}, [ {
				name : 'id'
			}, {
				name : 'name'
			} ])
		})
	});
	var imageStore = new Ext.data.JsonStore( {
		url : 'employee/get-image.html',
		root : 'images',
		fields : [ 'name', 'url', {
			name : 'size',
			type : 'float'
		} ]
	});
	var tpl = new Ext.XTemplate('<tpl for=".">',
			'<div class="thumb-wrap" id="{name}">',
			'<div class="thumb"><img src="{url}" title="{name}"></div>',
			'<span class="x-editable">{shortName}</span></div>', '</tpl>',
			'<div class="x-clear"></div>');
	
	var eduStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'education',
			fields : [ 'id', 'name', 'period' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-education-info.html',
			params : {
				faceId : faceId	
    		}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
	}
	});
	
	var phoneStore = new Ext.data.GroupingStore( {
		autoDestroy : true,
		reader : new Ext.data.JsonReader( {
			root : 'phone',
			fields : [ 'id', 'name', 'value' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-phone-info.html',
			params : {
				faceId : faceId	
			}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
	}
	});
	
	var documentStore = new Ext.data.Store( {
		reader : new Ext.data.JsonReader( {
			root : 'experience',
			fields : [ 'id', 'period', 'company', 'vacancy', 'descr']
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-experience-info.html',
			params : {
				faceId : faceId	
			}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
	}
	});
	
	var smflow = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true
	});
	var documentflowStore = new Ext.data.Store( {
		reader : new Ext.data.JsonReader( {
			root : 'status',
			fields : [ 'id', 'status','comment' ]
		}),
		proxy : new Ext.data.HttpProxy( {
			url : 'dictionary/get-status-resume-info.html',
			params : {
				faceId : faceId	
			}
		}),
		listeners : {
		beforeload : function(self, options) {
			self.setBaseParam ( 'faceId', faceId )
		}
		}
	});
	
	var documentflowGrid = new Ext.grid.GridPanel( {
		store : documentflowStore,
		enableHdMenu : true,
		autoHeight : true,
		autoScroll : true,
		frame : true,
		split : true,
		closable : true,
		selModel : smflow,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), smflow, {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������',
			width : 150,
			dataIndex : 'status',
			renderer: function(val) {
                if (val=='1'){
                	return '������������� ���������';
                }else
                if (val=='0'){
                	return '�������� �� ����';
                }
                else
                    if (val=='2'){
                    	return '�������� ��������';
                    }
                
			}
		},
		{
			header : '�����������',
			width : 150,
			dataIndex : 'comment'
		}
		],
		viewConfig : {
			forceFit : true,
			stripeRows : true,
			emptyText : '����� �� �������!'
		}

	});

	var recommendationGrid = new Ext.grid.GridPanel( {
		store : recommendationStore,
		enableHdMenu : true,
		autoHeight : true,
		autoScroll : true,
		frame : true,
		split : true,
		closable : true,

		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}),

		{
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '�����������',
			width : 100,
			dataIndex : 'name'
		}, {
			header : 'ĸ�',
			width : 150,
			dataIndex : 'fio'
		}, {
			header : '�������',
			width : 200,
			dataIndex : 'contact'
		}  ]
	});
	
	
	
	var coursesGrid = new Ext.grid.GridPanel( {
		store : coursesStore,
		enableHdMenu : true,
		autoHeight : true,
		autoScroll : true,
		frame : true,
		split : true,
		closable : true,

		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}),

		{
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������',
			width : 100,
			dataIndex : 'period'
		}, {
			header : '������������',
			width : 150,
			dataIndex : 'name'
		}, {
			header : '�����������',
			width : 200,
			dataIndex : 'organization'
		}  ]
	});
	
	var documentGrid = new Ext.grid.GridPanel( {
		store : documentStore,
		enableHdMenu : true,
		autoHeight : true,
		autoScroll : true,
		frame : true,
		split : true,
		closable : true,

		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}),

		{
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������ ������',
			width : 100,
			dataIndex : 'period'
		}, {
			header : '����� ������',
			width : 150,
			dataIndex : 'company'
		}, {
			header : '���������',
			width : 200,
			dataIndex : 'vacancy'
		}, {
			header : '�����������',
			width : 1600,
			dataIndex : 'descr'
		}  ]
	});

	var deleteContactButton = new Ext.Button( {
		id : _DELCONTACTBTN,
		text : 'Delete',
		handler : function(self) {
		}
	});

	var checkBoxSM = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true
	});
	var contactSM = new Ext.grid.CheckboxSelectionModel( {
		singleSelect : true
	});
	
	
	var skillsGrid = new Ext.grid.EditorGridPanel( {
		split : true,
		closable : true,
		frame : true,
		autoScroll : true,
		enableHdMenu : false,
		clicksToEdit : 2,
		stripeRows : true,
		store : skillsStore,
		autoHeight : true,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '�������� ������',
			width :700 ,
			dataIndex : 'name'
		}
		]
	});
	
	var aboutMeGrid = new Ext.grid.EditorGridPanel( {
		split : true,
		closable : true,
		frame : true,
		autoScroll : true,
		enableHdMenu : false,
		clicksToEdit : 2,
		stripeRows : true,
		store : aboutMeStore,
		autoHeight : true,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '��� ���',
			width :400 ,
			dataIndex : 'name'
		}
		]
	});
	
	
	
	var langGrid = new Ext.grid.EditorGridPanel( {
		split : true,
		closable : true,
		frame : true,
		autoScroll : true,
		enableHdMenu : false,
		clicksToEdit : 2,
		stripeRows : true,
		selModel : contactSM,
		store : contactStore,
		autoHeight : true,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), contactSM, {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������ ������',
			width :400 ,
			dataIndex : 'name'
		}
		]
	});
	var phoneGrid = new Ext.grid.EditorGridPanel( {
		split : true, // enable resizing
		closable : true,
		frame : true,
		autoScroll : true,
		enableHdMenu : false,
		clicksToEdit : 2,
		stripeRows : true,
		selModel : checkBoxSM,
		store : phoneStore,
		autoHeight : true,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), checkBoxSM, {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������������',
			width : 250,
			dataIndex : 'name'

		}, {
			header : '��������',
			width : 500,
			dataIndex : 'value'
		} ]

	});
	
	var eduGrid = new Ext.grid.EditorGridPanel( {
		split : true, // enable resizing
		closable : true,
		frame : true,
		autoScroll : true,
		enableHdMenu : false,
		clicksToEdit : 2,
		stripeRows : true,
		selModel : checkBoxSM,
		store : eduStore,
		autoHeight : true,
		columns : [ new Ext.grid.RowNumberer( {
			width : 30
		}), checkBoxSM, {
			header : 'id',
			hidden : true,
			width : 50,
			dataIndex : 'id'
		}, {
			header : '������',
			width : 250,
			dataIndex : 'period'

		}, {
			header : '��������',
			width : 500,
			dataIndex : 'name'
		} ]

	});

	var imagePanel = new Ext.form.FieldSet( {
		id : 'images-view',
		width : 200,
		height : 185,
		title : '����',
		items : new Ext.DataView( {
			store : imageStore,
			tpl : tpl,
			autoHeight : true,
			multiSelect : true,
			overClass : 'x-view-over',
			itemSelector : 'div.thumb-wrap',
			emptyText : 'No images to display'
		})
	});
	var winFiles = new Ext.Window(
			{
				title : '����� ���������� �����',
				layout : 'fit',
				width : 300,
				height : 90,
				plain : true,
				modal : true,
				border : false,
				items : [ {
					id : _winFiles,
					xtype : 'form',
					layout : 'fit',
					fileUpload : true,
					items : [ {
						xtype : 'hidden',
						name : 'UNID'
					}, {
						xtype : 'fileuploadfield',
						name : 'upload',
						buttonText : '�������',
						width : 290
					} ],
					buttons : [
							{
								xtype : 'button',
								text : '�������� ����',
								handler : function(self) {
									Ext
											.getCmp(_winFiles)
											.getForm()
											.submit(
													{
														url : 'externaldocuments/save-ext-doc.html',
														waitMsg : '���������� �����...',
														params : {
															code : id_sec
														},
														timeout : 30000,
														success : function(
																form, action) {
															App.ui
																	.message('���� ������� ��������!');
															winFiles.close();
															menu
																	.showUserProfile();
														},
														failure : function(
																form, action) {
															if (action.failureType == 'server') {
																var msg = Ext
																		.decode(action.response.responseText);
																App.ui
																		.error(msg.message
																				.replace(
																						/\n/g,
																						'<br/>'));
															} else if (action.failureType == 'connect') {
																App.ui
																		.error('Error during this operation');
															} else {
																App.ui
																		.error('Error during this operation');
															}
														}
													});
								}
							}, {
								text : '������',
								handler : function() {
									winFiles.close();
									menu.showUserProfile();
								}
							} ]
				} ]
			});
	var tabPanel = new Ext.TabPanel(
			{
				activeTab : 0,
				height : 250,
				items : [
						{
								title : '��������',
								iconCls : 'book-address',
								autoScroll : true,
								items : [ phoneGrid ]
						},
				         {
							title : '�����������',
							iconCls : 'book-address',
							autoScroll : true,
							items : [ eduGrid ]
						},
						{
							title : '������ ������',
							iconCls : 'telephone-key',
							autoScroll : true,
							items : [ langGrid ]
						},
						{
							title : '���� ������',
							iconCls : 'page-red',
							autoScroll : true,
							tabTip : 'Documents',
							items : [ documentGrid ],
							tbar : {
								id : _DOCUMENTGRIDTBAR,
								items : [ {
									xtype : 'button',
									text : '����� ��������t',
									handler : function() {
									}
								}, '-', {
									xtype : 'button',
									text : '��������',
									handler : function() {
									}
								} ]
							}
						},
						{
							title : '�������� ������',
							iconCls : 'page-red',
							autoScroll : true,
							tabTip : '�������� ������',
							items : [ skillsGrid ]
						},
						{
							title : '��� ���',
							iconCls : 'page-red',
							autoScroll : true,
							tabTip : '��� ���',
							items : [ aboutMeGrid ]
						},
						{
							title : '������������',
							iconCls : 'page-red',
							autoScroll : true,
							tabTip : '������������',
							items : [ recommendationGrid ]
						},

						{
							title : '��������� ������������, �����',
							iconCls : 'page-red',
							autoScroll : true,
							tabTip : 'Documents',
							items : [ coursesGrid ]
						},
						{
							title : '�����',
							iconCls : '����� ����������� �������������',
							autoScroll : true,
							tabTip : '����� ����������� �������������',

							items : [ documentflowGrid ],
							tbar : {
								id : _DOCUMENTFLOWGRIDTBAR,
								items : [
										{
											xtype : 'button',
											text : '������������� ���������',
											icon : '/arm-hr/img/vwicn082.gif',
											handler : function(self) {
												menu.showStatusSuccessForm(faceId);
											}
										},
										"-",
										{
											xtype : 'button',
											text : '� ������',
											icon : '/arm-hr/img/vwicn079.gif',
											handler : function(self) {
												menu.showStatusReserveForm(faceId);
											}
										},
										"-",
										{
											xtype : 'button',
											text : '�������� ��������',
											icon : '/arm-hr/img/vwicn081.gif',
											handler : function(self) {
												menu.showStatusDeclineForm(faceId);
											}
										}, "-", {
											xtype : 'button',
											text : '�������� �����',
											icon : '/portal/img/favicon.png',
											handler : function(self) {
												menu.showUserProfile();
											}
										},"-" ]
							}
						} ],
				listeners : {
					collapse : function(p) {
					},
					expand : function(p) {
						return isExpandable;
					}
				}

			}); 

	var statusView = new Ext.Panel(
			{
				layout : 'table',
				defaults : {
					style : {
						padding : '5px'
					}
				},
				layoutConfig : {
					columns : 2
				},
				items : [
						{
							html : '<span style="color:#3764A0;font-weight:bold;font-size:11px;">�������������� ������</span>'
						},
						{

							id :_convCheck,
							xtype : 'checkbox',
							checked : false,
							inputValue : '1',
							fieldLabel : '�������������� ������'
						},
						{	
							xtype : 'button',
							text : '����������',
							icon : '/portal/img/approve.gif',
							handler : function(self) {
							if (Ext.getCmp(_convCheck).getValue()==true){
								autoCall="1";
							}	else 
								autoCall="0";
							Ext.Ajax.request( {
								url : 'resume/set-auto-call.html',
								params : {
									autoCall :autoCall,
									face_id:faceId
								},
								timeout : 1000000000,
								waitMsg : '����������� ��������...',
								success : function(xhr) {
									var answer = Ext.decode(xhr.responseText);
									if (answer.success) {
										//menu.showUserProfile();
									} else if (answer.code == 'login') {
										App.ui
												.sessionExpired();
									} else {
										App.ui.error('External server error',answer.message);
									}
								},
								failure : function() {
									App.ui
											.error('Error!');
								}
							});
							
							}
					},
					{	
						xtype : 'button',
						text : '���������� ������� �������',
						icon : '/portal/img/approve.gif',
						handler : function(self) {
							App.ui.executeCall(indexCnt,storeAutoCall.getCount(),storeAutoCall);
						}
				}

					
					
						

				]
			});

	container = new Ext.FormPanel( {
		id : 'view-user-profile-component',
		frame : true,
		closable : true,
		header : false,
		autoScroll : true,
		labelWidth : 250,
		defaults : {
			style : {
				marginBottom : '5px'
			}
		},
		items : [ statusView, {
			xtype : 'panel',
			title : '���������� � ������������',
			frame : true,
			bodyStyle : 'padding:5px 5px 0',
			autoScroll : true,
			items : [ {
				xtype : 'fieldset',
				// border: false,
				title : '�������� ������������',
				labelWidth : 160,
				autoFit : true,
				layout : 'table',
				defaults : {
					style : {
					// padding: '20px'
				}
			},
			layoutConfig : {
				columns : 2
			},
			defaultType : 'textfield',
			items : [ {
				xtype : 'fieldset',
				border : false,

				labelWidth : 160,
				defaultType : 'textfield',
				items : [ {
					xtype : 'textfield',
					id : _FIO,
					width : 350,
					name : 'lastname',
					fieldLabel : 'ĸ�'
				},
				{
					xtype : 'panel',
					layout : 'form',
					width : 400,
					layoutConfig : {
						columns : 3
					},
					items : [ {
						xtype : 'panel',
						layout : 'form',
						items : [ {
							xtype : 'datefield',
							id : _USERBIRTHDATE,
							format : 'd.m.Y',
							width : 150,
							name : 'birthdate',
							fieldLabel : '���� ��������'
						} ]
					}/*, {
						xtype : 'radiogroup',
						id : _USERSEX,
						name : 'sex',
						padding : '0px',
						fieldLabel : '���',
						items : [ {
							boxLabel : '���',
							name : 'sex',
							inputValue : '0'
						}, {
							boxLabel : '���',
							name : 'sex',
							inputValue : '1'
						} ]
					}*/
					]
				}, {
					xtype : 'textfield',
					id : _POSITION,
					width : 250,
					name : 'position',
					fieldLabel : '���������'
				},
				{
					xtype : 'textfield',
					id : _VOZRAST,
					width : 250,
					name : 'vozrast',
					fieldLabel : '�������'
				},
				{
					xtype : 'textfield',
					id : _SALARY,
					width : 150,
					name : 'salary',
					fieldLabel : '�������� ��������'
				},
				{
					xtype : 'textfield',
					id : _CITIZENCHIP,
					width : 150,
					name : 'citizenship',
					fieldLabel : '�����������'
				},
				{
					xtype : 'textfield',
					id : _ORDER,
					width : 150,
					name : 'order',
					fieldLabel : '���������� �� ������'
				},
				{
					xtype : 'textfield',
					id : _ROUTETIME,
					width : 150,
					name : 'order',
					fieldLabel : '����������� ����� � ���� �� ������'
				},
				{
					xtype : 'textfield',
					id : _INLINE,
					width : 150,
					name : 'com',
					fieldLabel : '���������� � �������������'
				}

				]
			}, imagePanel ]
			}, {
				xtype : 'fieldset',
				id : _FLINFO,
				collapsible : true,
				collapsed : false,
				title : '�������������� ����������',
				items : [ tabPanel ]
			}

			]
		}

		],
		loadData : function(data) {
			this.setTitle("������ ���������");
			this.data = data;
		
			faceId = data['info'][0]['face_id'];
			Ext.getCmp(_FIO).setValue(data['info'][0]['face_fio']);
			Ext.getCmp(_USERBIRTHDATE).setValue(data['info'][0]['face_birth_date']);
			Ext.getCmp(_POSITION).setValue(data['info'][0]['face_job']);
			Ext.getCmp(_VOZRAST).setValue(data['info'][0]['face_age']);
			Ext.getCmp(_SALARY).setValue(data['info'][0]['face_fot']);
			
			if (data['addInfo'][0]['autoCall']==1) 
			{
				Ext.getCmp(_convCheck).setValue(true);
			} else 
				Ext.getCmp(_convCheck).setValue(false);
			
			Ext.getCmp(_CITIZENCHIP).setValue(data['addInfo'][0]['citizenship']);
			Ext.getCmp(_ORDER).setValue(data['addInfo'][0]['citizenship']);
			Ext.getCmp(_ROUTETIME).setValue(data['addInfo'][0]['routetime']);
			Ext.getCmp(_INLINE).setValue(data['addInfo'][0]['inLine']);
	
			eduGrid.getStore().load(data);
			langGrid.getStore().load(data);
			documentGrid.getStore().load(data);
			skillsGrid.getStore().load(data);
			aboutMeGrid.getStore().load(data);
			recommendationGrid.getStore().load(data);
			phoneGrid.getStore().load(data);
			documentflowGrid.getStore().load(data);
			
			storeAutoCall.loadData(data);
			indexCnt = data['countIndex'];
			
	}
	});
	return container;
})();