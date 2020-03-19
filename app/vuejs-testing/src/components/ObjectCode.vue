<template>
    <div class="object" >

        <h1>Object code</h1>
        <div class="lines-wrapper">
            <!-- If the compilation generates errors.json, display only errors.json -->
<!--            <div class="lines" v-if="errors.length > 0">-->
            <div class="lines">
                <div class="object-code-line-error vertical-pane" v-for="error in errors" v-bind:key="error.id">
                    <div class="line-no">{{error.lineno}}</div>
                    <div class="source">{{error.source}}</div>
                </div>
<!--            </div>-->

            <!-- Else, display the object code -->
<!--            <div class="lines" v-else>-->
<!--            <div class="lines" >-->
                <div class="object-code-line" v-for="index in code.length" v-bind:key="index">
                    <div class="highlighted"  v-if="index === PC">{{code[index]}}</div>
                    <div v-else>{{code[index]}}</div>
                </div>
            </div>
        </div>

    </div>

</template>

<script>

    export default {
        name: "ObjectCode",
        props: {
            objCode: {
                required:true
            },
            err: {
                required: true
            }
        },
        data () {
            return {
                code : this.objCode,
                errors : this.err.sources,
                PC : 9
            }
        },
        methods:{
            update(code, errors, PC) {
                this.code = code;
                this.errors = errors;
                this.PC = PC;
            }
        },
        mounted() {
            // get array of each line
            this.code = this.objCode.split('\n');
        }
    }
</script>

<style src="../css/object-code.css">

</style>