javascript: (async () => {
    console.log("Running opi.riveria snek.js V0.1");
    console.log("Made by https://github.com/siponentheparas");

    /* Define constants */
    const CELL_GREEN = "progressBarCell completed";
    const CELL_GREY = "progressBarCell futureNotCompleted";
    const CELL_RED = "progressBarCell notCompleted";

    const CELL_AMOUNT = 143;
    const CELL_WIDTH = 13;
    const CELL_ROWS = CELL_AMOUNT / CELL_WIDTH;

    /* Variables */
    let snake_lenght = 1;
    let direction = "right";

    let snake_cells = [69];
    let apple_cells = [73];


    /* Utility functions */
    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    function is_apple_cell(cell) {
        if (apple_cells.includes(cell)) {
            return true;
        } else {
            return false;
        }
    }

    function remove_apple(cell) {
        const index = apple_cells.indexOf(cell);
        if (index > -1) {
            apple_cells.splice(index, 1);
        }
    }

    function is_snake_cell(cell) {
        if (snake_cells.includes(cell)) {
            return true;
        } else {
            return false;
        }
    }

    function get_row(cell) {
        return Math.floor(cell / CELL_WIDTH);
    }

    function move_right() {
        if (snake_cells[0] % 13 == 12) {
            snake_cells[0] -= 12;
        } else {
            snake_cells[0]++;
        }
    }

    function move_left() {
        if (snake_cells[0] % 13 == 0) {
            snake_cells[0] += 12;
        } else {
            snake_cells[0]--;
        }
    }

    function move_up() {
        if (get_row(snake_cells[0]) == 0) {
            snake_cells[0] = CELL_AMOUNT - (CELL_WIDTH - snake_cells[0]);
        } else {
            snake_cells[0] -= CELL_WIDTH;
        }
    }

    function move_down() {
        if (get_row(snake_cells[0]) == CELL_ROWS - 1) {
            snake_cells[0] = CELL_WIDTH - (CELL_AMOUNT - snake_cells[0]);
        } else {
            snake_cells[0] += CELL_WIDTH;
        }
    }

    /* Starts here */
    let brc_selector = document.querySelector("div[class=barRowCells]");
    brc_selector.style.setProperty('flex-basis', `calc(100% / ${CELL_WIDTH})`);
    let cells = brc_selector.getElementsByTagName('*');

    for (i = 0; i < cells.length; i++) {
        cells[i].className = CELL_GREEN;
    }

    async function add_cells() {
        for (i = 0; i < CELL_AMOUNT - cells.length; i++) {
            await delay(10);
            let cloned_div = cells[0].cloneNode(true);
            brc_selector.appendChild(cloned_div);
        }
    }

    /* This is horrible and I don't like it. But there's no other way to do this. */
    async function wait_add_cells() {
        while (cells.length != CELL_AMOUNT) {
            await add_cells();
        }
    }

    async function setup_cells() {
        for (i = 0; i < cells.length; i++) {
            await delay(10);
            if (i == 69) {
                cells[i].className = CELL_GREEN;
            } else if (i == 73) {
                cells[i].className = CELL_RED;
            } else {
                cells[i].className = CELL_GREY;
            }
        }
    }

    await wait_add_cells();
    await setup_cells();

    document.addEventListener('keydown', function (event) {
        if (event.key === 'w') {
            direction = 'up';
        } else if (event.key === 's') {
            direction = 'down';
        } else if (event.key === 'a') {
            direction = 'left';
        } else if (event.key === 'd') {
            direction = 'right';
        }
    });

    /* Game loop */
    while (true) {
        if (direction == "right") {
            move_right();
        } else if (direction == "left") {
            move_left();
        } else if (direction == "up") {
            move_up();
        } else if (direction == "down") {
            move_down();
        }


        for (i = 0; i < cells.length; i++) {
            if (is_snake_cell(i)) {
                cells[i].className = CELL_GREEN;
            } else if (is_apple_cell(i)) {
                cells[i].className = CELL_RED;
            } else {
                cells[i].className = CELL_GREY;
            }

            if (is_apple_cell(i) && is_snake_cell(i)) {
                remove_apple(i);
                snake_lenght++;
            }
        }

        await delay(500);
    }
})()