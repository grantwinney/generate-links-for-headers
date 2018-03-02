# Generate Links for Headers (a Chrome extension)

I frequently want to share a link with someone, but I want to link to a specific section of the page. That means checking out the source code for the page, finding the header element or an anchor nearby, and (if it has an ID assigned to it) appending it to the URL before sharing it.

I figured I can do better than that.

## Let's automatically create links for all headers

Here's an extension for Chrome *([get it here](https://chrome.google.com/webstore/detail/generate-links-for-header/dckfkngmahjdokkkmconmfjdmicjcmgf)),* that scans the page and generates anchors for all headers on the page, *assuming they have an ID assigned.*

* Hover over the header, and the anchor link will appear.
* Click on the "chain" icon to copy the link to the clipboard.

**NOTE:** If there's no ID, then there's nothing to link *to,* and you won't see an anchor appear when hovering that header.

![](show-header-with-links.gif)

## Questions? Issues?

If you have any questions, comments, or issues, feel free to [create an issue](https://github.com/grantwinney/generate-links-for-headers-in-chrome/issues/new) and I'll check it out as my schedule permits.

Enjoy!

---

## History

- 1.0 - Initial
- 1.0.2 - Show border momentarily when clicking on icon, to indicate something has happened.
- 1.0.4 - Float icon to left of header instead of making it an inline block element. Previously, when the header was very long it consumed the -20px margin I had left for the icon, and the icon moved above the header. This fixes both issues.
- 1.0.5 - Exclude portion of W3C site that breaks, and doesn't really need this extension anyway (they provide similar behavior).
