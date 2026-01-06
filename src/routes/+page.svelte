<script lang="ts">
    import type { TimelineInterface } from "$lib/interfaces"

    import ScrollDownIndicator from "$lib/components/ScrollDownIndicator.svelte";
    import Timeline from "$lib/components/timeline/Timeline.svelte";
    import Words from "$lib/components/Words.svelte";
    import { onMount } from "svelte";

    let scrollY: number = $state(0);
    let windowHeight: number = $state(200);
    
    let scrolledFarEnough: boolean = $derived(Math.floor(scrollY) > windowHeight / 6);

    let wordsScale: number = $derived(scrolledFarEnough ? 0.5 : 1);
    let wordsDisabled: boolean = $derived(scrolledFarEnough);
    let offset: number = 0;
    let textContainerLoaded: boolean = $state(false);


    let svgFill: string = $derived(scrolledFarEnough ? 'black' : 'white');

    const calibrateOffset = () => {
        windowHeight = window.innerHeight;
        offset = Math.floor(windowHeight * 1.05);

        const textContainer = document.getElementById('textContainer');

        if (textContainer) {
            textContainer.style.transform = `translateY(${offset}px)`;
            textContainerLoaded = true;
        } else {
            console.error('textContainer not found');
        }
    }

    onMount(() => {
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });
        
        window.addEventListener('resize', calibrateOffset);

        calibrateOffset();
}); 

    const entries: TimelineInterface = { data: [
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
            },
            {
                date: 'March 2025',
                title: 'Created and launched fish-time',
                description: 'Fish-time is a calendar app built in 7 days as the main part of my test-fagprøve. It is built with Sveltekit, TS, Tailwind, Kotlin, Spring and Postgres.',
                link: 'https://github.com/Kireobat/testfagprove',
                linkText: 'Github repo for test-fagprøve'
            },
            {
                date: 'June 2025',
                title: 'Before Fagprøve',
                description: 'I will take my fagprøve (final exam) next week as a part of my apprenticeship and my secondary education.',
                link: 'https://shorturl.at/lIYc4',
                linkText: 'Finals week or my final week? Stay tuned next week... Let\'s see if I pass my classes or I pass away.'
            },
            {
                date: 'June 2025',
                title: 'Fagprøve completed',
                description: 'I completed my fagprøve with top marks! I made a inventory management system called tool-tracker built with Sveltekit, TS, Tailwind, Kotlin, Spring and Postgres.',
                link: 'https://github.com/Kireobat/fagprove',
                linkText: 'Github repo for fagprøve'
            },
            {
                date: 'August 2025 - May 2026',
                title: 'A break from work',
                description: 'After achieving top marks on my fagprøve, I decided to spend a year on Folkehøyskole since it is something that won\'t be possible to do later in life.'
            }
        ]
    }

</script>
<div class="bg-black h-[300vh]">
    <div class="flex flex-col justify-center h-[100vh] fixed w-full z-0" style="transform: scale({wordsScale}); transition: transform 0.75s ease-in-out;">
        <div class="flex justify-center z-0">
            <Words isDisabled={wordsDisabled}/>
        </div>
    </div>
    <ScrollDownIndicator svgFill={svgFill}/>
    <div class="z-40 text-white ml-4" id="textContainer">
        {#if textContainerLoaded}
            <Timeline data={entries.data}/>
        {/if}
    </div>
</div>