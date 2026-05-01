function invokeToast(message, icon = "warning", time = 3500, infinite = false, revoke = false) {
    const toast = document.querySelector("#toast")
    const toastIcon = document.querySelector("#toast-icon")
    const toastMessage = document.querySelector("#toast-message")

    toastIcon.style.color = icon == "check" ? "green" : icon == "error" ? "red" : "orange"
    toastIcon.classList = icon == "check" ? "fa fa-check" : icon == "error" ? "fa fa-times" : "fa fa-exclamation-triangle"
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