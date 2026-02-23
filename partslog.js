const input = document.getElementById("value");
const category = document.getElementById("category");
const button = document.getElementById("punch");
const query=   document.getElementById("query");
const result =   document.getElementById("result");
const searchButton = document.getElementById("searchButton");
const deleteBtn = document.getElementById("deleteBtn");
const deletetxt = document.getElementById("deletetxt")
const date = document.getElementById("date");
const ctx = document.getElementById("myChart").getContext('2d');
const renderGraphBtn = document.getElementById("renderGraphBtn")


let totalAmount = 0

button.addEventListener("click",punch);

function punch(){

    if(input.value.trim() === ""){
        alert("please enter a value");
        return;
    }
    
    let amount = Number(input.value.trim());
    let cat = category.value; 
     totalAmount += amount
    if(isNaN(amount)){
        alert("please enter a valid number");
        return
    }
        else if(totalAmount>1000){
         alert('you have exceede the budget')
         return
        }
        

    let entry ={
        amount: amount,
         category: cat,
         time: new Date().toISOString().split("T")[0],
         totalAmount: totalAmount
    }    
console.log(entry)
    input.value = ""
    category.value = ""
     let data = JSON.parse(localStorage.getItem("expenses") || "[]");
    data.push(entry);
   
localStorage.setItem("expenses",JSON.stringify(data))
}  

searchButton.addEventListener("click",search);

function search(){
    let data = JSON.parse(localStorage.getItem("expenses")||"[]");
    
    let q = query.value.trim();
    
    for(i=0; i<data.length; i++){
        let items = data[i];

    

    if(q===String(items.amount)||q===items.category){
        result.textContent= `amount: ${items.amount} category: ${items.category} time: ${items.time}`
         query.value = ""
        return
        
    }
}
        
        {
        result.textContent = "not found"
        query.value = ""

    }
}

renderGraphBtn.addEventListener("click",renderGraph)
let chartInstance;
 function renderGraph(){
let data = JSON.parse(localStorage.getItem("expenses")||"[]")
let totals = {}
for(let e of data){
    totals[e.category] = (totals[e.category]||0) + Number(e.amount)
}
let totalCategory =Object.keys(totals);
let totalAmount = Object.values(totals) 
if(chartInstance){
    chartInstance.destroy()
}
chartInstance = new Chart(ctx,{
    type : "line",
    data : {
        labels: totalCategory,
        datasets:[{
           label: "expenditure tracker",
           data: totalAmount,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
            
     } ]
    }
 })
 }   
    

deleteBtn.addEventListener("click",deleteEntry);

function deleteEntry(){

    let data = JSON.parse(localStorage.getItem("expenses")||"[]");
    let text = deletetxt.value.trim()
    let selectDate = date.value
   
const newData = data.filter(items=>!(items.time==selectDate&&text==items.category))
    
localStorage.setItem("expenses",JSON.stringify(newData))
}


