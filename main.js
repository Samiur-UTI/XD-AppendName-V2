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
        <div id="click">
            <button id="ok" type="submit" uxp-variant="cta">Get Prenames!</button>
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
    let button = document.querySelector("button");
    // let form = document.querySelector("form");
    // let preName = String(document.querySelector("#Prename1").value);
    
    // let results = document.querySelector("#result");
    //     function showPrenames(){
    //         let Html = `<button id="one" type="submit" uxp-variant="cta">${preName}</button>`;
    //         results.innerHTML = Html;
    //         let button = document.getElementById("one");
    //         button.addEventListener("click", () => console.log("Lalala!"))
    //         return results;
    //     }
        function getPrenameData(){
            return new Promise((resolve, reject) => {
                let req = new XMLHttpRequest();
                req.onload = () => {
                    if (req.status === 200) {
                        try {
                            const arr = JSON.parse(req.response);
                            resolve(arr);
                            data = arr;
                            sendPrenameData();
                            //console.log(arr)
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
                //console.log(data);
            });
        }
        function sendPrenameData(){
            console.log("SamaVuda");
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
