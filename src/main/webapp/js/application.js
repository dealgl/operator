/**
 *  Application UI
 */

// Show a progress bar during all Ajax requests

Ext.Ajax.on('beforerequest', function(conn, opts) {
    if (opts.waitMsg) {
        Ext.MessageBox.wait(opts.waitMsg, 'Wait please...', {animate : true});
    }
});

Ext.Ajax.on('requestcomplete', function() {
    Ext.MessageBox.hide();
});

Ext.Ajax.on('requestexception', function() {
    Ext.MessageBox.hide();
});

Ext.namespace('App.ui', 'App.util.Format', 'App.Ajax');

App.util.Format = (function() {
    return{
        ruMoney : function(val) {
            val = "" + val;
            val = val.replace(",", ".");
            return Ext.util.Format.usMoney(val).replace(/,/gi, " ").replace(".", ",").replace("$", "") + " ���";
        },

        ruPercent : function(val, format) {
            val = '0' + val.replace(",", ".");
            return  Ext.util.Format.number(val, format ? format : '0.0000').replace(/,/gi, " ").replace(".", ",") + ' %';
        },

        ruPercent100 : function(val, format) {
            val = '0' + val.replace(",", ".");
            return  Ext.util.Format.number(100 * val, format ? format : '0.0000').replace(/,/gi, " ").replace(".", ",") + ' %';
        },
        ruRound : function(val,format) {
            return  Ext.util.Format.number(val, format ? format : '0.00');
        }
    };
})();


App.ui.error = function (text, additional, callback) {
    var msg = String.format(text);
    if (additional) {
        msg += String.format('<br/><br/><span class="z-tooltip">' + additional + '</span>');
    }
    Ext.MessageBox.show({
        title: 'Error',
        msg: msg,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR,
        fn : callback
    });
};


