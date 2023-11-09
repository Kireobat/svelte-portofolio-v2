<script lang="ts">
    import type { TimelineInterface } from "$lib/interfaces"
    import TimelineItem from "$lib/components/timeline/TimelineItem.svelte"

    export let data: TimelineInterface;
</script>

<div class="relative border-l border-gray-700 border-dashed h-6"/>
<ol class="relative border-l border-gray-700">
    {#each data as item}
        <TimelineItem data={item}/>
    {/each}                
</ol>