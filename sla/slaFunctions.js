function getTicketList() {
    const tickets = document.querySelectorAll(".dxgvDataRow_Metropolis")
    const ticketIds = Array.from(tickets).map(ticket => ticket.querySelector("a").href.split("/Ticket/TicketPrincipal/")[1])
    return ticketIds
}

async function getSlaTicketList(listId, token) {
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

    return data.map(({ version, message, ...rest }) => rest)
}