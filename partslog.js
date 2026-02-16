let input = document.getElementById("value");
let category = document.getElementById("category");
let button = document.getElementById("punch");
let query=   document.getElementById("query")
let result =   document.getElementById("result")
let deletetxt = document.getElementById("deletetxt")
let deleteBtn = document.getElementById("deleteBtn")
let date = document.getElementById("date")
button.addEventListener("click",punch);


function punch(){

    if(input.value.trim() === ""){
        alert("please enter a value");
        return;
    }
    
    let amount = Number(input.value.trim());
    let cat = category.value; 
    
    if(isNaN(amount)){
        alert("please enter a valid number");
        return;
    }
    
    let entry ={
        amount: amount,
         category: cat,
         time: new Date().toISOString().split("T")[0]
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

deleteBtn.addEventListener("click",deleteEntry);

function deleteEntry(){

    let data = JSON.parse(localStorage.getItem("expenses")||"[]");
    let text = deletetxt.value.trim()
    let selectDate = date.value
   
const newData = data.filter(items=>!(items.time==selectDate&&text==items.category))
    
localStorage.setItem("expenses",JSON.stringify(newData))
}



