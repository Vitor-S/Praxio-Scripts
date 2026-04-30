// function test() {
//     alert("test 2")
// }

// function createLoadingScreen() {
//     const loadingScreen = document.createElement("div")
//     loadingScreen.id = "loadingScreen"
//     loadingScreen.style = `
//         position: fixed;
//         width: 100%;
//         height: 100%;
//         z-index: 9999;
//         top: 0;
//         left: 0;
//         background-color: rgba(255, 255, 255, 0.8);
//         display: none;
//         align-items: center;
//         justify-content: center;
//     `
//     loadingScreen.innerHTML = `
//         <i class="fa fa-spinner fa-spin" style="
//             font-size: 25px;
//             color: #333;
//             animation: fa-spin 0.6s infinite linear;
//         "></i>
//     `
//     document.body.appendChild(loadingScreen)
// }

// function createToast(){
//     const toastContainer = document.createElement('div')
//     toastContainer.id = 'toast'

//     toastContainer.style.cssText = `
//         position: fixed;
//         min-width: 300px;
//         min-height: 45px;
//         background-color: #FFF;
//         left: 50%;
//         top: -80px;
//         border-radius: 3px;
//         overflow: hidden;
//         display: flex;
//         gap: 10px;
//         opacity: 0;
//         align-items: center;
//         padding: 10px 15px;
//         font-size: 1.5rem;
//         transition: .3s ease-in-out;
//         z-index: 10000;
//         box-shadow: 0px 0px 10px -3px rgba(0,0,0,0.48);
//         color: #000;
//         transform: translateX(-50%);
//     `

//     console.log("1");

//     // ICON
//     const toastIcon = document.createElement('i')
//     toastIcon.id = "toast-icon"
//     toastIcon.className = 'fa fa-exclamation-triangle'
//     toastIcon.style.color = 'orange'

//     // MESSAGE
//     const toastMessage = document.createElement('span')
//     toastMessage.id = "toast-message"
//     toastMessage.innerText = 'Teste'

//     // monta corretamente (sem sobrescrever depois)
//     toastContainer.appendChild(toastIcon)
//     toastContainer.appendChild(toastMessage)

//     document.body.appendChild(toastContainer)
// }

// function createElements(){
//     // createLoadingScreen()
//     // createToast()
// }
