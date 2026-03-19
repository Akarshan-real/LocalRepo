(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, response) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        }
        else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
        }
        else if (type === "DELETE") {
            currentVideoBookmarks = currentVideoBookmarks.filter(b => b.time !== value);
            chrome.storage.sync.set({
                [currentVideo]: JSON.stringify(currentVideoBookmarks)
            })
            response(currentVideoBookmarks);
        }
    });

    const fetchBookmarks = async () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(currentVideo, (data) => {
                resolve(data[currentVideo] ? JSON.parse(data[currentVideo]) : []);
            });
        });
    };

    const newVideoLoaded = async () => {
        const bookMarkButtonExist = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookMarkButtonExist) {
            const waitForElement = (className) => new Promise(resolve => {
                const interval = setInterval(() => {
                    const el = document.getElementsByClassName(className)[0];
                    if (el) { clearInterval(interval); resolve(el); }
                }, 100);
            });

            youtubeLeftControls = await waitForElement("ytp-left-controls");
            youtubePlayer = document.querySelector("video");

            const bookMarkButton = document.createElement("img");
            bookMarkButton.src = chrome.runtime.getURL("assets/bookmark.png");
            bookMarkButton.className = "ytp-button bookmark-btn";
            bookMarkButton.title = "Click to bookmark current timestamp";

            youtubeLeftControls.appendChild(bookMarkButton);
            bookMarkButton.addEventListener("click", addNewBookmarkEventHandler);
        }
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            desc: "Bookmark at " + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();

        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        })
    }

    newVideoLoaded();
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString().substr(11, 8);
};