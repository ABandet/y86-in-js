var INSTR = {};

// halt
INSTR[0] = function () {
	STAT = 'HLT';
	Instr = 'halt';
	ValP = NewPC = PC;
	//print("Program halted");
};

// nop
INSTR[1] = function () {
	//NOP
	Instr = 'nop';
	ValP = PC;
	ValP = NewPC = PC;
};

// rrmovl, cmovle, ..., cmovg
INSTR[2] = function () {
	ValP = NewPC = PC;
	switch(this.fn) {
		case 0:
			// RRMOVL
			Instr = 'rrmovl';
			applyRRMOVL(this.rA, this.rB);
			break;
		case 1:
			// CMOVLE
			Instr = 'cmovle';

			if (SF ^ OF === 1 || ZF === 1) {
				applyRRMOVL();
			}
			break;
		case 2:
			// CMOVL
			Instr = 'cmovl';
			if (SF ^ OF === 1) {
				applyRRMOVL();
			}
			break;
		case 3:
			// CMOVE
			Instr = 'cmove';
			if (ZF === 1) {
				applyRRMOVL();
			}
			break;
		case 4:
			// CMOVNE
			Instr = 'cmovne';
			if (ZF === 0) {
				applyRRMOVL();
			}
			break;
		case 5:
			// CMOVGE
			Instr = 'cmovge';
			if (SF ^ OF === 0) {
				applyRRMOVL();
			}
			break;
		case 6:
			// CMOVG
			Instr = 'cmovg';
			if (SF ^ OF === 0 && ZF === 0) {
				applyRRMOVL();
			}
			break;
	}
};

// irmovl
INSTR[3] = function () {
	Instr = 'irmovl';
	ValP = NewPC = PC;

	RegB = num2reg[this.rB];

	ValC = this.V;

	SrcA = RegA;

	DestE = RegB;

	REG[this.rB] = this.V;
};

// rmmovl
INSTR[4] = function () {
	Instr = 'rmmovl';
	SrcA = num2reg[this.rA];

	ValE = applyRM_MRMOVL(this.rA, this.rB, this.D);
	ST(ValE, ValA, 4);
};

// mrmovl
INSTR[5] = function () {
	Instr = 'mrmovl';

	ValE = applyRM_MRMOVL(this.rA, this.rB, this.D);

	DestM = num2reg[this.rA];
	ValM = LD(ValE);
	REG[this.rA] = ValM;
};

// addl, subl, andl, xorl
INSTR[6] = function () {
	ValP = NewPC = PC;

	ValA = getRegister(this.rA);
	ValB = getRegister(this.rB);

	SrcA = num2reg[this.rA];
	SrcB = num2reg[this.rB];

	RegA = SrcA;
	RegB = DestE = SrcB;

	var sgnA, sgnB, sgnR, signBit = 0x80000000;
	switch(this.fn) {
		case 0:
			Instr = 'addl';
			sgnA = !!(ValA & signBit);
			sgnB = !!(ValB & signBit);
			ValE = ValA + ValB;
			REG[this.rB] = ValE;
			sgnR = !!(getRegister(this.rB) & signBit);
			OF = +(sgnA && sgnB && !sgnR ||
			       !sgnA && !sgnB && sgnR)
			break;
		case 1:
			Instr = 'subl';
			sgnA = !!(ValA & signBit);
			sgnB = !!(ValB & signBit);
			ValE = ValB - ValA;
			REG[this.rB] = ValE;
			sgnR = !!(getRegister(this.rB) & signBit);
			OF = +(!sgnA && sgnB && !sgnR ||
			       sgnA && !sgnB && sgnR)
			break;
		case 2:
			Instr = 'andl';
			ValE = ValA & ValB;
			REG[this.rB] = ValE;
			break;
		case 3:
			Instr = 'xorl';
			ValE = ValA ^ ValB;
			REG[this.rB] = ValE;
			break;
	}
	SF = getRegister(this.rB) & 0x80000000 ? 1 : 0;
	ZF = getRegister(this.rB) === 0 ? 1 : 0;
};

// jump(jl, jle, ..., loop)
INSTR[7] = function ()  {
	switch(this.fn) {
		case 0:
			// JMP
			Instr = 'jmp';
			applyJMP(this.Dest);
			break;
		case 1:
			// JLE
			Instr = 'jle';
			if (SF ^ OF === 1 || ZF === 1) {
				applyJMP(this.Dest);
			}
			break;
		case 2:
			// JL
			Instr = 'jl';
			if (SF ^ OF === 1) {
				applyJMP(this.Dest);
			}
			break;
		case 3:
			// JE
			Instr = 'je';
			if (ZF === 1) {
				applyJMP(this.Dest);
			}
			break;
		case 4:
			// JNE
			Instr = 'jne';
			if (ZF === 0) {
				applyJMP(this.Dest);
			}
			break;
		case 5:
			// JGE
			Instr = 'jge';
			if (SF ^ OF === 0) {
				applyJMP(this.Dest);
			}
			break;
		case 6:
			// JG
			Instr = 'jg';
			if (SF ^ OF === 0 && ZF === 0) {
				applyJMP(this.Dest);
			}
			break;
		case 7:
			// LOOP
			Instr = 'loop';

			// ecx --
			REG[1] -= 1;

			if (getRegister(1) > 0) {
				applyJMP(this.Dest);
			}
			break;
	}
};

