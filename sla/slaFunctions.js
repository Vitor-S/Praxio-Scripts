async function login() {
    try {
        const res = await fetch(`https://portal-livid-five.vercel.app/api/login`)
        return res.json()
    } catch (err) {
        console.log(err);
    }
}

// função que verifica a coluna "previsão de entrega" e troca ela para "tempo SLA"
function getAndReplaceColumn(search, replace_text) {
    const header = document.querySelector("#grdTicket_DXHeadersRow0")
    if (!header) return null

    const heads = header.querySelectorAll(":scope > td")

    const slaTargetIndex = Array.from(heads).findIndex(
        head => head.innerText.trim() === search || head.innerText.trim() === replace_text
    )

    if (slaTargetIndex === -1) {
        invokeToast(`Você deve adicionar a coluna ${search} na tabela!`, "error", 0, true, false)
        return null
    }

    heads[slaTargetIndex].innerText = replace_text
    return slaTargetIndex
}

// Função que pega a lista de ids dos tickets da tabela do portal
function getTicketIdList() {
    const tickets = document.querySelectorAll(".dxgvDataRow_Metropolis")
    const ticketIds = Array.from(tickets).map(ticket => ticket.querySelector("a").href.split("/Ticket/TicketPrincipal/")[1])
    return ticketIds
}

// Função que recebe a lista de ids de tickets, busca o sla de cada um e retorna a lista de sla's
async function getSlaList(listId, token) {
    try {
        const ticketPromises = listId.map(async (idTicket) => {
            const res = await fetch(
                `https://portal-livid-five.vercel.app/api/sla?idTicket=${idTicket}`,
                {
                    method: "GET",
                    headers: {
                        "Authorization": `Bearer ${token}`,
                        "Content-Type": "application/json"
                    }
                }
            )

            // Verifica erro HTTP
            if (!res.ok) {
                throw new Error(`Erro HTTP: ${res.status}`)
            }

            return res.json()
        })

        const data = await Promise.all(ticketPromises)

        return data

    } catch (err) {
        console.error(err)

        invokeToast("Erro ao buscar SLA!", "error")

        throw err
    }
}

// função que salva a lista de sla no local storage
function saveSlaList(slaList) {
    localStorage.setItem("sla-list", JSON.stringify(slaList))
    localStorage.setItem("sla-last-update", new Date().getTime())
}

// retorna true se ja se passaram x minutos desde a última atualização ou se a lista não estiver salva no local storage
function verifyLastUpdate(minutes = 10) {
    const lastUpdate = localStorage.getItem("sla-last-update")
    const slaList = localStorage.getItem("sla-list")
    if (!lastUpdate || !slaList) return true

    const currentTime = new Date().getTime()
    const timeDiff = currentTime - lastUpdate

    return timeDiff > 1000 * 60 * minutes || !slaList;
}

// Função para atualizar SLA's na tabela do portal
function updateSlaInTable(slaList, slaColumnIndex) {
    const tickets = document.querySelectorAll(".dxgvDataRow_Metropolis")

    tickets.forEach(ticket => {
        const cells = ticket.querySelectorAll("td")
        const cell = cells[slaColumnIndex]

        if (!cell) {
            invokeToast("Coluna não encontrada", "warning")
            return
        }

        const link = ticket.querySelector("a")
        if (!link) return

        const idTicket = link.href.split("/Ticket/TicketPrincipal/")[1]
        const slaData = slaList.find(sla => sla.idTicket === idTicket)

        if (!slaData) return

        if (slaData.sla <= 600) {
            cell.style.color = "green"
        } else if (slaData.sla <= 1380) {
            cell.style.color = "blue"
        } else if (slaData.sla >= 1440) {
            cell.style.color = "red"
        } else {
            cell.style.color = "black"
        }

        cell.innerText = formatMinutesToHHMM(slaData.sla)
    })
}

// atualizar tabela com base no sla salvo no local storage
function updateSlaFromLocalStorage() {
    const slaColumnIndex = getAndReplaceColumn("Previsão de Entrega", "Tempo SLA")
    if (slaColumnIndex === null) return false

    const slaList = JSON.parse(localStorage.getItem("sla-list"))
    if (!slaList) return false

    updateSlaInTable(slaList, slaColumnIndex)
    return true
}

// função que pega os sla's do local storage a atuliza na coluna "tempo SLA"
async function updateSLA() {
    const slaColumnIndex = getAndReplaceColumn("Previsão de Entrega", "Tempo SLA")
    if (slaColumnIndex === null) return

    const idList = getTicketIdList()
    if (!idList) return

    invokeToast("Buscando dados de SLA, por favor aguarde...", "loading", 0, true)

    try {
        const token = localStorage.getItem("token")
        const slaList = await getSlaList(idList, token)

        saveSlaList(slaList)
        updateSlaInTable(slaList, slaColumnIndex)

        invokeToast("SLA's atualizados com sucesso!", "check", 2000)
    } catch (e) {
        invokeToast("Erro ao buscar os dados de SLA!", "error", 2000)

        const res = await login()
        const token = res.token

        localStorage.setItem("token", token)
        invokeToast("Um novo token foi criado. Tentando novamente!", "loading", 0, true)

        await updateSLA()
    }
}