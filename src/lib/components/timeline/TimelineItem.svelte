<script lang="ts">
    import type { TimelineItemInterface } from "$lib/interfaces"

    export let data: TimelineItemInterface;
</script>

<li class="mb-10 mx-4 max-w-5xl">
    <div class="absolute w-4 h-4 bg-gray-200 rounded-full mt-1 -left-2 border border-white dark:border-gray-900 dark:bg-gray-700"/>
    <time class="mb-1 text-base font-normal sm:text-lg md:text-xl lg:text-2xl leading-none text-gray-400 dark:text-gray-500">{data.date}</time>
    <h3 class="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 dark:text-white">{data.title}</h3>
    <p class="mb-4 text-base font-normal sm:text-lg md:text-xl lg:text-2xl text-gray-500 dark:text-gray-400">{data.description}</p>
    {#if data.link}
    
    <a target="_blank" href="{data.link}" class="inline-flex items-center px-4 py-2 font-medium text-gray-900 bg-white border border-gray-200 rounded-lg hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:outline-none focus:ring-gray-200 focus:text-blue-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700">
        <p class="text-base font-normal sm:text-lg md:text-xl">{data.linkText}</p>
        <svg class="w-3 h-3 ml-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
        </svg>
    </a>
    {/if}
</li>