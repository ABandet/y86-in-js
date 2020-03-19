<template>
    <div class="registers">

        <div class="column register_column">
            <h2>Registers</h2>
            <div class="register" v-for="register in registers" v-bind:key="register.id">
                <div class="label">{{ register.name }}</div>
                <div class="value_hex">{{ register.value_hex }}</div>
                <div class="value_dec">{{ register.value_dec }}</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "Registers",
        props: {
            jsonReg: {
                required:true
            }
        },
        data () {
            return {
                registers : this.jsonReg.registers
            }
        },
        methods:{
            update(registers) {
                this.registers = registers;
            }
        }
    }
</script>

<style src="../css/registers.css">

</style>