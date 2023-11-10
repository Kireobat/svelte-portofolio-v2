<script lang="ts">
    import { onMount } from "svelte";
    import Layout from "../../routes/+layout.svelte";

    export let isDisabled: boolean;

    $: {
        if (isDisabled == true) {
            setTimeout(() => {
                wordCurrentColor = inactiveColor
                phoneCurrentColor = inactiveColor
                emailCurrentColor = inactiveColor
                githubCurrentColor = inactiveColor
            }, 100)
        } else if (isDisabled == false) {
            setTimeout(() => {
                reset()
            }, 100)
        }
    }

    interface transformInterface {
        rotation: string;
        y: string;
        x: string;
    }
    
    interface displayTextInterface {
        text: string;
        color: string;
        value: string;
        transform: transformInterface[];
    }

    interface dataInterface {
        phone: displayTextInterface;
        email: displayTextInterface;
        github: displayTextInterface;
        [key: string]: any;
    }


    const normalColor = "#ffffff"
    const inactiveColor = "#141414"

    let wordCurrentColor = normalColor
    let phoneCurrentColor = normalColor
    let emailCurrentColor = normalColor
    let githubCurrentColor = normalColor

    let lastTransformedId = ""


    const data : dataInterface = {
        phone: {
            text: "+47 407 21 416",
            color: "#5fa0df",
            value: "+4740721416",
            transform: [
                { // +
                    rotation: "10deg",
                    y: "-1.5rem",
                    x: "-2.5rem"
                },
                { // 4
                    rotation: "-3deg",
                    y: "0rem",
                    x: "-2rem"
                },
                { // 7
                    rotation: "10deg",
                    y: "-1.5rem",
                    x: "-1.5rem"
                },
                { // 4
                    rotation: "14deg",
                    y: "-0.5rem",
                    x: "-1rem"
                },
                { // 0
                    rotation: "-19deg",
                    y: "0rem",
                    x: "-0.5rem"
                },
                { // 7
                    rotation: "-14deg",
                    y: "-1rem",
                    x: "0rem"
                },
                { // 2
                    rotation: "6deg",
                    y: "0rem",
                    x: "0.5rem"
                },
                { // 1
                    rotation: "13deg",
                    y: "0.5rem",
                    x: "1rem"
                },
                { // 4
                    rotation: "9deg",
                    y: "-1.5rem",
                    x: "1.5rem"
                },
                { // 1
                    rotation: "-6deg",
                    y: "0rem",
                    x: "2rem"
                },
                { // 6
                    rotation: "15deg",
                    y: "-1rem",
                    x: "2.5rem"
                },
                { // do not remove
                    rotation: "-6deg",
                    y: "0rem",
                    x: "0.5rem"
                },
                { // do not remove
                    rotation: "9deg",
                    y: "-1rem",
                    x: "1rem"
                },
                { // do not remove
                    rotation: "-5deg",
                    y: "-0.5rem",
                    x: "1rem"
                }
            ]
        },
        email: {
            text: "Email",
            color: "#ff0000",
            value: "erik.flatabo@gmail.com",
            transform: [
                {
                    rotation: "10deg",
                    y: "-1rem",
                    x: "-1rem"
                },
                {
                    rotation: "-10deg",
                    y: "0.5rem",
                    x: "-0.5rem"
                },
                {
                    rotation: "16deg",
                    y: "-1.5rem",
                    x: "-0rem"
                },
                {
                    rotation: "0deg",
                    y: "-0rem",
                    x: "0.5rem"
                },
                {
                    rotation: "-15deg",
                    y: "-1.5rem",
                    x: "1rem"
                },
            ]
        },
        github: {
            text: "Github",
            color: "#bf00ff",
            value: "https://github.kireobat.eu",
            transform: [
                {
                    rotation: "10deg",
                    y: "-1.5rem",
                    x: "-1.5rem"
                },
                {
                    rotation: "15deg",
                    y: "1rem",
                    x: "-1rem"
                },
                {
                    rotation: "0deg",
                    y: "-1rem",
                    x: "-0.1rem"
                },
                {
                    rotation: "-10deg",
                    y: "0.5rem",
                    x: "0.5rem"
                },
                {
                    rotation: "-13deg",
                    y: "-1.5rem",
                    x: "1rem"
                },
                {
                    rotation: "12deg",
                    y: "1.5rem",
                    x: "1rem"
                }
            ]
        }
    }

const hoverPhone = () => {
    if (isDisabled == true) {
        return
    }
    wordCurrentColor = inactiveColor
    phoneCurrentColor = data.phone.color
    emailCurrentColor = inactiveColor
    githubCurrentColor = inactiveColor
}

