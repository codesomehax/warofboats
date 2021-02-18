const starterButton = document.querySelector('.starter');
let game;



starterButton.addEventListener('click', () => {
    game = new Game();
    Drawer.delete();
    Drawer.draw();
})