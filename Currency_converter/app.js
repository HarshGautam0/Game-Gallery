const BASE_URL = "https://api.exchangerate-api.com/v4/latest/USD)";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const FromCurr = document.querySelector(".from select");
const ToCurr = document.querySelector(".to select");
// const countryList = {
//     AED: "AE",
//     AFN: "AF",
//     XCD: "AG",
//     ALL: "AL",
//     AMD: "AM",
//     ANG: "AN",
// };    
// for (code in countryList) {
//     console.log(code, countryList[code]);
// };

for(let select of dropdowns) {
    for(let currCode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        if (select.name === "From" && currCode === "USD"){
            newOption.selected = "selected";
        }else if (select.name === "To" && currCode === "INR"){
            newOption.selected = "selected";
        }
        select.append(newOption);
    };
    select.addEventListener("change", (evt) => {
        updateflag(evt.target);
    });    
};

const updateflag = (element) => {
    // console.log(element);
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newsrc;
}

btn.addEventListener("click",async(evt) =>{
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if(amtval === "" || amtval < 1){
        amtval = 1;
        amount.value = "1";
        console.log(amtval);
    }
    // console.log(FromCurr.value,ToCurr.value);
    const URL = `https://api.exchangerate-api.com/v4/latest/${FromCurr.value}`;

    let response = await fetch(URL);
    let data = await response.json();

    console.log(response);
    let exchangeRate = data.rates[ToCurr.value];
    let convertedAmount = amtval * exchangeRate;
    let resultElement = document.querySelector(".msg");
    resultElement.innerText = `${amtval} ${FromCurr.value} = ${convertedAmount.toFixed(2)} ${ToCurr.value}`;


       
})