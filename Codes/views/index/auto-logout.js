var frequency = null
var loggedout = false

window.onblur = function() { if (!loggedout) enableTimeout() }
window.onfocus = function() {
    if (frequency !== null) {
        clearTimeout(frequency);
        frequency = null
    }
}
window.onclick = function() {
    if (frequency !== null) {
        clearTimeout(frequency);
        frequency = null
    }
}

function enableTimeout() {
    frequency = setTimeout(function() {
            loggedout = true
                //console.log("User logged out")
            window.location.replace('/login')
        }, (5 * 60 * 1000)) // 1 Minute timrout
}