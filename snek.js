javascript: (async () => {

    function delay(duration) {
        return new Promise(resolve => setTimeout(resolve, duration));
    }

    let brc_selector = document.querySelector("div[class=barRowCells]");
    let brc_elements = brc_selector.getElementsByTagName('*');

    for (i = 0; i < brc_elements.length; i++) {
        brc_elements[i].className = "progressBarCell completed";
    }

    async function add_cells() {
        for (i = 0; i < 156 - brc_elements.length; i++) {
            await delay(10);
            let cloned_div = brc_elements[0].cloneNode(true);
            brc_selector.appendChild(cloned_div);
        }
    }

    /* This is horrible and I don't like it. But there's not any other way to do this */
    async function add_add_cells() {
        while (brc_elements.length != 156) {
            await add_cells();
        }
    }

    async function setup_cells() {
        for (i = 0; i < brc_elements.length; i++) {
            await delay(10);
            brc_elements[i].className = "progressBarCell futureNotCompleted";
        }
    }

    await add_add_cells();
    await setup_cells();
})()