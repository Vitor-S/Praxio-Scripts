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

    return data
}

// função que salva a lista de sla no local storage
function saveSlaList(slaList) {
    localStorage.setItem("sla-list", JSON.stringify(slaList))
}

// função que pega os sla's do local storage a atuliza na coluna "tempo SLA"
async function handleSLA() {
    const slaColumnIndex = getSlaColumnIndex()
    const idList = getTicketIdList()

    invokeToast("Buscando dados de SLA, por favor aguarde...", "info", 10000)

    try{
        const slaList =await getSlaList(idList, 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjb29raWVzIjpbeyJrZXkiOiJBU1AuTkVUX1Nlc3Npb25JZCIsInZhbHVlIjoid2J4bm0yeXNkNXRkM3pmc2M0eHdzdnNyIiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA1LTAxVDA3OjIyOjMwLjM5MVoiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA1LTAxVDA3OjIyOjMyLjU2MFoiLCJzYW1lU2l0ZSI6ImxheCJ9LHsia2V5IjoiLkFTUFhBVVRIIiwidmFsdWUiOiIwMUZCNDBBOThDQjgyOThGMTAzQkQxQ0Q4MTlERjg1NjUyMDNBNzQ1MjhCNEUwODc0RjA0QjNGRDRBNDRGNDA3OTlERUM2RTBDRThGOTIwQTlDREQwQTEyOEE5MzE2NzY0NkRDRTc0RjZBQzNCMzhDMDg0NjYwNzUxRkFFRjA3MDkxODY1REVCNzI0NUEyQUY2MTQwOEEzMDE2MzMzMkEwMTFCRTE1NzUxREMzNDJCMDU4NUU3OTE5RTA2MzlDNUEwM0VFMDE0RTcyMDc5Q0VFRjFEMzA3Rjg5OTcyMzI5MjY3OEM1QzFFRUVBMTA2MjFEMTAxMkFDQ0Q2NkREQzNFIiwiZG9tYWluIjoicG9ydGFsZG9jbGllbnRlLnByYXhpby5jb20uYnIiLCJwYXRoIjoiLyIsImh0dHBPbmx5Ijp0cnVlLCJob3N0T25seSI6dHJ1ZSwiY3JlYXRpb24iOiIyMDI2LTA1LTAxVDA3OjIyOjMwLjM5MVoiLCJsYXN0QWNjZXNzZWQiOiIyMDI2LTA1LTAxVDA3OjIyOjMyLjU2MFoiLCJzYW1lU2l0ZSI6ImxheCJ9XSwiaWF0IjoxNzc3NjIwMTUyLCJleHAiOjE3Nzc2MzQ1NTJ9.RXYdEpDeIEXclcJcwyAROsQLU0X4MMpZUfBiIbfIDlM')

        saveSlaList(slaList)

        invokeToast("SLA's atualizados com sucesso!", "success", 2000)
    }catch(e){
        invokeToast("Erro ao buscar os dados de SLA!", "error")
    }
}