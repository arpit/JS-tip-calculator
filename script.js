let currentRate = getRateFromButton(document.querySelector(".selectedTip"));

let formatter = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

document.querySelectorAll(".user_input").forEach(e => e.addEventListener("keypress", function (evt) {
    if (evt.which < 48 || evt.which > 57)
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
  currentRate = parseInt(evt.target.value);
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
    currentRate = getRateFromButton(e)
    calculateTip();
  })
})

function getRateFromButton(button){
  let text = button.textContent;
  let parsed = text.substring(0, text.length-1)
  return parseInt(parsed);
}

function calculateTip(){
  const raw = document.querySelector("#input").value;
  if(!raw || raw === "") return;
  const input = parseInt(raw);
  
  let tip = input * (currentRate/100.0);
  
  
  
  document.querySelector("#tip").innerHTML = formatter.format(tip);
  document.querySelector("#total").innerHTML = formatter.format(input + tip);
}



