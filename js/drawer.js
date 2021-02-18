class Drawer {
    static ALPHA = 'ABCDEFGHIJKLMNOQPRSTUVWXYZ';

    static unhide() {
        const titles = document.querySelectorAll('.boardtitle.hidden');
        for (let title of titles) {
            title.classList.remove('hidden');
        }
    }

    static draw() {
        // tables
        const container = document.querySelector('.tablescontainer');

        for (let i = 0; i < 2; i++) {
            const t = document.createElement('table');

            for (let j = 0; j <= BOARD_SIZE; j++) {
                const r = t.insertRow();

                for (let k = 0; k <= BOARD_SIZE; k++) {
                    const c = r.insertCell();

                    if (j === 0 && k !== 0) {
                        c.textContent = Drawer.ALPHA[k-1];
                    }

                    if (j !== 0 && k === 0) {
                        c.textContent = j;
                    }

                    if (j !== 0 && k !== 0) {
                        c.classList.add(`co${j-1}-${k-1}`, 'tileset', (i) ? 'shootboard' : 'boatsboard');

                        if (c.classList.contains('shootboard')) {
                            c.addEventListener(
                                'click',
                                () => {
                                    game.players[0].shoot(j-1, k-1);
                                },
                                {once: true}
                            );
                        }
                    }
                }
            }

            container.appendChild(t);
        }

        // boats
        const boats = game.players[0].boats;

        for (let boat of boats) {

            console.log(boat);
            
            for (let i in boat.fields) {

                const field = boat.fields[i];

                console.log(i, field);
                const td = document.querySelector(`.co${field.x}-${field.y}`);

                switch (i) {
                    case '0': // start field
                        td.classList.add(`boatstart${boat.direction}`);
                        break;
                    
                    case `${boat.fields.length-1}`: // end field
                        td.classList.add(`boatend${boat.direction}`);
                        break;

                    default: // fields between
                        td.classList.add(`boat${boat.direction}`);
                }
            }
        }
    }

    static delete() {
        const tablescontainer = document.querySelector('.tablescontainer');
        const boards = document.querySelectorAll('.tablescontainer table');

        for (let board of boards) {
            tablescontainer.removeChild(board);
        }
    }
}