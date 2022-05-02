const textearea = document.querySelector ('textarea');
const betaX = document.getElementById ('x')
const betaY = document.getElementById ('y')

textarea.addEventListener ('change',(event) => {
    console.dir (event)
})

betaX.addEventListener ('click',(event) => {
    textarea.selectionStart = 4;
    textarea/selectionEnd   = 4;
    textarea.focus ();
})

betaY.addEventListener ('click', (event) => {
    textarea.selectionStart = 22 + textarea.selectionStart
    textarea.focus ()
})

document.addEventListener ('keydown',(e) => {
if(!e.repeat){
    console.log(e)
}

})
document.addEventListener ('keyup',(e) => {
if (!e.repeat){
    console.log (e)
}
})
