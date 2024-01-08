chrome.storage.local.get(["playbackRate"]).then((result)=> {
    var video = document.querySelector('video')
    if(video) {
        video.playbackRate = result.playbackRate
        console.log(result)
    }
})

