(function() {
    if (typeof module === 'object' && module.exports) {
        module.exports = { hudxInit: init, hudx: hudx };
    } else {
        document.hudx = init();
    }

    function init() {
        if (document.readyState !== "loading") {
            hudx(document.body);
        } else {
            document.addEventListener("DOMContentLoaded", function() {
                hudx(document.body);
            });
        }
    }

    function hudx(root) {
        if (root.children.length === 0) {
            addListeners(root);
            return;
        }

        for (const element of root.querySelectorAll("[hudx]")) {
            addListeners(element);
        }
    }

    function addListeners(element) {
        let events = {};
        for (const attr of element.attributes) {
            const command = attr.value.trim().split(" ");
            if (attr.name.startsWith("hdx") || attr.name.startsWith("hdsx")) {
                if (events[command[0]] === undefined) {
                    events[command[0]] = {};
                    events[command[0]].hdx = {};
                    events[command[0]].hdsx = {};
                }

                if (attr.name.startsWith("hdx")) {
                    events[command[0]].hdx[attr.name] = command;
                } else if (attr.name.startsWith("hdsx")) {
                    events[command[0]].hdsx[attr.name] = command;
                }
            }
        }

        for (const [domEvent, hudxType] of Object.entries(events)) {
            element.addEventListener(domEvent, function(event) {
                for (const [hudxEventType, hudxAttr] of Object.entries(hudxType)) {
                    for (const [hudxEvent, command] of Object.entries(hudxAttr)) {
                        switch (hudxEventType) {
                            case "hdx":
                                if (command[3] === "this") {
                                    command[3] = element;
                                } else if (typeof command[3] === "string") {
                                    command[3] = document.querySelector(command[3]);
                                }

                                sendRequest(command, element, hudxEvent.substring(3));
                                updateStyle("hds-r", element, hudxEvent.substring(3));
                                break;
                            case "hdsx":
                                changeStyle(command[1], command[2], command.slice(3));
                                break;
                        }
                    }
                }

                event.stopPropagation();
            });
        }
    }

    function sendRequest(command, element, prefix) {
        let req = new XMLHttpRequest();

        req.open(command[1], command[2]);

        req.onload = function() {
            if (200 <= req.status && req.status < 400) {
                if (req.status == 204) {
                    return;
                }

                updateHtml(command[3], command[4], req.response);
                updateStyle("hds-s", element, prefix);
            }
            else {
                updateStyle("hds-er", element, prefix);
            }
        };

        req.onerror = function() {
            updateStyle("hds-ec", element, prefix);
        };

        req.send(setParams(command, req));
    }

    function updateStyle(type, element, prefix) {
        for (const attr of element.attributes) {
            if (attr.name.startsWith(type + prefix)) {
                const command = attr.value.trim().split(" ");

                changeStyle(command[0], command[1], command.slice(2));
            }
        }
    }

    function changeStyle(selector, type, classList) {
        const elements = document.querySelectorAll(selector);

        for (const className of classList) {
            for (const element of elements) {
                switch (type) {
                    case "add":
                        element.classList.add(className);
                        break;
                    case "remove":
                        element.classList.remove(className);
                        break;
                    case "toggle":
                        element.classList.toggle(className);
                        break;
                }
            }
        }
    }

    function updateHtml(target, position, res) {
        const resHTML = new DOMParser().parseFromString(res, "text/html").body.firstElementChild;

        switch (position) {
            case "innerHTML":
                target.innerHTML = res;

                if (target.firstElementChild !== null) {
                    hudx(target.firstElementChild);
                }
                break;
            case "outerHTML":
                if (resHTML !== null) {
                    const outer = target.insertAdjacentElement("beforebegin", resHTML);

                    if (outer !== null) {
                        outer.nextElementSibling.remove();
                        hudx(outer);
                    }
                } else {
                    target.remove();
                }
                break;
            case "beforebegin":
            case "afterbegin":
            case "beforeend":
            case "afterend":
                if (resHTML !== null) {
                    const inserted = target.insertAdjacentElement(position, resHTML);

                    if (inserted !== null) {
                        hudx(inserted);
                    }
                }
                break;
        }
    }

    function setParams(command, req) {
        if (command[1] !== "GET") {
            let params = "";

            req.setRequestHeader("Content-type", "application/x-www-form-urlencoded");

            for (const formId of command.slice(5)) {
                const inputs = document.querySelectorAll(formId + " input");
                for (const input of inputs) {
                    params += input.name + "=" + input.value + "&";
                }
            }

            return params.slice(0, -1);
        }
    }
})();