const hoverEmail = () => {
    if (isDisabled == true) {
        return
    }
    wordCurrentColor = inactiveColor
    phoneCurrentColor = inactiveColor
    emailCurrentColor = data.email.color
    githubCurrentColor = inactiveColor
}

const hoverGithub = () => {
    if (isDisabled == true) {
        return
    }
    wordCurrentColor = inactiveColor
    phoneCurrentColor = inactiveColor
    emailCurrentColor = inactiveColor
    githubCurrentColor = data.github.color
}

const reset = () => {
    wordCurrentColor = normalColor
    phoneCurrentColor = normalColor
    emailCurrentColor = normalColor
    githubCurrentColor = normalColor
}

const displayText = (data: displayTextInterface) => {
    let wordArray = []

    for (let i = 0; i < data.text.length; i++) {
        const delay = i * 0.05; // Adjust this multiplier to change the delay between each span

        const xMove = data.transform[i].x;
        const yMove = data.transform[i].y;
        const rotation = data.transform[i].rotation;

        if (data.text[i] === " ") {
            wordArray.push(`<div class="p-1 mx-[0.165rem] sm:mx-[0.27rem] md:mx-1.5 lg:mx-[0.575rem] inline"></div>`);
        } else {
            const delay = i * 0.05; // Adjust this multiplier to change the delay between each span

            const xMove = data.transform[i].x;
            const yMove = data.transform[i].y;
            const rotation = data.transform[i].rotation;

            const spanClass = `inline-block`; // Adjust this to match your Tailwind CSS classes
            const span = `<span class="${spanClass}">${data.text[i]}</span>`;
            
            wordArray.push(span);
        }
    }
    return wordArray.join("")
}

const transformSpans = (id: string) =>{
    if (lastTransformedId === id) {
        return
    }

    console.log("transform spans with id: " + id)

    const spans = document.querySelectorAll(`#${id} span`);

    for (let i = 0; i < spans.length; i++) {
        const span = spans[i] as HTMLElement;
        const transform = data[id].transform[i]

        span.style.transition = `transform 0.5s ease-in-out`;

        span.style.transform = `translate(${transform.x}, ${transform.y}) rotate(${transform.rotation})`;
    }

    lastTransformedId = id
}

const resetSpans = (id: string) =>{
    const spans = document.querySelectorAll(`#${id} span`);
    console.log("reset spans with id: " + id)

    for (let i = 0; i < spans.length; i++) {
        const span = spans[i] as HTMLElement;
        
        span.style.transform = `translate(0, 0) rotate(0)`;
    }

    lastTransformedId = ""
}

</script>

<div class="text-white text-4xl font-semibold w-[16.5rem] flex flex-col gap-4 sm:w-[22rem] sm:text-5xl  md:w-[27rem] md:text-6xl lg:w-[33rem] lg:text-7xl font-sofia-sans uppercase">
    <div class="flex justify-between">
        <p style="color: {wordCurrentColor}; transition: color 0.3s;">Erik</p>
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">Flatabø</p>
    </div>
    <div class="flex justify-between">
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">Web</p>
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">Developer</p>
    </div>
    <div class="flex justify-between">
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">&</p>
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">IT-Engineer</p>
    </div>
    <div class="flex justify-between">
        {#if isDisabled == false}
        <a href="tel:{data.phone.value}" on:mouseover={()=>{hoverPhone(); transformSpans("phone");}} on:focus={()=>{hoverPhone(); transformSpans("phone");}} on:mouseleave={()=>{reset(); resetSpans("phone")}} style="color: {phoneCurrentColor}; transition: color 0.3s;" id="phone">{@html displayText(data.phone)}</a>
        {:else}
        <p style="color: {phoneCurrentColor}; transition: color 0.3s;">{@html displayText(data.phone)}</p>
        {/if}
    </div>
    <div class="flex justify-between">
        {#if isDisabled == false}
        <a href="mailto:{data.email.value}" on:mouseover={()=>{hoverEmail(); transformSpans("email");}} on:focus={()=>{hoverEmail(); transformSpans("email");}} on:mouseleave={()=>{reset(); resetSpans("email")}} style="color: {emailCurrentColor}; transition: color 0.3s;" id="email">{@html displayText(data.email)}</a>
        <a href="{data.github.value}" target="_blank" on:mouseover={()=>{hoverGithub(); transformSpans("github");}} on:focus={()=>{hoverGithub(); transformSpans("github");}} on:mouseleave={()=>{reset(); resetSpans("github")}} style="color: {githubCurrentColor}; transition: color 0.3s;" id="github">{@html displayText(data.github)}</a>
        {:else}
        <p style="color: {emailCurrentColor}; transition: color 0.3s;">{@html displayText(data.email)}</p>
        <p style="color: {githubCurrentColor}; transition: color 0.3s;">{@html displayText(data.github)}</p>
        {/if}
    </div>
</div>