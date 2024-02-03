function manageResize(md, sizeProp, posProp) {
    var r = md.target;

    var prev = r.previousElementSibling;
    //todo: ricercare il primo elemento precedente di tipo flex-item
    while (
        prev.nodeType !== 1 ||
        (prev.tagName !== "FLEX-ITEM" && prev.tagName !== "FLEX")
    ) {
        prev = prev.previousElementSibling;
    }
    var next = r.nextElementSibling;
    //todo: ricercare il primo elemento successivo di tipo flex-item
    while (
        next.nodeType !== 1 ||
        (next.tagName !== "FLEX-ITEM" && next.tagName !== "FLEX")
    ) {
        next = next.nextElementSibling;
    }

    if (!prev || !next) {
        return;
    }

    md.preventDefault();

    var prevSize = prev[sizeProp];
    var nextSize = next[sizeProp];
    var sumSize = prevSize + nextSize;
    var prevGrow = Number(prev.style.flexGrow);
    var nextGrow = Number(next.style.flexGrow);
    var sumGrow = prevGrow + nextGrow;
    var lastPos = md[posProp];

    function onMouseMove(mm) {
        var pos = mm[posProp];
        var d = pos - lastPos;
        prevSize += d;
        nextSize -= d;
        if (prevSize < 0) {
            nextSize += prevSize;
            pos -= prevSize;
            prevSize = 0;
        }
        if (nextSize < 0) {
            prevSize += nextSize;
            pos += nextSize;
            nextSize = 0;
        }

        var prevGrowNew = sumGrow * (prevSize / sumSize);
        var nextGrowNew = sumGrow * (nextSize / sumSize);

        prev.style.flexGrow = prevGrowNew;
        next.style.flexGrow = nextGrowNew;

        lastPos = pos;
    }

    function onMouseUp(mu) {
        // Change cursor to signal a state's change: stop resizing.
        const html = document.querySelector("html");
        html.style.cursor = "default";

        if (posProp === "pageX") {
            r.style.cursor = "ew-resize";
        } else {
            r.style.cursor = "ns-resize";
        }

        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
    }

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseup", onMouseUp);
}
// Define a callback function for the event listener.
function handleMaxWidth(mql) {
    // …
    let flexTop = document.getElementsByClassName("top")[0];
    let allResizer = flexTop.querySelectorAll(":scope > flex-resizer");
    //
    if (mql.matches) {
        /* the viewport is 600 pixels wide or less */
        flexTop.className = "top v";
        allResizer.forEach((item) => (item.style.cursor = "ns-resize"));
    } else {
        /* the viewport is more than 600 pixels wide */
        flexTop.className = "top h";
        allResizer.forEach((item) => (item.style.cursor = "ew-resize"));
    }
    //console.log(flexTop.className);
}
function setupResizerEvents() {
    document.body.addEventListener("mousedown", function (md) {
        // Used to avoid cursor's flickering
        const html = document.querySelector("html");

        var target = md.target;
        if (target.nodeType !== 1 || target.tagName !== "FLEX-RESIZER") {
            return;
        }
        var parent = target.parentNode;
        var h = parent.classList.contains("h");
        var v = parent.classList.contains("v");
        if (h && v) {
            return;
        } else if (h) {
            // Change cursor to signal a state's change: begin resizing on H.
            target.style.cursor = "col-resize";
            html.style.cursor = "col-resize"; // avoid cursor's flickering

            // use offsetWidth versus scrollWidth to avoid splitter's jump on resize when content overflow.
            manageResize(md, "offsetWidth", "pageX");
        } else if (v) {
            // Change cursor to signal a state's change: begin resizing on V.
            target.style.cursor = "row-resize";
            html.style.cursor = "row-resize"; // avoid cursor's flickering

            manageResize(md, "offsetHeight", "pageY");
        }
    });

    var mediaQueryList = window.matchMedia("(max-width: 600px)");

    // Run the orientation change handler once.
    handleMaxWidth(mediaQueryList);

    // Add the callback function as a listener to the query list.
    mediaQueryList.addEventListener("change", handleMaxWidth);
}
