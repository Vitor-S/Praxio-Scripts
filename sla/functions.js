let toastTimeout = null

function invokeToast(message, icon = "warning", time = 3500, infinite = false, revoke = false) {
    const toast = document.querySelector("#toast")
    const toastIcon = document.querySelector("#toast-icon")
    const toastMessage = document.querySelector("#toast-message")

    // limpa timeout anterior
    if (toastTimeout) {
        clearTimeout(toastTimeout)
        toastTimeout = null
    }

    switch (icon) {
        case "check":
            toastIcon.style.color = "green"
            toastIcon.className = "fa fa-check"
            break

        case "error":
            toastIcon.style.color = "red"
            toastIcon.className = "fa fa-times"
            break

        case "loading":
            toastIcon.style.color = "black"
            toastIcon.className = "fa fa-spinner fa-spin"
            break

        default:
            toastIcon.style.color = "orange"
            toastIcon.className = "fa fa-exclamation-triangle"
    }

    toastMessage.innerText =
        message.charAt(0).toUpperCase() + message.slice(1)

    if (revoke) {
        toast.classList.remove("active-toast")
        return
    }

    toast.classList.add("active-toast")

    if (infinite) return

    toastTimeout = setTimeout(() => {
        toast.classList.remove("active-toast")
    }, time)
}

