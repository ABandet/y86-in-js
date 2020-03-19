<template>
    <div class="processor-state">
        <h1>Processor State</h1>

        <div class="stage" v-for="stage in stages" v-bind:key="stage.id">
            <h2>{{stage.name}}</h2>
            <div class="stage-indicators">
                <div class="Indicator" v-for="indicator in stage.indicators" v-bind:key="indicator.id">
                    <div class="label">{{indicator.name}}</div>
                    <div class="value">{{indicator.value}}</div>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
    export default {
        name: "CpuState",
        props: {
            jsonCpuStat: {
                required:true
            }
        },
        data() {
            return {
                stages : this.jsonCpuStat.stages
            }
        },
        methods:{
            update(newStages) {
                this.stages = newStages
            },
            render () {
                return this.stages
            }
        }
    }
</script>

<style src="../css/cpu-state.css">

</style>