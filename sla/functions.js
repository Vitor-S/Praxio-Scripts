function invokeToast(message, icon="warning"){
    const toast = document.querySelector("#toast")
    const toastIcon = document.querySelector("#toast-icon")
    const toastMessage = document.querySelector("#toast-message")

    toastIcon.style.color = icon == "check" ? "green" : "red"
    toastIcon.classList = icon == "check" ? "fa fa-check" : icon == "error" ? "fa fa-times" : "fa fa-exclamation-triangle"
    toastMessage.innerText = message.charAt(0).toUpperCase() + message.slice(1)

    toast.classList.add("active-toast")

    setTimeout(() => {
        toast.classList.remove("active-toast")
    }, 3500)
}

function getSlaColumnIndex() {
    const header = document.querySelector("#grdTicket_DXHeadersRow0")
    if (!header) return null

    const heads = header.querySelectorAll(":scope > td")

    const slaTargetIndex = Array.from(heads).findIndex(
        head => head.innerText.trim() === "Previsão de Entrega"
    )

    if (slaTargetIndex === -1) {
        invokeToast("Você deve adicionar a coluna Previsão de Entrega", "warning")
        return null
    }

    heads[slaTargetIndex].innerText = "Tempo SLA"
    return slaTargetIndex
}