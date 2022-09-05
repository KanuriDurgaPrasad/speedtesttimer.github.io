let quoteDisplay = document.getElementById('quoteDisplay');
let timer = document.getElementById('timer');
let submitBtn = document.getElementById('submitBtn');
let resetBtn = document.getElementById('resetBtn');
let quoteInput = document.getElementById('quoteInput');
let result = document.getElementById('result');

let counter;
let timerId;

function resetFunc(){
    counter = 0;
    getHttpRequest();

};

function loop() {
    let spinner = document.getElementById('spinner');
    let input = "";
    let quote = "";

    counter = 0;
    timerId = setInterval(function() {
        timer.textContent = counter + " seconds";
        counter = counter + 1;

    }, 1000);

    function getHttpRequest() {
        let url = "https://apis.ccbp.in/random-quote";
        let options = {
            method: "GET"
        };

        spinner.classList.remove('d-none');
        quoteDisplay.classList.add('d-none');

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(jsonData) {
                spinner.classList.add('d-none');
                quoteDisplay.classList.remove('d-none');
                quote = jsonData.content;
                quoteDisplay.textContent = jsonData.content;
            });
    }

    quoteInput.addEventListener('change', function(event) {
        quoteInput.value = event.target.value;
        input = quoteInput.value;
    });

    getHttpRequest();
    submitBtn.addEventListener('click', function() {
        if (input === quote) {
            result.textContent = "You typed in " + (counter - 1) + " seconds";
            clearInterval(timerId);
        } else {
            result.textContent = "You typed incorrect sentence";
        }
    });
}

loop();
resetBtn.addEventListener('click', function() {
    resetFunc();
    quoteInput.value = "";
    result.textContent = "";
});