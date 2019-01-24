// Copies the link to the clipboard and displays a small colored box so you know something happened
let copyFunc = function copyHeaderLinkToClipboard(event, text) {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
    let textarea = document.createElement("textarea");
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        let svgElement = (event.target.tagName === "A") ? event.target.childNodes[0] : event.target;
        try {
            document.execCommand("copy");
            svgElement.style.border = "1px solid rgba(0,200,0,1)";
            return true;
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            setTimeout(function() { svgElement.style.border = "1px solid rgba(255,0,0,0)"; }, 750);
            document.body.removeChild(textarea);
        }
    }
    return false;
};

// Loop recursively through the header and all its child elements, in search of an ID to link to
// Return the ID if found; otherwise return undefined
function getFirstId(element) {
    if (element.hasAttribute("id")) {
        return element.getAttribute("id");
    } else if (element.hasAttribute("name")) {
        return element.getAttribute("name");
    } else if (element.hasChildNodes()) {      
        for (let i = 0; i < element.children.length; i++) {
            let id = getFirstId(element.children[i]);
            if (id !== undefined) {
                return id;
            }
        }
        return undefined;
    } else {
        return undefined;
    }
}

// Check the element's immediate parent, in search of an appropriate ID to link to
// Return the ID if found; otherwise return undefined
function getParentId(element) {
    let pNode = element.parentNode;
    if (pNode !== undefined && (pNode.tagName === 'A' || pNode.tagName === 'DIV')) {
        if (pNode.hasAttribute("id")) {
            return pNode.getAttribute("id");
        } else if (pNode.hasAttribute("name")) {
            return pNode.getAttribute("name");
        } else {
            return undefined;
        }
    } else {
        return undefined;
    }
}

// The 'chain' SVG element
let chainsvg = "M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 " +
               "4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 " +
               "1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z";

// Rebuild the URL, omitting any existing headers
let baseUrl = location.protocol + '//' + location.host + location.pathname + location.search + '#';

// Select all anchors with a valid ID value
let headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// Inject the 'copy link' function into the current page, if there are any headers
if (headers.length > 0) {
    let script = document.createElement('script');
    script.textContent = copyFunc;
    (document.head||document.documentElement).appendChild(script);
}

// Iterate through the headers, adding a link to the left of each one
let counter = 0;
headers.forEach(function(header) {
    let id = getFirstId(header);
    if (id === undefined) {
        id = getParentId(header);
    }
    if (id !== undefined) {
        let genlinkid='genlink_' + counter++;
        header.innerHTML = '<div class="glfh_headerContainer"><div class="glfh_linkContainer"><a id="' + genlinkid + '" href="javascript:;" title="Copy link to clipboard"><svg height="16" viewBox="0 0 16 16" width="16"><path fill-rule="evenodd" d="' + chainsvg + '"></path></svg></a></div>' + header.innerHTML + '</div>';
        document.getElementById(genlinkid).addEventListener("click", function(evt) { copyFunc(evt, baseUrl + id) });
    }
});
