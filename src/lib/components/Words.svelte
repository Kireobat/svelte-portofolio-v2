<script lang="ts">
    import Layout from "../../routes/+layout.svelte";

    interface transformInterface {
        rotation: string;
        y: string;
        x: string;
    }
    
    interface displayTextInterface {
        text: string;
        color: string;
        transform: transformInterface[];
    }

    interface dataInterface {
        phone: displayTextInterface;
        email: displayTextInterface;
        github: displayTextInterface;
        [key: string]: any;
    }


    const normalColor = "#ffffff"
    const inactiveColor = "#a4a4a4"

    let wordCurrentColor = normalColor
    let phoneCurrentColor = normalColor
    let emailCurrentColor = normalColor
    let githubCurrentColor = normalColor

    let lastTransformedId = ""

    const data : dataInterface = {
        phone: {
            text: "+47_407_21_416",
            color: "#5fa0df",
            transform: [
                {
                    rotation: "10deg",
                    y: "-1.5rem",
                    x: "-1.5rem"
                },
                {
                    rotation: "-3deg",
                    y: "0rem",
                    x: "-1.5rem"
                },
                {
                    rotation: "10deg",
                    y: "-1.5rem",
                    x: "-1rem"
                },
                { //underscore
                    rotation: "0deg",
                    y: "-0rem",
                    x: "-0rem"
                },
                {
                    rotation: "-19deg",
                    y: "0rem",
                    x: "-1rem"
                },
                {
                    rotation: "-14deg",
                    y: "-1rem",
                    x: "-1rem"
                },
                {
                    rotation: "6deg",
                    y: "0rem",
                    x: "-0.5rem"
                },
                { //underscore
                    rotation: "0deg",
                    y: "0rem",
                    x: "0rem"
                },
                {
                    rotation: "-3deg",
                    y: "0.5rem",
                    x: "0rem"
                },
                {
                    rotation: "13deg",
                    y: "-1.5rem",
                    x: "0rem"
                },
                { // underscore
                    rotation: "0deg",
                    y: "0rem",
                    x: "0rem"
                },
                {
                    rotation: "-6deg",
                    y: "0rem",
                    x: "0.5rem"
                },
                {
                    rotation: "9deg",
                    y: "-1rem",
                    x: "1rem"
                },
                {
                    rotation: "-5deg",
                    y: "-0.5rem",
                    x: "1rem"
                }
            ]
        },
        email: {
            text: "Email",
            color: "#ff0000",
            transform: [
                {
                    rotation: "10deg",
                    y: "-1rem",
                    x: "-0.5rem"
                },
                {
                    rotation: "-10deg",
                    y: "0rem",
                    x: "-1rem"
                },
                {
                    rotation: "16deg",
                    y: "-1.5rem",
                    x: "-0.5rem"
                },
                {
                    rotation: "0deg",
                    y: "-0rem",
                    x: "-0.5rem"
                },
                {
                    rotation: "-15deg",
                    y: "-1.5rem",
                    x: "0rem"
                },
            ]
        },
        github: {
            text: "Github",
            color: "#bf00ff",
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
    wordCurrentColor = inactiveColor
    phoneCurrentColor = data.phone.color
    emailCurrentColor = inactiveColor
    githubCurrentColor = inactiveColor
}

const hoverEmail = () => {
    wordCurrentColor = inactiveColor
    phoneCurrentColor = inactiveColor
    emailCurrentColor = data.email.color
    githubCurrentColor = inactiveColor
}

const hoverGithub = () => {
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

        if (data.text[i] === "_") {
            wordArray.push(`<div class="p-1 inline"></div>`);
        } else {
            const delay = i * 0.05; // Adjust this multiplier to change the delay between each span

            const xMove = data.transform[i].x;
            const yMove = data.transform[i].y;
            const rotation = data.transform[i].rotation;

            const spanClass = `hover:bg-slate-500 inline-block`; // Adjust this to match your Tailwind CSS classes
            const span = `<span class="${spanClass}" style="transition-delay: ${delay}s; transform: translate(${xMove}, ${yMove}) rotate(${rotation});">${data.text[i]}</span>`;
            
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

<div class="text-white text-5xl font-semibold w-[20.7rem] flex flex-col gap-4 sm:w-[26rem] sm:text-6xl  md:w-[31rem] md:text-7xl lg:w-[41rem] lg:text-8xl">
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
        <p  style="color: {wordCurrentColor}; transition: color 0.3s;">Programmer</p>
    </div>
    <div class="flex justify-between">
        <p on:mouseover={()=>{hoverPhone(); transformSpans("phone");}} on:focus={hoverPhone} on:mouseleave={()=>{reset(); resetSpans("phone")}} style="color: {phoneCurrentColor}; transition: color 0.3s;" id="phone">{@html displayText(data.phone)}</p>
    </div>
    <div class="flex justify-between">
        <p on:mouseover={()=>{hoverEmail(); transformSpans("email");}} on:focus={hoverEmail} on:mouseleave={()=>{reset(); resetSpans("email")}} style="color: {emailCurrentColor}; transition: color 0.3s;" id="email">{@html displayText(data.email)}</p>
        <p on:mouseover={()=>{hoverGithub(); transformSpans("github");}} on:focus={hoverGithub} on:mouseleave={()=>{reset(); resetSpans("github")}} style="color: {githubCurrentColor}; transition: color 0.3s;" id="github">{@html displayText(data.github)}</p>
    </div>
</div>