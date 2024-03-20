javascript: (() => {
    let brc_selector = document.querySelector("div[class=barRowCells]");
    let brc_elements = brc_selector.getElementsByTagName('*');
    for (i = 0; i < brc_elements.length; i++) {
        brc_elements[i].className = "progressBarCell completed";
    }

    for (i = 0; i < 156 - brc_elements.length; i++) {
        setTimeout(function() {
            let cloned_div = brc_elements[0].cloneNode(true);
            brc_selector.appendChild(cloned_div);
        }, i * 10);
    }
})()