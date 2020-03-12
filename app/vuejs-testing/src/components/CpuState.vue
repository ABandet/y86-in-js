<template>
    <div>
        <h2>Processor State</h2>

        <div class="stage" v-for="stage in stages" >
            <h3>{{stage.name}}</h3>
            <div class="stage-indicators">
                <div class="Indicator" v-for="indicator in stage.indicators">
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
            stages: {
                required:true
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