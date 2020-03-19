<template>
    <div class="status-container" >

        <h3>Status</h3>
        <div class="status_list">
            <div class="status vertical-pane" v-for="status in status_list" v-bind:key="status.id">
                <div class="label">{{ status.name }}</div>
                <div class="value">{{ status.value }}</div>
            </div>
        </div>
    </div>

</template>

<script>

    export default {
        name: "Status",
        props: {
            jsonStatus: {
                required:true
            }
        },
        data () {
            return {
                status_list : this.jsonStatus.status_list
            }
        },
        methods:{
            update(status_list) {
                this.status_list = status_list;
            }
        }
    }
</script>

<style src="../css/status.css">

</style>