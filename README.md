# hudx - inspired by [hmtx](https://htmx.org)

Control multiple ajax calls and style changes via html attributes in a cli like manner.

hudx is heavily inspired by [htmx](https://htmx.org) and relies on the power of hypermedia. Htmx is awesome!!!

This small (200loc) package was created to add complex behaviour to a small widget for an existing website, which I was not able to achive easily with htmx.

Be warned: this is a toy project, not optimized for heavy interactions.

# Install:

```
npm install hudx --save
```

# Basic usage:
```html
<div hudx hdx="click GET /some-html-response this outerHTML">
  replace me
</div>
```
```js
import { hudxInit } from "hudx";

hudxInit();
```
or
```js
import { hudx } from "hudx";

const element = document.createElement("div");
element.setAttribute("hudx", "");
element.setAttribute("hdx", "click GET /some-html-response this outerHTML");

hudx(element);
```

# Examples:

[Examples page](https://hudx-examples.up.railway.app/) content:

Insert response from the server
- Insert single element
- Insert multiple elements

Delete elements from the page
- Delete elements

Send data to the server and insert the response
- Send single form
- Send multiple forms

Style callbacks for request/response

- Style elements on request initiated
- Style elements on success received
- Style elements on error received
- Style elements on connection error

Style elements on DOM events
- Style elements
  
More examples
- Lazy loading image
- Edit customer data
- Modal example

