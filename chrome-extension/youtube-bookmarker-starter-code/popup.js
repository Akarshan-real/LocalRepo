import { getActiveTabURL } from "./utils";

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarkElement, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");
    const controlElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";
    controlElement.className = "bookmark-controls";

    setBookmarkAttributes("play", onPlay, controlElement);
    setBookmarkAttributes("delete", onDelete, controlElement);

    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);


    newBookmarkElement.appendChild(bookmarkTitleElement);
    newBookmarkElement.appendChild(controlElement);
    bookmarkElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentVideoBookmarks = []) => {
    const bookmarkElement = document.getElementsByClassName("bookmarks")[0];
    bookmarkElement.innerHTML = "";

    if (currentVideoBookmarks.length > 0) {
        for (let i = 0; i < currentVideoBookmarks.length; i++) {
            const bookmark = currentVideoBookmarks[i];
            addNewBookmark(bookmarkElement, bookmark);
        };
    }
    else {
        bookmarkElement.innerHTML = `<i class="title">No bookmarks for this video yet. Start adding some!</i>`;
    }
};

const onPlay = async e => {
    const timestamp = e.target.parentNode.parentNode.getAttribute("timestamp");
    const activetab = await getActiveTabURL();
    chrome.tabs.sendMessage(activetab.id, {
        type: "PLAY",
        value: parseFloat(timestamp)
    });
};

const onDelete = async e => {
    const activeTab = await getActiveTabURL();
    const bookmarkTime = e.target.parentNode.parentNode.getAttribute("timestamp");

    document.getElementById("bookmark-" + bookmarkTime)?.remove();

    chrome.tabs.sendMessage(activeTab.id, {
        type: "DELETE",
        value: bookmarkTime
    }, viewBookmarks);
};

const setBookmarkAttributes = (src, eventListner, controlParentElement) => {
    const controlElement = document.createElement("img");

    controlElement.src = "assets/" + src + ".png";
    controlElement.title = src;
    controlElement.addEventListener("click", eventListner);
    controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTabURL = await getActiveTabURL();
    const queryParameters = activeTabURL.url.split("?")[1];
    const urlParams = new URLSearchParams(queryParameters);
    const currentVideo = urlParams.get("v");

    if (activeTabURL.url.includes("youtube.com/watch") && currentVideo) {
        chrome.storage.sync.get([currentVideo], (data) => {
            const currentVideoBookmarks = data[currentVideo] ? JSON.parse(data[currentVideo]) : [];

            viewBookmarks(currentVideoBookmarks);
        });
    }
    else {
        const container = document.getElementsByClassName("container")[0];
        container.innerHTML = `<h2 class="title">This is not a YouTube video page.</h2>`;
    };
});
