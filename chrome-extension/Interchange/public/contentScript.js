setTimeout(() => {
    const video = document.querySelector("video");
    console.log("video found:", video);
    
    video.addEventListener("pause", () => {
        chrome.runtime.sendMessage({ action: "paused" });
    });
    video.addEventListener("play", () => {
        chrome.runtime.sendMessage({ action: "played" });
    });
}, 3000);