App.ui.executeCall = function (index,storeSize,store) {
	
	if (index>=storeSize){
		App.ui.error('������� ������ ������');								
		return;
	}

	var item = store.getAt(index);
	var idr = item.data.id;

	Ext.Ajax.request( {
		url : 'resume/get-auto-call-session.html',
		params : {
			idr : idr
		},
		timeout : 10 * 60 * 1000, // 10 min
		waitMsg : '����������� ����������',
		success : function(xhr) {
			var answer = Ext.decode(xhr.responseText);
			if (answer.success) {
				index++;
				menu.showResumeInfo(idr,index);
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
	
	
};


App.ui.executeExtCall = function (index,storeSize,store) {
	
	if (index>=storeSize){
		App.ui.error('������� ������ ������');								
		return;
	}

	var item = store.getAt(index);
	var idr = item.data.phone;
	var id = item.data.id;
	//alert(idr);
	Ext.Ajax.request( {
		url : 'resume/get-auto-call-ext-session.html',
		params : {
			idr : idr
		},
		timeout : 10 * 60 * 1000, // 10 min
		waitMsg : '����������� ����������',
		success : function(xhr) {
			var answer = Ext.decode(xhr.responseText);
			if (answer.success) {
				index++;
				menu.showExtResumeInfo(id,index);
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
	
	
};

App.ui.message = function (text, additional, callback, animEl) {
    var msg = String.format(text);
    if (additional) {
        msg += String.format('<br/><br/><span class="z-tooltip">{0}</span>', additional);
    }
    Ext.MessageBox.show({
        title: 'Information',
        msg: msg,
        modal : true,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.INFO,
        fn : callback,
        animEl : animEl
    });
};

App.ui.confirm = function(text, callback) {
    Ext.MessageBox.confirm('Подтверждение', text, function(button) {
        if (button == 'yes') callback.call(this);
    });
};

App.ui.sessionExpired = function () {
    var msg = 'Session expired.Please log on!';
    Ext.MessageBox.show({
        title: 'Error',
        msg: msg,
        buttons: Ext.MessageBox.OK,
        icon: Ext.MessageBox.ERROR,
        fn : function() {
            window.location = '';
        }
    });
};

App.ui.HeaderPanel = Ext.extend(Ext.Panel, {
    constructor : function(config) {
        Ext.apply(this, config);
        App.ui.MainMenu.superclass.constructor.call(this);
    }
});

App.ui.View = Ext.extend(Ext.TabPanel, {
    autoScroll: true,
    enableTabScroll: true,
    activeTab : 0,
    resizeTab : true,
    layoutOnTabChange : true,
    constructor : function(config) {
        Ext.apply(this, config);
        App.ui.View.superclass.constructor.call(this, config);
    },
    onAction : function(ct, viewName, data) {
        var id = viewName + '-component';
        
        if (id == 'view-portfolio-data-grid-component') {
       	 this.remove('view-portfolio-data-grid-component');
     }
        if (id == 'view-make-request-form-component') {
          	 this.remove('view-make-request-form-component');
        }

        if (id == 'view-params-resume-form-component') {
         	 this.remove('view-params-resume-form-component');
       }
        
        if (id == 'view-set-rates-form-component') {
        	 this.remove('view-set-rates-form-component');
      }
        if (id == 'view-get-clients-form-component') {
            this.remove('view-get-clients-form-component');
        }

        if (id == 'view-check-clients-form-component') {
            this.remove('view-check-clients-form-component');
        }

        if (id == 'view-get-messages-form-component') {
            this.remove('view-get-messages-form-component');
        }
        if (id == 'view-message-list-form-component') {
            this.remove('view-message-list-form-component');
        }
        if (id == 'view-all-messages-form-component') {
            this.remove('view-all-messages-form-component');
        }

        if (id == 'view-all-not-checked-client-form-component') {
            this.remove('view-all-not-checked-client-form-component');
        }

        if (id == 'view-check-clients-form-info-component') {
            this.remove('view-check-clients-form-info-component');
        }

        if (id == 'change-password-component') {
            this.remove('change-password-component');
        }

        if (id == 'view-reg-attempts-form-component') {
            this.remove('view-reg-attempts-form-component');
        }


        var cmp = this.getItem(id);
        if (!cmp) {
            // will load from sever
            var self = this;
            Ext.Ajax.request({
                url: 'view-dispatcher.html',
                params : {
                    viewName : viewName
                },
                success : function(xhr) {
                    try {
                        cmp = eval(xhr.responseText);
                        cmp.id = viewName + '-component';
                    } catch(Exception) {
                        try {
                            var msg = Ext.decode(xhr.responseText);
                            if (msg.code == 'login') {
                                App.ui.sessionExpired();
                            } else {
                                App.ui.error("Ошибка работы метода API!");
                            }
                        } catch(e) {
                            App.ui.error("Ошибка работы метода API!", e);
                        }
                        return;
                    }
                    if (data && cmp.loadData) {
                        cmp.loadData(data);
                    }
                    self.add(cmp);
                    self.doLayout();
                    self.scrollToTab(cmp, true);
                    self.activate(cmp);
                },
                failure: function() {
                    App.ui.error('Ошибка работы метода API!', 'Ошибка работы метода API!');
                }
            });
        } else {
            if (data) cmp.loadData(data, ct);
            this.scrollToTab(cmp, true);
            this.activate(cmp);
        }
    }

});

App.ui.SearchPanel = Ext.extend(Ext.FormPanel, {
    checkEmpty : function(str) {
        if (Ext.isEmpty(str, false)) {
            App.ui.error("Ошибка работы метода API!");
            return false;
        }
        return true;
    },

    onLoanerSearchClick : function() {
        var str = this.loanerSearchField.getValue();
        if (this.checkEmpty(str)) this.controller.searchLoaners(str);
    },

    onCreditSearchClick : function() {
        var str = this.creditSearchField.getValue();
        if (this.checkEmpty(str)) this.controller.searchCredits(str);
    },

    onRender : function() {
        Ext.QuickTips.register({
            target:this.loanerSearchField,
            text:'��� ������ ������� ĸ�'+
                 '<span style="font-size:xx-small">' +
                 '� ������� ������� �������������� ���������' +
                 '</span>'
        });
        Ext.QuickTips.register({
            target:this.creditSearchField,
            text:'��� ������ ������� ����� ������� <br/>������� ��� �������� ��������.<br/>'
        });
        App.ui.SearchPanel.superclass.onRender.apply(this, arguments);
    },

    constructor : function(config) {
        this.loanerSearchButton = new Ext.Button({
            text : Ext.isIE ? '����� �������������' : '����� ����� ���������',
            width : 150
        });

        this.loanerSearchField = new Ext.form.TextField({
            width : 155
        });

        this.creditSearchButton = new Ext.Button({
            text : Ext.isIE ? '����� ������' : '����� ��������� ������',
            width : 150
        });

        this.creditSearchField = new Ext.form.TextField({
            width : 155
        });

        this.loanerSearchButton.on('click', this.onLoanerSearchClick, this);

        this.creditSearchButton.on('click', this.onCreditSearchClick, this);
        
        config = Ext.apply(config || {}, {
            layout : 'fit',
            items : [
                {
                    xtype : 'fieldset',
                    title : '�����',
                    collapsible : true,
                    defaults : {
                        xtype : 'fieldset',
                        layout : 'column',
                        border : false,
                        style : 'margin:0;padding:2px 0 0 0;',
                        defaults : {
                            columnWidth : .5
                        }
                    },
                    items : [
                        {
                            items : [
                                this.loanerSearchField,
                                this.loanerSearchButton
                            ]
                        }
                        ,
                        {
                            items : [
                                this.creditSearchField,
                                this.creditSearchButton
                            ]
                        }
                    ]
                }
            ]
        });
        App.ui.SearchPanel.superclass.constructor.apply(this, arguments);
    }
});

App.ui.MainMenu = Ext.extend(Ext.Panel, {
    region:'west',
    split:true,
	collapsible: true,
    width:200,
    minWidth: 200,
    autoScroll: true,
    header: false,
    items : this.items,
    listeners : this.listeners,
    constructor : function(config) {
        Ext.apply(this, config);
        this.items = [];
        Ext.each(config.items, function(item, index) {
            this.items.push(new Ext.Panel({
                id: 'action-panel-section-' + index,
                frame:true,
                title: item.title,
                collapsible: true,
                collapsed : false,
                contentEl: item.contentEl
            }));
        }, this);
        this.listeners = config.listeners;
        App.ui.MainMenu.superclass.constructor.call(this);
    },

    initComponent : function() {
        App.ui.MainMenu.superclass.initComponent.call(this);
        this.addEvents('action');
    },

    // private
    submitData : function(ct, dataUrl, params, callback, showWaitMsg) {
        Ext.Ajax.request({
            url: dataUrl,
            //timeout: 60 * 1000, // 1 min
            timeout:1000000000,
            params : params,
            waitMsg: showWaitMsg == undefined || showWaitMsg ? 'Searching in database...' : null,
            success: function(xhr) {
                var answer = Ext.decode(xhr.responseText);
                if (answer.success && answer.success === true) {
                    if (callback) {
                        callback.call(ct, answer);
                    }
                } else if (answer.code == 'login') {
                    App.ui.sessionExpired();
                } else {
                    App.ui.error('Ошибка работы метода API!', answer.message);
                }
            } ,
            failure : function () {
                App.ui.error('Ошибка работы метода API!');
            }
        });
    },

    // private
    submitDataRequest : function(ct, viewName, dataUrl, params) {
        this.submitData(ct, dataUrl, params, function(answer) {
            ct.fireEvent('action', this, viewName, answer);
        }, true);
    },

    // private
    showModalForm : function(ct, viewName, data, callback) {
        Ext.Ajax.request({
            url: 'view-dispatcher.html',
            params : {
                viewName : viewName
            },
            success : function(xhr) {
                try {
                    var cmp = eval(xhr.responseText);
                    cmp.id = viewName + '-component';
                    var win = new Ext.Window({
                        layout:'fit',
                        width: cmp.width || 800,
                        height: cmp.height || 600,
                        plain: true,
                        modal: true,
                        border : false,
                        items: cmp
                    });
                    if (cmp.setWindow) cmp.setWindow(win);
                    win.doLayout();
                    if (cmp.loadData) {
                        cmp.loadData(data, callback);
                    }
                    win.show();
                } catch(Exception) {
                    try {
                        var msg = Ext.decode(xhr.responseText);
                        if (msg.code == 'login') {
                            App.ui.sessionExpired();
                        } else {
                            App.ui.error("Ошибка работы метода API!");
                        }
                    } catch(Exception) {
                        App.ui.error("Ошибка работы метода API!");
                    }
                }
            },
            failure: function() {
                App.ui.error('Ошибка работы метода API!', 'Ошибка работы метода API!');
            }
        });
    },

    // private
    showModal : function(ct, viewName, dataUrl, params) {
        if (dataUrl) {
            this.submitData(ct, dataUrl, params, function(answer) {
                this.showModalForm(ct, viewName, answer);
            });
        } else {
            this.showModalForm(ct, viewName);
        }
    },

    // private
    showPane : function(ct, viewName) {
        ct.fireEvent('action', this, viewName);
    }
});

App.Ajax.request = function(config) {
    var cfg = {
        success : function(xhr) {
            var answer = Ext.decode(xhr.responseText);
            if (answer.success) {
                if (this.onSuccess) this.onSuccess.call(this, answer);
                if (this.statusBar) this.statusBar.setStatus({
                    text : this.successText || 'Done!',
                    iconCls : 'x-status-valid',
                    clear: {wait: 8000, anim: true, useDefaults: false}
                });
            } else if (answer.code == 'login') {
                App.ui.sessionExpired();
            } else {
                if (this.statusBar) {
                    this.statusBar.setStatus({
                        text : this.errorText || 'Ошибка работы метода API!',
                        iconCls : 'x-status-error',
                        clear: {wait: 8000, anim: true, useDefaults: false}
                    });
                }
                if (answer.code == 'business') {
                    App.ui.error(answer.message);
                } else {
                    App.ui.error('Ошибка работы метода API!', answer.message + '\n' + answer.code);
                }
            }
        },
        failure : function(xhr) {
            if (this.statusBar) this.statusBar.setStatus({
                text : 'Error during operation',
                iconCls : 'x-status-error',
                clear: {wait: 8000, anim: true, useDefaults: false}
            });
            Ext.MessageBox.show({
                title: 'Error',
                msg: xhr.statusText,
                buttons: Ext.MessageBox.OK,
                icon: Ext.MessageBox.ERROR
            });
        }
    };
    Ext.apply(cfg, config);
    cfg.scope = cfg;
    if (cfg.statusBar) cfg.statusBar.showBusy({text: cfg.busyText || 'Requesting...'});
    return Ext.Ajax.request(cfg);
};