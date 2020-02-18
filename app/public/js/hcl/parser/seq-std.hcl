#/* $begin seq-all-hcl */
#/* $begin seq-plus-all-hcl */
####################################################################
#  HCL Description of Control for Single Cycle Y86 Processor SEQ   #
#  Copyright (C) Randal E. Bryant, David R. O'Hallaron, 2002       #
####################################################################

####################################################################
#    Declarations.  Do not change/remove/delete any of these       #
####################################################################

##### Symbolic representation of Y86 Instruction Codes #############
intsig NOP 			'ctx.instructionSet.nop'
intsig HALT			'ctx.instructionSet.halt'
intsig RRMOVL		'ctx.instructionSet.rrmovl'
intsig IRMOVL		'ctx.instructionSet.irmovl'
intsig RMMOVL		'ctx.instructionSet.rmmovl'
intsig MRMOVL		'ctx.instructionSet.mrmovl'
intsig OPL			'ctx.instructionSet.alu'
intsig IOPL			'ctx.instructionSet.alui'
intsig JXX			'ctx.instructionSet.jxx'
intsig CALL			'ctx.instructionSet.call'
intsig RET			'ctx.instructionSet.ret'
intsig PUSHL		'ctx.instructionSet.pushl'
intsig POPL			'ctx.instructionSet.popl'
intsig JMEM			'ctx.instructionSet.jmem'
intsig JREG			'ctx.instructionSet.jreg'
intsig LEAVE		'ctx.instructionSet.leave'
intsig LOOP 		'ctx.instructionSet.loop'

##### Symbolic representation of Y86 Registers referenced explicitly #####
intsig RESP     	'ctx.registers.esp'    	# Stack Pointer
intsig REBP     	'ctx.registers.ebp'    	# Frame Pointer
intsig RECX			'ctx.registers.ecx'		# Loop condition register
intsig RNONE    	'ctx.registers.none'   	# Special value indicating "no register"

##### ALU Functions referenced explicitly                            #####
intsig ALUADD		'ctx.alufct.A_ADD'		# ALU should add its arguments

##### Signals that can be referenced by control logic ####################

##### Fetch stage inputs		#####
intsig pc 			'ctx.pc'				# Program counter
##### Fetch stage computations		#####
intsig icode		'ctx.icode'			# Instruction control code
intsig ifun			'ctx.ifun'			# Instruction function
intsig rA			'ctx.ra'			# rA field from instruction
intsig rB			'ctx.rb'			# rB field from instruction
intsig valC			'ctx.valc'			# Constant from instruction
intsig valP			'ctx.valp'			# Address of following instruction

##### Decode stage computations		#####
intsig valA			'ctx.vala'			# Value from register A port
intsig valB			'ctx.valb'			# Value from register B port

##### Execute stage computations	#####
intsig valE			'ctx.vale'			# Value computed by ALU
boolsig Bch			'ctx.bcond'			# Branch test

##### Memory stage computations		#####
intsig valM			'ctx.valm'			# Value read from memory


####################################################################
#    Control Signal Definitions.                                   #
####################################################################

################ Fetch Stage     ###################################

# Does fetched instruction require a regid byte?
bool need_regids =
	icode in { RRMOVL, OPL, IOPL, PUSHL, POPL, IRMOVL, RMMOVL, MRMOVL };

# Does fetched instruction require a constant word?
bool need_valC =
	icode in { IRMOVL, RMMOVL, MRMOVL, JXX, CALL, LOOP };

bool instr_valid = icode in 
	{ NOP, HALT, RRMOVL, IRMOVL, RMMOVL, MRMOVL,
	       OPL, IOPL, JXX, CALL, RET, PUSHL, POPL, LOOP };

################ Decode Stage    ###################################

## What register should be used as the A source?
int srcA = [
	icode in { RRMOVL, RMMOVL, OPL, PUSHL } : rA;
	icode in { POPL, RET } : RESP;
	1 : RNONE; # Don't need register
];

## What register should be used as the B source?
int srcB = [
	icode in { OPL, IOPL, RMMOVL, MRMOVL } : rB;
	icode in { PUSHL, POPL, CALL, RET } : RESP;
	icode in { LOOP } : RECX;
	1 : RNONE;  # Don't need register
];

## What register should be used as the E destination?
int dstE = [
	icode in { RRMOVL, IRMOVL, OPL, IOPL } : rB;
	icode in { PUSHL, POPL, CALL, RET } : RESP;
	icode in { LOOP } : RECX;
	1 : RNONE;  # Don't need register
];

## What register should be used as the M destination?
int dstM = [
	icode in { MRMOVL, POPL } : rA;
	1 : RNONE;  # Don't need register
];

################ Execute Stage   ###################################

## Select input A to ALU
int aluA = [
	icode in { RRMOVL, OPL } : valA;
	icode in { IRMOVL, RMMOVL, MRMOVL, IOPL } : valC;
	icode in { CALL, PUSHL } : -4;
	icode in { RET, POPL } : 4;
	icode in { LOOP } : -1;
	# Other instructions don't need ALU
];

## Select input B to ALU
int aluB = [
	icode in { RMMOVL, MRMOVL, OPL, IOPL, CALL, PUSHL, RET, POPL, LOOP } : valB;
	icode in { RRMOVL, IRMOVL } : 0;
	# Other instructions don't need ALU
];

## Set the ALU function
int alufun = [
	icode in { OPL, IOPL } : ifun;
	1 : ALUADD;
];

## Should the condition codes be updated?
bool set_cc = icode in { OPL, IOPL };

################ Memory Stage    ###################################

## Set read control signal
bool mem_read = icode in { MRMOVL, POPL, RET };

## Set write control signal
bool mem_write = icode in { RMMOVL, PUSHL, CALL };

## Select memory address
int mem_addr = [
	icode in { RMMOVL, PUSHL, CALL, MRMOVL } : valE;
	icode in { POPL, RET } : valA;
	# Other instructions don't need address
];

## Select memory input data
int mem_data = [
	# Value from register
	icode in { RMMOVL, PUSHL } : valA;
	# Return PC
	icode == CALL : valP;
	# Default: Don't write anything
];

################ Program Counter Update ############################

## What address should instruction be fetched at

int new_pc = [
	# Call.  Use instruction constant
	icode == CALL : valC;
	# Taken branch.  Use instruction constant
	icode == JXX && Bch : valC;
	# Completion of RET instruction.  Use value from stack
	icode == RET : valM;
	# Loop condition
	icode == LOOP && valE != 0 : valC;
	# Default: Use incremented PC
	1 : valP;
];
#/* $end seq-plus-all-hcl */
#/* $end seq-all-hcl */
