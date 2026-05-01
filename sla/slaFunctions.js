// função que verifica a coluna "previsão de entrega" e troca ela para "tempo SLA"
function getSlaColumnIndex() {
    alert("Ok")
    const header = document.querySelector("#grdTicket_DXHeadersRow0")
    alert("Ok")
    if (!header) return null

    const heads = header.querySelectorAll(":scope > td")

    const slaTargetIndex = Array.from(heads).findIndex(
        head => head.innerText.trim() === "Previsão de Entrega"
    )

    if (slaTargetIndex === -1) {
        invokeToast("Você deve adicionar a coluna Previsão de Entrega na tabela!", "error", 0, true, false)
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

    return data
}

// função que salva a lista de sla no local storage
function saveSlaList(slaList) {
    localStorage.setItem("sla-list", JSON.stringify(slaList))
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

        // 🎯 cores SLA
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
    const slaColumnIndex = getSlaColumnIndex()
    const slaList = JSON.parse(localStorage.getItem("sla-list"))

    updateSlaInTable(slaList, slaColumnIndex)
}

// função que pega os sla's do local storage a atuliza na coluna "tempo SLA"
async function handleSLA() {
    console.log("iniciando handleSLA");

    const slaColumnIndex = getSlaColumnIndex()
    const idList = getTicketIdList()

    invokeToast("Buscando dados de SLA, por favor aguarde...", "loading", 0, true)

    try {
        const slaList = await getSlaList(idList, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWVzIjpbeyJrZXkiOiJBU1AuTkVUX1Nlc3Npb25JZCIsInZhbHVlIjoid2J4bm0yeXNkNXRkM3pmc2M0eHdzdnNyIiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA1LTAxVDA3OjIyOjMwLjM5MVoiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA1LTAxVDA3OjIyOjMyLjU2MFoiLCJzYW1lU2l0ZSI6ImxheCJ9LHsia2V5IjoiLkFTUFhBVVRIIiwidmFsdWUiOiIwMUZCNDBBOThDQjgyOThGMTAzQkQxQ0Q4MTlERjg1NjUyMDNBNzQ1MjhCNEUwODc0RjA0QjNGRDRBNDRGNDA3OTlERUM2RTBDRThGOTIwQTlDREQwQTEyOEE5MzE2NzY0NkRDRTc0RjZBQzNCMzhDMDg0NjYwNzUxRkFFRjA3MDkxODY1REVCNzI0NUEyQUY2MTQwOEEzMDE2MzMzMkEwMTFCRTE1NzUxREMzNDJCMDU4NUU3OTE5RTA2MzlDNUEwM0VFMDE0RTcyMDc5Q0VFRjFEMzA3Rjg5OTcyMzI5MjY3OEM1QzFFRUVBMTA2MjFEMTAxMkFDQ0Q2NkREQzNFIiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA1LTAxVDA3OjIyOjMwLjM5MVoiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA1LTAxVDA3OjIyOjMyLjU2MFoiLCJzYW1lU2l0ZSI6ImxheCJ9XSwiaWF0IjoxNzc3NjIwMTUyLCJleHAiOjE3Nzc2MzQ1NTJ9.RXYdEpDeIEXclcJcwyAROsQLU0X4MMpZUfBiIbfIDlM')

        saveSlaList(slaList)

        updateSlaInTable(slaList, slaColumnIndex)

        invokeToast("SLA's atualizados com sucesso!", "check", 2000)
    } catch (e) {
        invokeToast("Erro ao buscar os dados de SLA!", "error", revoke = true)
    }
}