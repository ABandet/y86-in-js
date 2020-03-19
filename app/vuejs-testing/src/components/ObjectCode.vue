<template>
    <div class="object" >

        <h2>Object code</h2>
        <div class="lines-wrapper">
            <div class="lines">
                <div class="object-code-line" v-for="line in code" v-bind:key="line.id">
                    <div class="highlighted"  v-if="line.id === PC">{{line}}</div>
                    <div v-else>{{line}}</div>
                </div>

            </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: "ObjectCode",
        props: {
            initCode: {
                required:true
            }
        },
        data () {
            return {
                code : this.initCode,
                PC : 0
            }
        },
        methods:{
            update(code, PC) {
                this.code = code;
                this.PC = PC;
            }
        },
        mounted() {
             this.code = this.code.split('\n');
        }
    }
</script>

<style src="../css/object-code.css">

</style>