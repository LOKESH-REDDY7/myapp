let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice")

function speak(text) {
    let text_speak = new SpeechSynthesisUtterance(text);
    text_speak.rate = 1;
    text_speak.pitch = 1;
    text_speak.volume = 1;
    text_speak.lang = "en-GB";
    window.speechSynthesis.speak(text_speak);
}

function wishMe() {
    let day = new Date();
    let hours = day.getHours();
    if (hours >= 0 && hours < 12) {
        speak("Good morning Sir!");
    } else if (hours >= 12 && hours < 16) {  // Fixed incorrect range
        speak("Good afternoon sir!");
    } else {
        speak("Good evening sir!");
    }
}

window.addEventListener("load", () => {
    wishMe();
});

let SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
if (SpeechRecognition) {
    let recognition = new SpeechRecognition();

    recognition.onresult = (event) => {
        let currentIndex = event.resultIndex;
        let transcript = event.results[currentIndex][0].transcript;
        if (content) content.innerText = transcript;
        takecommand(transcript.toLowerCase());
    };

    if (btn) {
        btn.addEventListener("click", () => {
            recognition.start();
            btn.style.display = "none"
            voice.style.display = "block"
        });
    } else {
        console.error("Element with ID 'btn' not found.");
    }
} else {
    console.error("SpeechRecognition API is not supported in this browser.");
}

function takecommand(message) {
    btn.style.display = "flex"
    voice.style.display = "none"
    if (message.includes("hello Hinata") || message.includes("hey Hinata")) {
        speak("Hello sir!, what can I help you?");
    }
    else if(message.includes("hinata who are you")){
        speak("i am virtual assistant, created  by lokey")
    }else if(message.includes("hinata open youtube")){
        speak("opening youtube...")
        window.open("https://www.youtube.com/","_blank")
    }
    else if(message.includes("hinata open google")){
        speak("opening google...")
        window.open("https://www.google.com/","_blank")
    }
    else if(message.includes("hinata open instagram")){
        speak("opening instagram...")
        window.open("instagram://")
    }
    else if(message.includes("hinata open hotstar")){
        speak("opening jiohotstar...")
        window.open("https://www.hotstar.com/","_blank")
    }
    else if(message.includes("hinata open whatsapp")){
        speak("opening whatsapp...")
        window.open("whatsapp://")
    }
    else if(message.includes("time")){
        let time = new Date().toLocaleString(undefined,{hour:"numeric",minute:"numeric"})
        speak(time)
    }
    else if(message.includes("date")){
        let date = new Date().toLocaleString(undefined,{day:"numeric",month:"short"})
        speak(date)
    }
    else{
        let finalText = "this is what i found  on internet ragarding" + message.replace("hinta","") || message.replace("hinata","")
        speak(finalText)
        window.open(`https://www.google.com/search?q=${message.replace("hinta","")}`,"_blank")
    }
    
}