function formatMinutesToHHMM(totalMinutes) {
    if (totalMinutes == null || isNaN(totalMinutes)) return ""

    const hours = Math.floor(totalMinutes / 60)
    const minutes = Math.floor(totalMinutes % 60)

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`
}

function setShortcuts() {
    const empresas = []

    const editor = document.querySelector('#EditorTramite')

    // CTRL + ALT + C => transforma seleção em bloco de código
    window.addEventListener('keydown', (ev) => {

        if (ev.ctrlKey && ev.altKey && ev.code === 'KeyC') {

            const selection = window.getSelection()

            if (!selection.rangeCount) return

            const selectedText = selection.toString()

            if (!selectedText.trim()) return

            ev.preventDefault()

            const escaped = selectedText
                .replace(/&/g, '&amp;')
                .replace(/</g, '&lt;')
                .replace(/>/g, '&gt;')

            const codeBlock = `
                <div style="
                    background:#0f172a;
                    color:#e2e8f0;
                    padding:18px;
                    border-radius:12px;
                    font-family:Consolas, monospace;
                    font-size:13px;
                    line-height:1.7;
                    border:1px solid #1e293b;
                    white-space:pre-wrap;
                    overflow:auto;
                    margin:10px 0;
                ">
                ${escaped}
                </div>
            `

            const range = selection.getRangeAt(0)

            range.deleteContents()

            const wrapper = document.createElement('div')

            wrapper.innerHTML = codeBlock

            range.insertNode(wrapper.firstElementChild)

            selection.removeAllRanges()
        }
    })

    window.addEventListener('keydown', (ev) => {
        if (ev.ctrlKey && ev.altKey && (ev.code === 'Digit1' || ev.code === 'Numpad1')) {
            editor.innerHTML += `Em caso de necessidade, salientamos que este ticket pode ser reaberto em até 5 dias ou um novo ticket pode ser aberto a qualquer instante. <span style="color: green;">A sua satisfação é o nosso maior objetivo! Agradecemos se puder avaliar o nosso atendimento e também a solução dada para a sua demanda.</span>`;
        }
    });

    window.addEventListener('keydown', (ev) => {
        if (ev.ctrlKey && ev.altKey && (ev.code === 'Digit2' || ev.code === 'Numpad2')) {
            editor.innerHTML += `Olá prezado.O ticket está sendo escalado para o time de DESENVOLVIMENTO, que é especialista no assunto.Em breve a sua demanda será respondida.
`;
        }
    });

    window.addEventListener('keydown', (ev) => {
        if (ev.ctrlKey && ev.altKey && (ev.code === 'Digit3' || ev.code === 'Numpad3')) {
            const today = new Date()
            today.setDate(today.getDate() + 10);

            const dataFormatada = `${today.getDate()}/${String(today.getMonth() + 1).padStart(2, '0')}/${today.getFullYear()}`;

            editor.innerHTML += `Prezado cliente,
Solicitamos o envio do formulário devidamente preenchido até o dia <span style="color: #f83a22;">${dataFormatada}</span>, para que possamos dar continuidade à sua solicitação.<br><br>

Caso não recebamos o retorno até essa data, o atendimento será finalizado por ausência de manifestação.<br><br>

<strong>Informações Gerais (Preencha todos os campos com suas informações de contato para podermos entrar em contato se precisarmos de mais detalhes.)<br><br>

1 - Informe qual ou quais soluções serão afetadas com esta implementação. Marque um (X) em quais serão afetados:<br>
(  ) Lunas Vendas<br>
(  ) Luna Adm<br>
(  ) POS<br>
(  ) Mobile<br>
(  ) White Label<br>
(  ) Totem<br>
(  ) Painel de horários<br><br>

2- Indique a prioridade e urgência desta solicitação. (Indique a prioridade e a urgência da melhoria solicitada para podermos gerenciar nosso cronograma de desenvolvimento de acordo.)<br>
(   ) Baixa<br>
(   ) Alta<br>
(   ) Afeta produção<br><br>

Descrição das Melhorias Solicitadas (Descreva detalhadamente a melhoria que você está solicitando, incluindo o objetivo e o impacto esperado.)<br><br>

3 - Detalhamento da solicitação desejada (Descreva de forma clara a funcionalidade desejada)<br>
R:<br><br>

4 - Descreva o objetivo esperado desta solicitação.<br>
R:<br><br>

Referências e Documentação adicional (Anexe quaisquer documentos ou imagens que possam ajudar a entender melhor a solicitação.)<br>
5 - Anexar documentos ou imagens de referências daquilo que está sendo pedido<br>
R:<br><br>

6 - Adicionar link ou alguma referência online da função desejada.<br>
R:<br><br>

Área Exclusiva de preenchimento da Praxio - Atendimento<br>
7 - Análise preliminar da solicitação pedida.<br>
R:<br><br>

8 - Caminho da Alteração.<br>
R:<br>

Sobre LGPD<br><br>

9 - A implementação influenciará na LGPD?<br>
(    ) Sim<br>
(    ) Não<br><br>

10 - Os dados envolvidos já estão contidos no sistema?<br>
(    ) Sim<br>
(    ) Não<br><br>

Em caso de positivo, insira as informações abaixo:<br>
11 - Qual é a finalidade do uso de dados que será realizado pela implementação?<br>
R:<br><br>

12 - Haverá algum compartilhamento destes dados? Em caso positivo, lista com quem ocorrerá.<br>
R:</strong>`;
        }
    });

    window.addEventListener('keydown', (ev) => {
        if (ev.ctrlKey && ev.altKey && (ev.code === 'Digit4' || ev.code === 'Numpad4')) {
            const nome_empresa = document.querySelector("#sinalizadorCliente").textContent.split(" - ")[1].toUpperCase().trim()

            const empresa = empresas.find(emp => emp.banco == nome_empresa + '_VR')

            if (!empresa) {
                editor.innerHTML += `
                <ul>
                    <li style="font-weight: bold;">URL Cliente Luna: </li>
                    <li style="font-weight: bold;">Versão de Teste: </li>
                    <li style="font-weight: bold;">Caminho:</li>
                    <li style="font-weight: bold;">Período de Teste:</li>
                    <li style="font-weight: bold;">Base de Teste: </li>
                    <li style="font-weight: bold;">Servidor: </li>
                    <li style="font-weight: bold;">Usuário: </li>
                    <li style="font-weight: bold;">Senha: </li>
                    <li style="font-weight: bold;">Problema:</li><br>
                    <strong>Teste:</strong><br>
                    <li style="font-weight: bold;">
                        LGPD - A implementação influenciará na LGPD?
                    </li>

                    [ X ] Não.<br>
                    [ ] Sim.<br><br>
                    <strong>Os dados envolvidos já estão contidos no sistema?</strong><br>
                    [ ] Não.<br>
                    [ X ] Sim.<br><br>

                    Em caso positivo, insira as informações abaixo e marque o ticket com a tag #LGPD:<br><br>

                    1 - Qual é a finalidade do uso de dados que será feito pelo ajuste em nossos registros internos?<br>
                    2 - Há alguma obrigação legal respaldando o uso destes dados?<br>
                    3 - Há compartilhamento destes dados, e com quem?<br><br>
                </ul><strong>Atenção:</strong> Caso tenha dúvidas, não se esqueça de escalar o ticket para análise do time LGPD.
                `;

                // invokeToast("Empresa não encontrada. Preencha manualmente!", "warning", 4000, false, true)
                alert("Empresa não encontrada. Preencha manualmente!")
                return
            }

            editor.innerHTML += `
            <ul>
                <li style="font-weight: bold;">URL Cliente Luna: ${empresa.url ? `<a href="${empresa.url}" target="_blank">${empresa.url}</a>` : ''}</li>
                <li style="font-weight: bold;">Versão de Teste: </li>
                <li style="font-weight: bold;">Caminho:</li>
                <li style="font-weight: bold;">Período de Teste:</li>
                <li style="font-weight: bold;">Base de Teste: ${empresa.banco}</li>
                <li style="font-weight: bold;">Servidor: ${empresa.ip}</li>
                <li style="font-weight: bold;">Usuário: </li>
                <li style="font-weight: bold;">Senha: REMOVIDO</li>
                <li style="font-weight: bold;">Problema:</li><br>
                <strong>Teste:</strong><br>
                <li style="font-weight: bold;">
                    LGPD - A implementação influenciará na LGPD?
                </li>

                [ X ] Não.<br>
                [ ] Sim.<br><br>
                <strong>Os dados envolvidos já estão contidos no sistema?</strong><br>
                [ ] Não.<br>
                [ X ] Sim.<br><br>

                Em caso positivo, insira as informações abaixo e marque o ticket com a tag #LGPD:<br><br>

                1 - Qual é a finalidade do uso de dados que será feito pelo ajuste em nossos registros internos?<br>
                2 - Há alguma obrigação legal respaldando o uso destes dados?<br>
                3 - Há compartilhamento destes dados, e com quem?<br><br>
            </ul><strong>Atenção:</strong> Caso tenha dúvidas, não se esqueça de escalar o ticket para análise do time LGPD.
            `;
        }
    });
}
