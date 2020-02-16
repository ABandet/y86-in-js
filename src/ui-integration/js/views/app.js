var AppView = Backbone.View.extend({
	initialize: function () {
		this.template = _.template($('#tmpl_app').html());
		this.editor = new EditorView();
		this.execution = new ExecutionView();
		// this.instrSet = new InstructionView();
		this.hcl_editor = new HclEditorView();
		this.input = document.getElementById("input"); // the input item defined in index.html
		this.input.addEventListener("change", handleFile, false);
		this.listenTo(Backbone.Events, 'app:redraw', this.redrawButtons);
		this.listenTo(Backbone.Events, 'app:load', this.loadFile);
		$(window).on('load', this.resizeViews.bind(this));
		this.render();
	},

	events: {
		'click #compile': 'compile',
		'click #reset': 'reset',
		'click #continue': 'continue',
		'click #step': 'step',
		'click #load': 'load',
		'click #save': 'save'
	},

	render: function () {
		this.$el.empty().append(this.template());
		this.$('#tab-0-content .tab-content-container').empty().append(this.editor.$el);
		this.$('#tab-1-content .tab-content-container').empty().append(this.execution.$el);
		// this.$('#tab-2-content .tab-content-container').empty().append(this.instrSet.$el);
		this.$('#tab-3-content .tab-content-container').empty().append(this.hcl_editor.$el);
		this.redrawButtons();
	},

	compile: function () {
		var obj = ASSEMBLE(this.editor.getSource());
		this.execution.setObjectCode(obj);
		if (obj.errors.length === 0)
			INIT(obj.obj);
		Backbone.Events.trigger('app:redraw');
		this.$('.continue span').text('Start');
	},

	reset: function () {
		RESET();
		this.$('.continue span').text('Start');
		Backbone.Events.trigger('app:redraw');
	},

	continue: function () {
		if (IS_RUNNING()) {
			PAUSE();
		} else if (STAT === 'AOK' || STAT === 'DBG') {
			this.$('.continue span').text('Pause');
			this.$('.step').addClass('disabled');
			RUN(this.triggerRedraw);
		}
	},

	step: function () {
		if (!IS_RUNNING() && (STAT === 'AOK' || STAT === 'DBG')) {
			STEP();
			Backbone.Events.trigger('app:redraw');
		}
	},

	load: function () {
		this.input.click(); // open file dialog
	},

	loadFile: function () {
		var data = this.input.data;
		// console.log(data);
		this.editor.setSource(data);
		RESET();
		this.$('.continue span').text('Start');
		Backbone.Events.trigger('app:redraw');
	},

	triggerRedraw: function () {
		Backbone.Events.trigger('app:redraw');
	},

	redrawButtons: function () {
		if (STAT === 'AOK' || STAT === 'DBG') {
			this.$('.continue span').text('Continue');
			this.$('.step, .continue').removeClass('disabled');
		} else {
			this.$('.step, .continue').addClass('disabled');
		}
	},

	resizeViews:function(){
		this.editor.resizeEditor();
		this.hcl_editor.resizeEditor();
		this.execution.resizeObjectView();
		this.execution.memview.resize();
	}

});

function handleFile() { // 'this' is the input item defined in index.html
	this.data = null;
	var file = this.files[0];
	var reader = new FileReader();
	reader.onloadend = (function (that) {
		return function (evt) {
			that.data = evt.target.result;
			Backbone.Events.trigger('app:load');
		};
	})(this);
	reader.readAsText(file);
}