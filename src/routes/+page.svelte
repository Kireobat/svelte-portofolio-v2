<script>
    import Words from "$lib/components/Words.svelte";
    import { onMount } from "svelte";

    let scrollY = 0;
    let wordsScale = 1;
    let wordsDisabled = false;
    let windowHeight = 200
    let offset = 0;

    let textContainerLoaded = false;

    onMount(() => {
        window.addEventListener('scroll', () => {
            scrollY = window.scrollY;
        });
        
        windowHeight = window.innerHeight;
        offset = windowHeight * 1.3;

        const textContainer = document.getElementById('textContainer');
        if (textContainer) {
            textContainer.style.transform = `translateY(${offset}px)`;
            textContainerLoaded = true;
        } else {
            console.log('textContainer not found');
        }
    });

    $: {
        if (Math.floor(scrollY) > windowHeight / 4) {
        wordsScale = 0.5;
        wordsDisabled = true;
        } else { wordsScale = 1; wordsDisabled = false; }
    }

</script>
<main class="bg-black h-[300vh]">
    <div class="flex flex-col justify-center h-[100vh] fixed w-full z-0" style="transform: scale({wordsScale}); transition: transform 0.75s ease-in-out;">
        <div class="flex justify-center z-0">
            <Words isDisabled={wordsDisabled}/>
        </div>
    </div>
    <div class="z-40 text-white" id="textContainer">
        {#if textContainerLoaded}
            <img class="h-32" alt="img" src="https://images.unsplash.com/photo-1575936123452-b67c3203c357?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8aW1hZ2V8ZW58MHx8MHx8fDA%3D">
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quibusdam ex earum nihil maiores repudiandae doloremque minima hic dolor error! Necessitatibus voluptatem harum quo repudiandae eaque qui in laborum dicta?</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quibusdam ex earum nihil maiores repudiandae doloremque minima hic dolor error! Necessitatibus voluptatem harum quo repudiandae eaque qui in laborum dicta?</h1>
            <h1>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro quibusdam ex earum nihil maiores repudiandae doloremque minima hic dolor error! Necessitatibus voluptatem harum quo repudiandae eaque qui in laborum dicta?</h1>
        {/if}
    </div>
</main>