let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

document.querySelectorAll(".user_input").forEach(e => e.addEventListener("keypress", function (evt) {
    if (evt.keyCode < 48 || evt.keyCode > 57)
    {
      evt.preventDefault();
      return;
    }
}));

document.querySelector("#input").addEventListener("input", function (evt) {
  calculateTip();
});

document.querySelector("#custom_tip").addEventListener("input", function (evt) {
  let old = document.querySelector(".selectedTip");
  if(old){
    old.classList.remove("selectedTip");
  }
  calculateTip();
});

document.querySelectorAll("#buttons-container button").forEach((e)=>{
  e.addEventListener("click", ()=>{
    document.querySelector("#custom_tip").value = "";
    let old = document.querySelector(".selectedTip");
    if(old){
      old.classList.remove("selectedTip");
    }
    e.classList.add("selectedTip");
    calculateTip();
  })
})

function getRateFromButton(button){
  let text = button.textContent;
  let parsed = text.substring(0, text.length-1)
  return parseInt(parsed);
}


function currentRate(){
  let selectedButton = document.querySelector(".selectedTip");
  if(!selectedButton){
    return document.querySelector("#custom_tip").value;
  }
  else{
    return getRateFromButton(selectedButton)
  }
}

function getInput(){
  const data = document.querySelector("#input").value;
  if(!data || data === "") return 0;
  return parseInt(data);
}

function calculateTip(){
  const input = getInput();
  const rate = currentRate();
  let tip = input * (rate/100.0);
  document.querySelector("#tip").innerHTML = formatter.format(tip);
  document.querySelector("#total").innerHTML = formatter.format(input + tip);
}



