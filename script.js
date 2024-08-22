document.getElementById("submit").onclick = function (event) {
    const input = document.getElementById("input").value;
    if (!input) {
        alert("Please enter a profile name.");
        event.preventDefault();
    }
};
