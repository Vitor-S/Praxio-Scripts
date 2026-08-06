function createLoadingScreen() {
    const loadingScreen = document.createElement("div")
    loadingScreen.id = "loadingScreen"
    loadingScreen.style = `
        position: fixed;
        width: 100%;
        height: 100%;
        z-index: 9999;
        top: 0;
        left: 0;
        background-color: rgba(176, 176, 176, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
    `
    loadingScreen.innerHTML = `
        <i class="fa fa-spinner fa-spin" style="
            font-size: 25px;
            color: #1a1919;
            animation: fa-spin 0.6s infinite linear;
        "></i>
    `
    document.body.appendChild(loadingScreen)
}

function createToast() {
    const toastContainer = document.createElement('div')
    toastContainer.id = 'toast'
    toastContainer.addEventListener("click", () => {
        toastContainer.classList.remove("active-toast")
    })

    toastContainer.style.cssText = `
        cursor: pointer;
        position: fixed;
        min-width: 300px;
        min-height: 45px;
        background-color: #FFF;
        left: 50%;
        top: -80px;
        border-radius: 3px;
        overflow: hidden;
        display: flex;
        gap: 10px;
        opacity: 0;
        align-items: center;
        padding: 10px 15px;
        font-size: 1.5rem;
        transition: .3s ease-in-out;
        z-index: 10000;
        box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.48);
        color: #000;
        transform: translateX(-50%);
    `

    // ICON
    const toastIcon = document.createElement('i')
    toastIcon.id = "toast-icon"
    toastIcon.className = 'fa fa-exclamation-triangle'
    toastIcon.style.color = 'orange'

    // MESSAGE
    const toastMessage = document.createElement('span')
    toastMessage.id = "toast-message"
    toastMessage.innerText = 'Teste'

    // monta corretamente (sem sobrescrever depois)
    toastContainer.appendChild(toastIcon)
    toastContainer.appendChild(toastMessage)

    document.body.appendChild(toastContainer)
}

function createUpdateSlaButton() {
    document.querySelector(".page-header").style = "display: flex;"

    const updateSlaButton = document.createElement("button")
    updateSlaButton.id = "updateSlaButton"
    updateSlaButton.classList = "btn btn-primary btn-white dropdown-toggle"
    updateSlaButton.style.cssText = `
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 5px;
        margin-left: auto;
    `
    updateSlaButton.addEventListener("click", async () => await updateSLA())

    const updateSlaIcon = document.createElement('i')
    updateSlaIcon.id = "updatesla-icon"
    updateSlaIcon.className = 'fa fa-refresh'
    updateSlaIcon.style.color = '#8aafce;'

    const updateSlaText = document.createElement('span')
    updateSlaText.id = "updatesla-text"
    updateSlaText.innerText = 'Atualizar SLA'

    updateSlaButton.appendChild(updateSlaIcon)
    updateSlaButton.appendChild(updateSlaText)

    document.querySelector(".page-header").appendChild(updateSlaButton)
}

function createAutoUpdateSlaButton() {
    const autoUpdateButton = document.createElement("li")
    autoUpdateButton.id = "autoUpdateButton"
    autoUpdateButton.classList = "powertour-hook powertour-highlight hover-show hover-shown"
    autoUpdateButton.style.cssText = `
        width: 100%;
        aspect-ratio: 1/1;
        max-height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        background: transparent;
        border: none;
        border-bottom: 1px solid #e5e5e5;
        transition: .15s ease-in-out;
        cursor: pointer;
    `

    autoUpdateButton.addEventListener("click", () => {
        const currentState = localStorage.getItem("auto-update") == "true"
        localStorage.setItem("auto-update", !currentState)
        document.querySelector("#autoupdate-icon").style.color = !currentState ? '#5A5A5A' : '#CCC'
    })

    const autoUpdateState = localStorage.getItem("auto-update")

    const autoUpdateIcon = document.createElement('i')
    autoUpdateIcon.id = "autoupdate-icon"
    autoUpdateIcon.className = 'fa fa-refresh'
    autoUpdateIcon.style.color = autoUpdateState == true || autoUpdateState == "true" ? '#5A5A5A' : '#CCC'
    autoUpdateIcon.style.fontSize = "18px"

    autoUpdateButton.appendChild(autoUpdateIcon)

    document.querySelector("#sidebar-collapse").before(autoUpdateButton)
}

/*function createToolTip() {
    // Mensagens por ID
    const mensagens = {
        "grdTicket_DXDataRow0": "Texto da primeira linha.",
        "grdTicket_DXDataRow1": "Texto da segunda linha.",
        "grdTicket_DXDataRow2": "Texto da terceira linha.",
        "grdTicket_DXDataRow3": "Texto da quarta linha."
    };

    // Cria o tooltip
    const tooltip = document.createElement("div");
    Object.assign(tooltip.style, {
        position: "fixed",
        display: "none",
        background: "#333",
        color: "#fff",
        padding: "6px 10px",
        borderRadius: "4px",
        fontSize: "12px",
        pointerEvents: "none",
        zIndex: "999999",
        boxShadow: "0 2px 8px rgba(0,0,0,.3)",
        maxWidth: "250px",
        whiteSpace: "normal"
    });

    document.body.appendChild(tooltip);

    let linhaAtual = null;

    // Quando entra em uma linha
    document.addEventListener("mouseover", function (e) {
        const row = e.target.closest(".dxgvDataRow_Metropolis");
        if (!row) return;

        linhaAtual = row;

        // Remove destaque da linha anterior
        if (linhaAtual) {
            linhaAtual.style.backgroundColor = "#f5f5f5";
        }

        tooltip.textContent = mensagens[row.id] || "Sem informação para esta linha.";

        tooltip.style.display = "block";
        tooltip.style.left = (e.clientX + 15) + "px";
        tooltip.style.top = (e.clientY + 15) + "px";
    });

    document.addEventListener("click", function (e) {
        const row = e.target.closest(".dxgvDataRow_Metropolis");
        if (!row) return;

        // Remove classes de seleção
        row.classList.remove("dxgvSelectedRow_Metropolis");
        row.classList.remove("dxgvFocusedRow_Metropolis");

        // Remove estilos aplicados inline
        row.style.backgroundColor = "#CCC;";
    });

    // Move o tooltip junto com o mouse
    document.addEventListener("mousemove", function (e) {
        if (!linhaAtual) return;

        tooltip.style.left = (e.clientX + 15) + "px";
        tooltip.style.top = (e.clientY + 15) + "px";
    });

    // Esconde ao sair da linha
    document.addEventListener("mouseout", function (e) {
        if (!e.target.closest(".dxgvDataRow_Metropolis")) return;

        if (linhaAtual) {
            linhaAtual.style.backgroundColor = "";
        }

        linhaAtual = null;
        tooltip.style.display = "none";
    });
}*/

function createElements() {
    createLoadingScreen()
    createToast()
    createUpdateSlaButton()
    createAutoUpdateSlaButton()
    // createToolTip()
}