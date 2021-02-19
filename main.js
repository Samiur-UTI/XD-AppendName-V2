const { selection } = require("scenegraph");
let panel;

function create() {
    const HTML =
        `<style>
            .break {
                flex-wrap: wrap;
            }
            label.row > span {
                color: #8E8E8E;
                width: 20px;
                text-align: right;
                font-size: 9px;
            }
            label.row input {
                flex: 1 1 auto;
            }
            .show {
                display: block;
            }
            .hide {
                display: none;
            }
        </style>
        <div class="container">
            <button id="ok" type="submit" uxp-variant="cta">Get Prenames!</button>
        </div>
        <div id="display">
            <li>The prenames will be displayed below:</li>
        </div>
        `
    panel = document.createElement("div");
    panel.innerHTML = HTML;

    return panel;
}

function show(event) {
    if (!panel) event.node.appendChild(create());
}
function addPrenames (){
    let data;
    let button = document.querySelector("#ok");
    let display = document.getElementById("display");
        function getPrenameData(){
            return new Promise((resolve, reject) => {
                let req = new XMLHttpRequest();
                req.onload = () => {
                    if (req.status === 200) {
                        try {
                            const arr = JSON.parse(req.response);
                            resolve(arr);
                            data = arr;
                            showPrenameData(data);
                        } catch (err) {
                            reject('Couldnt parse response. ${err.message}, ${req.response}');
                        }
                    } else {
                        reject('Request had an error: ${req.status}');
                    }
                }
                req.onerror = reject;
                req.onabort = reject;
                req.open("GET", "http://localhost:5000/prename", true);
                req.send();
            });
        }
        const showPrenameData = data => {
            const {prenames} = data;
            prenames.forEach(element => {
                let text = element.prename;
                let Html = `<li><button class="pain" type="submit" uxp-variant="cta">${text}</button></li>`;
                display.insertAdjacentHTML("afterend",Html);
                let buttonElement = document.querySelector(".pain");
                buttonElement.addEventListener("click", () => appendName(text));
            });
        }
        const appendName = data => {
            const { editDocument } = require("application");
            editDocument({ editLabel: "Append Name for Item1" },  function workerFunction(selection){
                if(selection.items.length !== 0 && selection.items.length === 1){
                    selection.itemsIncludingLocked.forEach( node => {
                        let previousName = node.name;
                        node.name = data + " " + previousName;
                    })
                }
            })
        }
    button.addEventListener("click", getPrenameData);
}
function update(){
    addPrenames();
}
module.exports = {
    panels: {
        Append: {
            show,
            update
        }
    }
};
