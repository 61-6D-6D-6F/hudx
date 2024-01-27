# ![icon](https://github.com/61-6D-6D-6F/hudx/assets/30551234/5e52f922-1e3c-47eb-b351-9b108b91dc3d) hudx - inspired by [hmtx](https://htmx.org)

Control multiple ajax calls and style changes via html attributes in a cli like manner.

hudx is heavily inspired by [htmx](https://htmx.org) and relies on the power of hypermedia. Htmx is awesome!!!

This small (200loc) package was created to add complex behaviour to a small widget for an existing website, which I was not able to achive easily with htmx.

Be warned: this is a toy project, not optimized for heavy interactions.

# cdn:
```html
<script src="https://unpkg.com/hudx@0.0.1"></script>

<div hudx hdx="click GET /some-html-response this outerHTML">
  replace me
</div>
```

# npm:
```
npm install hudx --save
```
then
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

[Example source code](https://github.com/61-6D-6D-6F/hudx-example-server)

[Live example](https://hudx-examples.up.railway.app/) content:

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

