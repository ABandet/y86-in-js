var RegistersView = Backbone.View.extend({
	className: 'registers',

	initialize: function () {
		this.template = _.template($('#tmpl_registers').html());
		this.render();
	},

	render: function () {
		var registers = {
			eax_hex: '0x00000000',
			eax_dec: '0',
			ecx_hex: '0x00000000',
			ecx_dec: '0',
			edx_hex: '0x00000000',
			edx_dec: '0',
			ebx_hex: '0x00000000',
			ebx_dec: '0',
			esp_hex: '0x00000000',
			esp_dec: '0',
			ebp_hex: '0x00000000',
			ebp_dec: '0',
			esi_hex: '0x00000000',
			esi_dec: '0',
			edi_hex: '0x00000000',
			edi_dec: '0',

			sf: '---',
			zf: '---',
			of: '---',
			stat: 'STAT',
			err: 'ERR',
			pc: '0x0000'
		};

		this.$el.empty().append(this.template(registers));
	}
});
