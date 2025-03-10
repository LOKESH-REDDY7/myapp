let btn = document.querySelector("#btn");
let content = document.querySelector("#content");
let voice = document.querySelector("#voice");

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
    } else if (hours >= 12 && hours < 16) {
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
            btn.style.display = "none";
            voice.style.display = "block";
        });
    } else {
        console.error("Element with ID 'btn' not found.");
    }
} else {
    console.error("SpeechRecognition API is not supported in this browser.");
}

function takecommand(message) {
    btn.style.display = "flex";
    voice.style.display = "none";

    if (message.includes("hello hinata") || message.includes("hey hinata")) {
        speak("Hello sir!, what can I help you?");
    } else if (message.includes("hinata open youtube")) {
        speak("Opening YouTube...");
        window.location.href = "vnd.youtube://"; // Deep link for YouTube app
        setTimeout(() => {
            window.open("https://www.youtube.com/", "_blank"); // Fallback to website
        }, 2000);
    } else if (message.includes("hinata open google")) {
        speak("Opening Google...");
        window.location.href = "google://"; // Deep link for Google app
        setTimeout(() => {
            window.open("https://www.google.com/", "_blank"); // Fallback to website
        }, 2000);
    } else if (message.includes("hinata open instagram")) {
        speak("Opening Instagram...");
        window.location.href = "instagram://"; // Deep link for Instagram app
        setTimeout(() => {
            window.open("https://www.instagram.com/", "_blank"); // Fallback to website
        }, 2000);
    } else if (message.includes("hinata open hotstar")) {
        speak("Opening Hotstar...");
        window.location.href = "hotstar://"; // Deep link for Hotstar app
        setTimeout(() => {
            window.open("https://www.hotstar.com/", "_blank"); // Fallback to website
        }, 2000);
    } else if (message.includes("hinata open whatsapp")) {
        speak("Opening WhatsApp...");
        window.location.href = "whatsapp://"; // Deep link for WhatsApp app
        setTimeout(() => {
            window.open("https://web.whatsapp.com/", "_blank"); // Fallback to website
        }, 2000);
    } else if (message.includes("what's the time now")) {
        let time = new Date().toLocaleString(undefined, { hour: "numeric", minute: "numeric" });
        speak(time);
    } else if (message.includes("what's the date today")) {
        let date = new Date().toLocaleString(undefined, { day: "numeric", month: "short" });
        speak(date);
    } else {
        let finalText = "This is what I found on the internet regarding " + message.replace("hinata", "");
        speak(finalText);
        window.open(`https://www.google.com/search?q=${message.replace("hinata", "")}`, "_blank");
    }
}

if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => {
        navigator.serviceWorker.register("/service-worker.js")
            .then(() => console.log("Service Worker Registered"))
            .catch((error) => console.log("Service Worker Registration Failed", error));
    });
}
