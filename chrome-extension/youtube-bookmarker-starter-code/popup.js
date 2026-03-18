import { getActiveTabURL } from "./utils";;

// adding a new bookmark row to the popup
const addNewBookmark = (bookmarkElement, bookmark) => {
    const bookmarkTitleElement = document.createElement("div");
    const newBookmarkElement = document.createElement("div");

    bookmarkTitleElement.textContent = bookmark.desc;
    bookmarkTitleElement.className = "bookmark-title";

    newBookmarkElement.id = "bookmark-" + bookmark.time;
    newBookmarkElement.className = "bookmark";
    newBookmarkElement.setAttribute("timestamp", bookmark.time);

    newBookmarkElement.appendChild(bookmarkTitleElement);
    bookmarkElement.appendChild(newBookmarkElement);
};

const viewBookmarks = (currentVideoBookmarks = []) => {
    const bookmarkElement = document.getElementsByClassName("bookmark-list")[0];
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

const onPlay = e => { };

const onDelete = e => { };

const setBookmarkAttributes = (src, eventListner, controlParentElement) => {
    const controlElement = document.createElement("img");

    controlElement.src = "assets/" + src + ".png";
    controlElement.title = src;
    controlElement.addEventListener("click", eventListner);
    controlParentElement.appendChild(controlElement);
};

document.addEventListener("DOMContentLoaded", async () => {
    const activeTabURL = await getActiveTabURL();
    const queryParameters = activeTabURL.split("?")[1];
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