// call
INSTR[8] = function () {
	Instr ='call';

	DestE = SrcB = num2reg[4];
	ValB = getRegister(4);
	ValE = ValB - 4;
	ST(ValE, PC, 4);
	REG[4] = ValE;

	ValP = PC;
	PC = NewPC = ValC = this.Dest;
};

// ret
INSTR[9] = function () {
	Instr ='ret';

	DestE = SrcA = SrcB = num2reg[4];
	ValA = getRegister(4);
	ValB = getRegister(4);
	ValE = ValB + 4, ValM = LD(ValA);
	REG[4] = ValE;

	ValP = PC;
	PC = NewPC = ValM;
};

//pushl
INSTR[10] = function () {
	Instr ='pushl';
	NewPC = ValP = PC;

	RegA = SrcA = num2reg[this.rA];
	DestE = SrcB = num2reg[4];

	ValA = getRegister(this.rA);
	ValB = getRegister(4);
	ValE = ValB - 4;
	ST(ValE, ValA, 4);
	REG[4] = ValE;
};

// popl
INSTR[11] = function () {
	Instr ='popl';
	NewPC = ValP = PC;

	RegA = DestM = num2reg[this.rA];
	DestE = SrcA = SrcB = num2reg[4];

	ValA = getRegister(4);
	ValB = getRegister(4);
	ValE = ValB + 4;
	ValM = LD(ValA);
	REG[4] = ValE;
	REG[this.rA] = ValM;
};

// iaddl, isubl, iandl, ixorl
INSTR[12] = function () {
	NewPC = ValP = PC;

    ValA = ValC= this.V;
    ValB = getRegister(this.rB);
	DestE = SrcB = RegB = num2reg[this.rB];

    var sgnA, sgnB, sgnR, signBit = 0x80000000;
    switch(this.fn) {
    case 0:
		Instr ='iaddl';
		sgnA = !!(ValA & signBit);
		sgnB = !!(ValB & signBit);
		REG[this.rB] += ValA;
		sgnR = !!(getRegister(this.rB) & signBit);
		OF = +(sgnA && sgnB && !sgnR ||
			   !sgnA && !sgnB && sgnR)
	break;

    case 1:
		Instr ='isubl';
		sgnA = !!(ValA & signBit);
		sgnB = !!(ValB & signBit);
		REG[this.rB] -= ValA;
		sgnR = !!(getRegister(this.rB) & signBit);
		OF = +(!sgnA && sgnB && !sgnR ||
			   sgnA && !sgnB && sgnR)
	break;

    case 2:
		Instr ='iandl';
		REG[this.rB] = ValA & getRegister(this.rB);
		break;

	case 3:
		Instr ='ixorl';
		REG[this.rB] = ValA ^ getRegister(this.rB);
		break;
	}
	ValE = REG[this.rB];
	SF = getRegister(this.rB) & 0x80000000 ? 1 : 0;
	ZF = getRegister(this.rB) === 0 ? 1 : 0;
};

// break
INSTR[15] = function () {
	switch(this.fn) {
		case 0:
			// BRK
			STAT = 'DBG';
			break;
		case 1:
			// BRKLE
			if (SF ^ OF === 1 || ZF === 1) {
				STAT = 'DBG';
			}
			break;
		case 2:
			// BRKL
			if (SF ^ OF === 1) {
				STAT = 'DBG';
			}
			break;
		case 3:
			// BRKE
			if (ZF === 1) {
				STAT = 'DBG';
			}
			break;
		case 4:
			// BRKNE
			if (ZF === 0) {
				STAT = 'DBG';
			}
			break;
		case 5:
			// BRKGE
			if (SF ^ OF === 0) {
				STAT = 'DBG';
			}
			break;
		case 6:
			// BRKG
			if (SF ^ OF === 0 && ZF === 0) {
				STAT = 'DBG';
			}
			break;
	}
};

// Common points of some instructions
function applyRRMOVL(rA, rB) {
	RegA = num2reg[rA];
	RegB = num2reg[rB];

	SrcA = RegA;

	DestE = RegB;

	ValE = getRegister(rA);

	REG[rB] = ValE;
}

function applyRM_MRMOVL(rA, rB, D) {
	ValP = NewPC = PC;

	RegA = num2reg[rA];
	ValA = getRegister(rA);

	ValB = 0; // valB is zero if rB is not used
	if(rB != 15) {
		RegB = num2reg[rB];
		SrcB = RegB;
		ValB = getRegister(rB);
	}
	ValC = D;

	return ValB + D;
}

function applyJMP(Dest) {
	Instr = 'jmp';
	ValP = PC;
	PC = NewPC = ValC = Dest;
	Bch = 'Y';
}