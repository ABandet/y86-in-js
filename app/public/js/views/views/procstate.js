var ProcosserStateView = Backbone.View.extend({
    className: 'proc_state',

    initialize: function () {
        this.template = _.template($('#tmpl_processor_state').html());
        this.render();
    },

    render: function () {
        var state = {
            srcA : '---',
            srcB : '---',
            destE : '---',
            destM : '---',
            regA : '---',
            regB : '---',
            instr : '---',
            bch : 'N',
            newPC : '0x0000',
            valM : '0x0000',
            valE : '0x0000',
            valC : '0x0000',
            valA : '0x0000',
            valB : '0x0000',
            valP : '0x0000'
        };

        this.$el.empty().append(this.template(state));
    }
});
