<template>
    <div class="memory">
        <h2>Memory</h2>

        <div class="mem-header">
            <div class="address">Addr</div>
            <div class="value">Value</div>
        </div>
        <transition>
            <div class="mem-words">
                <div class="stack-pointers">
                    <div class="ebp" v-bind:style="{top : ebp + 'px'}"><i class="fa fa-caret-left"></i> EBP</div>
                    <div class="esp" v-bind:style="{top : esp + 'px'}"><i class="fa fa-caret-left"></i> ESP</div>
                </div>
                <div class="word" v-for="word in words" v-bind:key="word.id">
                    <div class="address">{{ word.address }}</div>
                    <div class="value">{{ word.value }}</div>
                </div>
            </div>
        </transition>
    </div>

</template>

<script>

    export default {
        name: "Memory",
        props: {
            words: {
                required:true
            }
        },
        data () {
            return {
                esp : 0,
                ebp : 0,
            }
        },
        methods:{
            update(words, ebp, esp) {
                this.words = words;
                this.ebp = ebp;
                this.esp = esp;

                // esp_el.css('top', esp + 'px');
                // var old_ebp = this.ebp.position().top;
                // var old_esp = this.esp.position().top;
                // var ebp_changed = false, esp_changed = false;
                //
                // if (ebp !== old_ebp && (ebp_changed = true))
                //     this.$ebp.css('top', ebp + 'px');
                // if (esp !== old_esp && (esp_changed = true))
                //     this.$esp.css('top', esp + 'px');
                //
                // if (ebp_changed || esp_changed) {
                //     var containerHeight = this.$wordContainer.height();
                //     var scrollTop = this.$wordContainer.scrollTop();
                //     var newScroll = 0;
                //
                //     var max = ebp_changed ? esp_changed ? Math.max(ebp, esp) : ebp : esp;
                //     if (max > scrollTop + containerHeight - 15)
                //         newScroll = max - containerHeight + 55;
                //
                //     // Prefer scrolling to the higher of the two possible changed
                //     // values, if necessary.
                //     var min = ebp_changed ? esp_changed ? Math.min(ebp, esp) : ebp : esp;
                //     if (min < scrollTop + 15)
                //         newScroll = min - 40;
                //
                //     if (newScroll !== 0)
                //         this.$wordContainer.scrollTop(newScroll);
                // }
            }
        }
    }
</script>

<style src="../css/memory.css">

</style>