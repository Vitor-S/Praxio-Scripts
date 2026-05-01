function invokeToast(message, icon = "warning", time = 3500, infinite = false, revoke = false) {
    const toast = document.querySelector("#toast")
    const toastIcon = document.querySelector("#toast-icon")
    const toastMessage = document.querySelector("#toast-message")

    switch (icon) {
        case "check":
            toastIcon.style.color = "green"
            toastIcon.classList = "fa fa-check"
            break
        case "error":
            toastIcon.style.color = "red"
            toastIcon.classList = "fa fa-times"
            break
        case "loading":
            toastIcon.style.color = "black"
            toastIcon.classList = "fa fa-spinner fa-spin"
            break
        default:
            toastIcon.style.color = "orange"
            toastIcon.classList = "fa fa-exclamation-triangle"
    }

    toastMessage.innerText = message.charAt(0).toUpperCase() + message.slice(1)

    if (revoke) {
        toast.classList.remove("active-toast")
    }
    else {
        toast.classList.add("active-toast")
    }

    if (infinite) return

    setTimeout(() => {
        toast.classList.remove("active-toast")
    }, time)
}

function formatMinutesToHHMM(totalMinutes) {
    if (totalMinutes == null || isNaN(totalMinutes)) return ""

    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}