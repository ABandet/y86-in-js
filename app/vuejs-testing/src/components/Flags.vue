<template>
    <div class="flags-container" >

        <h2>Flags</h2>
        <div class="flags vertical-pane">
            <div class="flag" v-for="flag in flags" v-bind:key="flag.id">
                <div class="label">{{ flag.name }}</div>
                <div class="value">{{ flag.value }}</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "Flags",
        props: {
            jsonFlags: {
                required:true
            }
        },
        data () {
            return {
                flags : this.jsonFlags.flags
            }
        },
        methods:{
            update(flags) {
                this.flags = flags;
            }
        }
    }
</script>

<style src="../css/flags.css">

</style>