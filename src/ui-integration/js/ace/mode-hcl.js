define("ace/mode/hcl_highlight_rules",
		["require","exports","module","ace/lib/oop","ace/mode/text_highlight_rules"],
		function(require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var TextHighlightRules = require("./text_highlight_rules").TextHighlightRules;

	var HCLHighlightRules = function() {
		
		this.$rules = {
			"start" : [{
				"token": "comment",
				"regex": /#.*/
			}, {
				"token": ["storage.type", "directive"],
				"regex": /\.(?:pos|align|long)/
			}, {
				"token": ["entity.name.function", "symbol"],
				"regex": /\w+[ \t]*:/
			}, {
				"token": "keyword.control",
				"regex": /boolsig|bool|quote|intsig|int|in /
			}, {
				"token": ["variable.language", "register"],
				"regex": /%(?:icode|ifun)/
			}, {
				"token": "constant.number",
				"regex": /\$?\-?([0-9]+|\0\x[0-9a-f]+)/
			}]

		};
	};
	oop.inherits(HCLHighlightRules, TextHighlightRules);

	exports.HCLHighlightRules = HCLHighlightRules;

});

define("ace/mode/hcl",
		["require","exports","module","ace/lib/oop","ace/mode/text","ace/mode/hcl_highlight_rules"],
		function(require, exports, module) {
	"use strict";

	var oop = require("../lib/oop");
	var TextMode = require("./text").Mode;
	var HCLHighlightRules = require("./hcl_highlight_rules").HCLHighlightRules;
	var WorkerClient = require("../worker/worker_client").WorkerClient;

	var Mode = function() {
		this.HighlightRules = HCLHighlightRules;
	};
	oop.inherits(Mode, TextMode);

	Mode.prototype.$id = "ace/mode/hcl";

	exports.Mode = Mode;
});
