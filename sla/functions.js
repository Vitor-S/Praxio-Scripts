function invokeToast(message, icon="warning", time=3500){
    const toast = document.querySelector("#toast")
    const toastIcon = document.querySelector("#toast-icon")
    const toastMessage = document.querySelector("#toast-message")

    toastIcon.style.color = icon == "check" ? "green" : icon == "error" ? "red" : "orange"
    toastIcon.classList = icon == "check" ? "fa fa-check" : icon == "error" ? "fa fa-times" : "fa fa-exclamation-triangle"
    toastMessage.innerText = message.charAt(0).toUpperCase() + message.slice(1)

    toast.classList.add("active-toast")

    setTimeout(() => {
        toast.classList.remove("active-toast")
    }, time)
}

function getSlaColumnIndex() {
    const header = document.querySelector("#grdTicket_DXHeadersRow0")
    if (!header) return null

    const heads = header.querySelectorAll(":scope > td")

    const slaTargetIndex = Array.from(heads).findIndex(
        head => head.innerText.trim() === "Previsão de Entrega"
    )

    if (slaTargetIndex === -1) {
        invokeToast("Você deve adicionar a coluna Previsão de Entrega", "error")
        return null
    }

    heads[slaTargetIndex].innerText = "Tempo SLA"
    return slaTargetIndex
}