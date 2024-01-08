
document.addEventListener('DOMContentLoaded', ()=>{
    const input = document.querySelector('input')

    chrome.storage.local.get(["playbackRate"]).then((result)=> {
        const defaultValue = result.playbackRate
        input.value = parseFloat(String(defaultValue)) || 1
        input.focus()


        input.addEventListener('input', (event) => {
            updatePlaybackRate(event.target.value)
        })
        input.addEventListener('keypress',  (e) => {
            if (e.key === 'Enter') {
                window.close()
            }
        });
    })

} )


function updatePlaybackRate (playbackRate) {
    console.log(chrome.storage.local,  chrome.tabs)
    chrome.tabs.query({
        active: true,
        currentWindow: true
    }, ([currentTab]) => {
        console.log(currentTab);

        chrome.storage.local.set({
            playbackRate: playbackRate
        },  ()=>  {
            chrome.scripting.executeScript({
                target: {tabId: currentTab.id, allFrames: true},
                files: ['scripts/content.js'],
            });
        });
    });


}
