document.addEventListener("DOMContentLoaded", function () {
    let apiKey = '804c13e1e41c88d2452bc0ab';
    let api = `https://v6.exchangerate-api.com/v6/804c13e1e41c88d2452bc0ab/latest/USD`;

    const fromDropDown = document.getElementById("from-currency-select");
    const toDropDown = document.getElementById("to-currency-select");
    const amountInput = document.getElementById("valor");
    const convertButton = document.getElementById("convert-button");
    const result = document.getElementById("results");

    currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.text = currency;
        fromDropDown.add(option);
    });

    currencies.forEach((currency) => {
        const option = document.createElement("option");
        option.value = currency;
        option.text = currency;
        toDropDown.add(option);
    });

    fromDropDown.value = "USD";
    toDropDown.value = "BRL";

    convertButton.addEventListener("click", convertCurrency);

    function convertCurrency() {
        const valor = amountInput.value;
        const fromCurrency = fromDropDown.value;
        const toCurrency = toDropDown.value;

        if (valor.length !== 0) {
            fetch(api)
                .then((resp) => {
                    if (!resp.ok) {
                        throw new Error("Erro na requisição da API");
                    }
                    return resp.json();
                })
                .then((data) => {
                    if (data.result === "error") {
                        throw new Error(data["error-type"]);
                    }

                    let fromExchangeRate = data.conversion_rates[fromCurrency];
                    let toExchangeRate = data.conversion_rates[toCurrency];

                    if (!fromExchangeRate || !toExchangeRate) {
                        throw new Error("Taxas de câmbio não encontradas");
                    }

                    const convertedAmount = (valor / fromExchangeRate) * toExchangeRate;
                    result.innerHTML = `${valor} ${fromCurrency} = ${convertedAmount.toFixed(2)} ${toCurrency}`;

                    result.style.display = "block";
                })
                .catch((error) => {
                    console.error(error);
                    result.innerHTML = "Erro na conversão. Verifique a console para mais detalhes.";
                });
        } else {
            alert("Por favor, preencha o valor");
        }
    }
});
