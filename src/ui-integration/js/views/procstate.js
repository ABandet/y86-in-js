var ProcosserStateView = Backbone.View.extend({
    className: 'proc_state',

    initialize: function () {
        this.template = _.template($('#tmpl_processor_state').html());
        this.render();
    },

    render: function () {
        var state = {
            srcA : SrcA,
            srcB : SrcB,
            destE : DestE,
            destM : DestM,
            regA : RegA,
            regB : RegB,
            instr : Instr,
            bch : Bch,
            newPC : '0x' + padHex(NewPC.toString(16), 4),
            valM : '0x' + padHex(ValM.toString(16), 4),
            valE : '0x' + padHex(ValE.toString(16), 4),
            valC : '0x' + padHex(ValC.toString(16), 4),
            valA : '0x' + padHex(ValA.toString(16), 4),
            valB : '0x' + padHex(ValB.toString(16), 4),
            valP : '0x' + padHex(ValP.toString(16), 4)
        };

        this.$el.empty().append(this.template(state));
    }
});
