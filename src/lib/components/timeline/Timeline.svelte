<script lang="ts">
    import TimelineItem from "$lib/components/timeline/TimelineItem.svelte"
    import type { TimelineInterface } from "$lib/interfaces";

    let { data }: TimelineInterface = $props();
</script>

<div class="relative border-l border-gray-700 border-dashed h-6"></div>
<ol class="relative border-l border-gray-700">
    {#each data as item}
        <TimelineItem date={item.date} title={item.title} description={item.description} link={item.link} linkText={item.linkText}/>
    {/each}                
</ol>
<div class="relative border-l border-gray-700 border-dashed h-6 -translate-y-10"></div>