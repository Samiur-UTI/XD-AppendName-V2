const { selection } = require("scenegraph")
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
        <form method="dialog" id="main">
            <div class="row break">
                <label class="row">
                    <span>↕︎</span>
                    <input type="text" uxp-quiet="true" id="Prename1" placeholder="Enter Prename" />
                </label>
            </div>
            <footer><button id="ok" type="submit" uxp-variant="cta">Apply</button></footer>
        </form>
        <div id="result">
            <p>Saved Prenames will be displayed here</p>
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
    let form = document.querySelector("form");
    let preName = String(document.querySelector("#Prename1").value);
    let results = document.querySelector("#result");
    function showPrenames(){
        let Html = `<button id="one" type="submit" uxp-variant="cta">${preName}</button>`;
        results.innerHTML = Html;
        let button = document.getElementById("one");
        button.addEventListener("click", () => console.log("Lalala!"))
        return results;
    }
    form.addEventListener("submit",showPrenames)

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