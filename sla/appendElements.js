function test() {
    alert("test 2")
}

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
        background-color: rgba(255, 255, 255, 0.8);
        display: none;
        align-items: center;
        justify-content: center;
    `
    loadingScreen.innerHTML = `
        <i class="fa fa-spinner fa-spin" style="
            font-size: 25px;
            color: #333;
            animation: fa-spin 0.6s infinite linear;
        "></i>
    `
    document.body.appendChild(loadingScreen)
}

function createToast(){
    const toast = document.createElement('div')
    toast.id = 'toast'

    toast.style = `
        min-width: 300px;
        min-height: 50px;
        background-color: #f79b31;
        position: absolute;
        left: 50%;
        top: 80px;
        border-radius: 5px;
        color: #FFF;
        display: flex;
        opacity: 1;
        align-items: center;
        justify-content: start;
        padding: 10px 15px;
        font-size: 1.7rem;
        transition: .3s ease-in-out;
    `

    toast.innerText = 'Teste'
}

function createElements(){
    createLoadingScreen()
    createToast()
}