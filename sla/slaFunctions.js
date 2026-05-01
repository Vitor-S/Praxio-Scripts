// função que verifica a coluna "previsão de entrega" e troca ela para "tempo SLA"
function getSlaColumnIndex() {
    const header = document.querySelector("#grdTicket_DXHeadersRow0")
    if (!header) return null

    const heads = header.querySelectorAll(":scope > td")

    const slaTargetIndex = Array.from(heads).findIndex(
        head => head.innerText.trim() === "Previsão de Entrega"
    )

    if (slaTargetIndex === -1) {
        invokeToast("Você deve adicionar a coluna Previsão de Entrega na tabela!", "error")
        return null
    }

    heads[slaTargetIndex].innerText = "Tempo SLA"
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

        return res.json()
    })

    const data = await Promise.all(ticketPromises)
    const test = data.map(({ version, message, ...rest }) => rest)

    return test
}

// função que salva a lista de sla no local storage
function saveSlaList(slaList) {
    localStorage.setItem("slaList", JSON.stringify(slaList))
}

// função que pega os sla's do local storage a atuliza na coluna "tempo SLA"
async function handleSLA() {
    
}