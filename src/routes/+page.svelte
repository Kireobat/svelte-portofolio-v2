<script lang="ts">
    import type { TimelineInterface } from "$lib/interfaces"

    import ScrollDownIndicator from "$lib/components/ScrollDownIndicator.svelte";
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import Words from "$lib/components/Words.svelte";
    import { onDestroy, onMount } from "svelte";

    let scrollY: number = 0;
    let wordsScale: number = 1;
    let wordsDisabled: boolean = false;
    let windowHeight: number = 200
    let offset: number = 0;

    let textContainerLoaded: boolean = false;

    let svgFill: string = 'white';

    const calibrateOffset = () => {
        windowHeight = window.innerHeight;
        offset = Math.floor(windowHeight * 1.05);

        const textContainer = document.getElementById('textContainer');

        if (textContainer) {
            textContainer.style.transform = `translateY(${offset}px)`;
            textContainerLoaded = true;
        } else {
            console.log('textContainer not found');
        }
    }

    onMount(() => {
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });
        
        window.addEventListener('resize', calibrateOffset);

        calibrateOffset();
});

    $: {
        if (Math.floor(scrollY) > windowHeight / 6) {
        wordsScale = 0.5;
        wordsDisabled = true;
        svgFill = 'black';
        } else { wordsScale = 1; wordsDisabled = false; svgFill = 'white';}
    }

    

    const data: TimelineInterface = [
        {
            date: 'August 2021 - June 2023',
            title: 'Started my journey',
            description: 'I started my education in programming at Amalie Skram Videregående Skole.'
        },
        {
            date: 'January 2023 - June 2023',
            title: 'My first job in web development',
            description: 'I got my first job as a web developer at Bergens Tidene as an unpaid intern.',
            link: 'https://www.bt.no/byliv/i/0Q0OXM/badeplasser-i-bergen-hvor-kan-du-bade-og-hva-er-badetemperaturene',
            linkText: 'Some of my work at Bergens Tidene'
        },
        {
            date: 'August 2023 - August 2025',
            title: 'Apprenticeship at Fiskeridirektoratet',
            description: 'This apprenticeship is a part of my education at Amalie Skram Videregående Skole. I am learning both frontend and backend development, mostly using React and Java.',
            link: 'https://www.fiskeridir.no/Om-oss/Avdelinger-og-regioner/it-avdelingen/seksjon-systemutvikling/erik-flatebo',
            linkText: 'Read more about my apprenticeship here'
        }
    ];

</script>
<main class="bg-black h-[300vh]">
    <div class="flex flex-col justify-center h-[100vh] fixed w-full z-0" style="transform: scale({wordsScale}); transition: transform 0.75s ease-in-out;">
        <div class="flex justify-center z-0">
            <Words isDisabled={wordsDisabled}/>
        </div>
    </div>
    <ScrollDownIndicator svgFill={svgFill}/>
    <div class="z-40 text-white ml-4" id="textContainer">
        {#if textContainerLoaded}
            <Timeline data={data}/>
        {/if}
    </div>
</main>