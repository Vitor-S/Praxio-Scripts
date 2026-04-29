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
        display: flex;
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
