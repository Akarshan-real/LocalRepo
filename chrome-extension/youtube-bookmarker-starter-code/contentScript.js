(() => {
    let youtubeLeftControls, youtubePlayer;
    let currentVideo = "";
    let currentVideoBookmarks = [];

    chrome.runtime.onMessage.addListener((obj, sender, res) => {
        const { type, value, videoId } = obj;

        if (type === "NEW") {
            currentVideo = videoId;
            newVideoLoaded();
        } else if (type === "PLAY") {
            youtubePlayer.currentTime = value;
        } else if (type === "DELETE") {
            currentVideoBookmarks = currentVideoBookmarks.filter(b => b.time !== value);
            chrome.storage.sync.set({ [currentVideo]})
        }
    });

    const fetchBookmarks = async () => {
        return new Promise((resolve) => {
            chrome.storage.sync.get(currentVideo, (data) => {
                resolve(data[currentVideo] ? JSON.stringify(data[currentVideo]) : []);
            });
        });
    };

    const newVideoLoaded = async () => {
        const bookMarkButtonExist = document.getElementsByClassName("bookmark-btn")[0];
        currentVideoBookmarks = await fetchBookmarks();

        if (!bookMarkButtonExist) {
            const bookMarkButton = document.createElement("img");

            bookMarkButton.src = chrome.runtime.getURL("assets/bookmark.png");
            bookMarkButton.className = "ytp-button " + "bookmark-btn";
            bookMarkButton.title = "Click to bookmar current timestamp";

            youtubeLeftControls = document.getElementsByClassName("ytp-left-controls")[0];
            youtubePlayer = document.getElementsByClassName("video-steam")[0];

            youtubeLeftControls.appendChild(bookMarkButton);
            bookMarkButton.addEventListener("click", addNewBookmarkEventHandler);
        };
    };

    const addNewBookmarkEventHandler = async () => {
        const currentTime = youtubePlayer.currentTime;
        const newBookmark = {
            time: currentTime,
            description: "Bookmark at " + getTime(currentTime),
        };

        currentVideoBookmarks = await fetchBookmarks();

        console.log(newBookmark);

        chrome.storage.sync.set({
            [currentVideo]: JSON.stringify([...currentVideoBookmarks, newBookmark].sort((a, b) => a.time - b.time))
        })
    }
})();

const getTime = t => {
    var date = new Date(0);
    date.setSeconds(t);

    return date.toISOString.substr(11, 8);
};