javascript: (async () => {
    console.log("Running opi.riveria snek.js V1.0");
    console.log("Made by https://github.com/siponentheparas");

    /* Define constants */
    const CELL_RED = "progressBarCell notCompleted";
    const CELL_GREEN = "progressBarCell completed";
    const CELL_BLUE = "progressBarCell futureNotCompleted";
    const CELL_YELLOW = "progressBarCell submittedNotComplete";

    const CELL_AMOUNT = 143;
    const CELL_WIDTH = 13;
    const CELL_ROWS = CELL_AMOUNT / CELL_WIDTH;

    /* Variables */
    let direction = "right";

    let snake_cells = [69];
    let apple_cells = [73];

    let dead = false;

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
                cells[i].className = CELL_BLUE;
            }
        }
    }

    await wait_add_cells();
    await setup_cells();

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

    function eat_apple(cell) {
        const index = apple_cells.indexOf(cell);
        if (index > -1) {
            apple_cells.splice(index, 1);
        }

        snake_cells.push(snake_cells[snake_cells.length - 1]);

        /* Create new apple */
        while (true) {
            let random_cell = Math.floor(Math.random() * CELL_AMOUNT);

            if (!is_snake_cell(random_cell) && !is_apple_cell(random_cell)) {
                apple_cells.push(random_cell);
                break;
            }
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

    function update_tail(prev_head_pos) {
        if (snake_cells.length < 1) return;

        let last_pos = prev_head_pos;
        for (i = 1; i < snake_cells.length; i++) {
            let last_pos_this_iter = snake_cells[i];
            snake_cells[i] = last_pos;
            last_pos = last_pos_this_iter;
        }
    }

    async function die() {
        for (i = 0; i < snake_cells.length; i++) {
            await delay(100);
            cells[snake_cells[i]].className = CELL_YELLOW;
        }
        cells[snake_cells[snake_cells.length - 1]].className = CELL_YELLOW;
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

    document.addEventListener('keydown', function (event) {
        if (event.key === 'w' && direction != "down") {
            direction = 'up';
        } else if (event.key === 's' && direction != "up") {
            direction = 'down';
        } else if (event.key === 'a' && direction != "right") {
            direction = 'left';
        } else if (event.key === 'd' && direction != "left") {
            direction = 'right';
        }
    });

    /* Game loop */
    while (true) {
        if (dead) {
            await die();
            break;
            
        };

        let prev_head_pos = snake_cells[0];

        if (direction == "right") {
            move_right();
        } else if (direction == "left") {
            move_left();
        } else if (direction == "up") {
            move_up();
        } else if (direction == "down") {
            move_down();
        }

        update_tail(prev_head_pos);

        for (i = 0; i < cells.length; i++) {
            if (is_snake_cell(i)) {
                cells[i].className = CELL_GREEN;
            } else if (is_apple_cell(i)) {
                cells[i].className = CELL_RED;
            } else {
                cells[i].className = CELL_BLUE;
            }

            if (is_apple_cell(i) && is_snake_cell(i)) {
                eat_apple(i);
            }

            let snake_cells_copy = [...snake_cells];
            snake_cells_copy.shift();
            if (snake_cells.length > 2 && snake_cells_copy.includes(snake_cells[0])) {
                dead = true;
            }
        }

        await delay(400);
    }
})()
