// Loop recursively through the header and its child elements, in search of an ID to link to
// Return the ID if found, otherwise undefined
function getFirstId(element) {
    if (element.hasAttribute('id')) {
        return element.getAttribute('id');
    } else if (element.hasAttribute('name')) {
        return element.getAttribute('name');
    } else if (element.hasChildNodes()) {
        for (let i = 0; i < element.children.length; i++) {
            let id = getFirstId(element.children[i]);
            if (id) {
                return id;
            }
        }
    }
    return undefined;
}

// Check the element's immediate parent, in search of an appropriate ID to link to
// Return the ID if found, otherwise undefined
function getParentId(element) {
    let pNode = element.parentNode;
    if (pNode !== undefined && (pNode.tagName === 'A' || pNode.tagName === 'DIV')) {
        if (pNode.hasAttribute('id')) {
            return pNode.getAttribute('id');
        } else if (pNode.hasAttribute('name')) {
            return pNode.getAttribute('name');
        }
    }
    return undefined;
}

let alreadyRun = false;
document.addEventListener('readystatechange', event => {
    if (event.target.readyState === 'complete' && !alreadyRun) {
        alreadyRun = true;
        document.querySelectorAll('h1, h2, h3, h4, h5, h6')
                .forEach(function(header) {
                    let id = getFirstId(header) || getParentId(header);
                    if (id) {
                        let anchorUrl = `${location.protocol}//${location.host}${location.pathname}${location.search}#${id}`;

                        let copyLink = document.createElement('a');
                        copyLink.href = anchorUrl;
                        copyLink.title = 'Copy link to clipboard';
                        copyLink.textContent = String.fromCodePoint(128279);
                        copyLink.addEventListener('click', function() {
                            navigator.clipboard.writeText(anchorUrl)
                        })

                        let innerDiv = document.createElement('div');
                        innerDiv.className = 'glfh_linkContainer';
                        innerDiv.appendChild(copyLink);

                        header.appendChild(innerDiv);
                        header.classList.add('glfh_headerContainer');
                    }
                });
        }
  }, false);
