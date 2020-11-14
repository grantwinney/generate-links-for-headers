// Copies the link to the clipboard and displays a small colored box so you know something happened
let copyFunc = function copyHeaderLinkToClipboard(_event, text) {
    if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        let textarea = document.createElement("textarea");
        textarea.textContent = text;
        document.body.appendChild(textarea);
        textarea.select();
        try {
            document.execCommand("copy");
        } catch (ex) {
            console.warn(`Copy to clipboard failed for: ${text}`, ex);
        } finally {
            document.body.removeChild(textarea);
        }
    }
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
            if (id) {
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

// Select all anchors with a valid ID value
let headers = document.querySelectorAll('h1, h2, h3, h4, h5, h6');

// Inject the 'copy link' function into the current page, if there are any headers
if (headers.length > 0) {
    let script = document.createElement('script');
    script.textContent = copyFunc;
    (document.head || document.documentElement).appendChild(script);
}

// Iterate through the headers, adding a link to the left of each one
let counter = 0;
headers.forEach(function(header) {
    let id = getFirstId(header) || getParentId(header);
    if (id) {
        let anchorUrl = `${location.protocol}//${location.host}${location.pathname}${location.search}#${id}`;
        let genlinkid = `genlink_${counter++}`;
        header.innerHTML = `<div class="glfh_headerContainer">${header.innerHTML}<div class="glfh_linkContainer"><a id="${genlinkid}" href="${anchorUrl}" title="Copy link to clipboard"><i class="fa fa-link"></i></a></div></div>`;
        document.getElementById(genlinkid)
            .addEventListener("click", function(evt) {
                copyFunc(evt, anchorUrl)
            });
    }
});
