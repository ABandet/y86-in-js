var ExecutionView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#tmpl_execution').html());
        this.registers = new RegistersView();
        this.$objcode = new ObjectCodeView(this.objectCode);
        this.memview = new MemoryView();
        this.processorstate = new ProcosserStateView();
        this.listenTo(Backbone.Events, 'app:redraw', this.updateRegisters);
        this.listenTo(Backbone.Events, 'app:redraw', this.updateProcState);
        $(window).on('resize', this.resizeObjectView.bind(this));
        this.render();
    },

    render: function () {
        this.memview.resize();
        this.$el.empty().html(this.template());

        this.$('.processorstate').append(this.processorstate.$el);
        this.$('.object').append(this.$objcode.$el);
        this.$('.registers-wrapper').append(this.registers.$el);
        this.$('.memory').empty().append(this.memview.$el);
        window.setTimeout(function () {
            this.resizeObjectView();
        }.bind(this), 0);
    },

    updateProcState() {
        this.processorstate.render();
    },

    updateRegisters: function () {
        this.registers.render();
    },

    setObjectCode: function (code) {
        this.objectCode = _.clone(code);

        this.objectCode.obj = _.map(code.obj.split('\n'));

        this.$objcode.setObjectCode(this.objectCode);
    },

    resizeObjectView: function () {
        var $lines = this.$objcode.$('.lines-wrapper');
        $lines.height($(window).height() - $lines.position().top );
    }
});