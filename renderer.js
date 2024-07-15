const editor = CodeMirror(document.getElementById("editor"), {
    mode: "javascript",
    theme: "dracula",
    lineNumbers: true,
    autofocus: true
});

editor.setValue("// Write your JavaScript code here\nconsole.log('Hello, world!');");

const runButton = document.getElementById("run-button");
const outputDiv = document.getElementById("output");

function displayOutput(text, isError = false) {
    const p = document.createElement("p");
    p.textContent = text;
    if (isError) {
        p.style.color = "red";
    }
    outputDiv.appendChild(p);
}

runButton.addEventListener("click", async () => {
    outputDiv.innerHTML = "";
    const code = editor.getValue();

    try {
        const result = await window.electronAPI.runCode(code);        
        if (result.success) {
            if (result.logs && result.logs.length > 0) {
                result.logs.forEach(log => {
                    displayOutput(log.content, log.type === 'error');
                });
            } else {
                displayOutput("The execution produced no visible output. If you used console.log, the operation may be asynchronous.");
            }
        } else {
            displayOutput(result.error, true);
        }
    } catch (error) {
        displayOutput(`Error: ${error.message}`, true);
    }
});

window.addEventListener("resize", () => {
    editor.setSize(null, "100%");
});