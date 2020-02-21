var HclEditorView = Backbone.View.extend({
    initialize: function () {
        this.template = _.template($('#tmpl_hcl_editor').html());
        this.annotate = this._annotate.bind(this);
        $(window).on('resize', this.resizeEditor.bind(this));
        this.render();
    },

    render: function () {
        this.$el.empty().append(this.template({
            hcl_code: $('#default_hcl_code').html()
        }));

        this.$hcl_editor = this.$('.hcl_code');
        this.hcl_editor = ace.edit(this.$hcl_editor.get(0));
        this.hcl_editor.setTheme('ace/theme/textmate');
        this.hcl_editor.getSession().setMode('ace/mode/hcl');
        this.hcl_editor.on('change', this.deferredRecompile.bind(this));
        this.resizeEditor();
    },

    getSource: function () {
        return this.hcl_editor.getValue();
    },

    setSource: function (raw) {
        this.hcl_editor.setValue(raw);
    },

    resizeEditor: function () {
        this.$hcl_editor.height($(window).height() - this.$hcl_editor.position().top);
    },

    deferredRecompile: function () {
        if (this.recompileTimeout)
            window.clearTimeout(this.recompileTimeout);
        this.recompileTimeout = window.setTimeout(this.annotate, 500);
    },

    _annotate: function () {
        var value = this.getSource();

        // var errors = ASSEMBLE(value, true).errors;
        //
        // var errorObjs = _.map(errors, function (error) {
        //     return {
        //         row: error[0] - 1,
        //         column: 0, // not supported
        //         text: error[1],
        //         type: 'error'
        //     }
        // });
        //
        // this.hcl_editor.getSession().setAnnotations(errorObjs);
    }
});