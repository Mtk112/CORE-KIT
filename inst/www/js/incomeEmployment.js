'use strict'

/* Populates incomeItemList with an li element based on user selection */
function populateIncome(id, iWorkers, iPortion){
    if( id != "" && iWorkers != "" || id != "" && iPortion != ""){
        if(id == "custom"){
            console.log("I have a custom!");
            var list = document.getElementById("incomeItemList");
            var name = document.getElementById("incomeName").value;
            console.log(name);
            if(name != ""){
                if(iWorkers != "" && iPortion != ""){
                    var text = "Income type: " + name + ", number of workers: " + parseInt(iWorkers) + ", portion of the populaton: " + parseFloat(iPortion);
                }
                if(iWorkers != "" && iPortion === ""){
                    var portion = parseInt(iWorkers) / parseInt(document.getElementById("population").value) * 100; 
                    var text = "Income type: " + name + ", number of workers: " + parseInt(iWorkers) + ", portion of the populaton: " + parseFloat(portion);
                }
                if(iWorkers == "" && iPortion != ""){
                    var portion = parseInt(document.getElementById("population").value) * (parseInt(iPortion) / 100); 
                    var text = "Income type: " + name + ", number of workers: " + parseInt(portion) + ", portion of the populaton: " + parseFloat(iPortion);
                }
                list.innerHTML += '<li>' + text + ' <button class="delete" onclick="deleteIncome(this);">Remove!</button> </li>';
            }else{
                alert("Please name the income.");
            }
        }
        else{
            var list = document.getElementById("incomeItemList");
            if(iWorkers != "" && iPortion != ""){
                var text = "Income type: " + id + ", number of workers: " + parseInt(iWorkers) + ", portion of the populaton: " + parseFloat(iPortion);
            }
            if(iWorkers != "" && iPortion === ""){
                var portion = parseInt(iWorkers) / parseInt(document.getElementById("population").value) * 100; 
                var text = "Income type: " + id + ", number of workers: " + parseInt(iWorkers) + ", portion of the populaton: " + parseFloat(portion);
            }
            if(iWorkers == "" && iPortion != ""){
                var portion = parseInt(document.getElementById("population").value) * (parseInt(iPortion) / 100); 
                var text = "Income type: " + id + ", number of workers: " + parseInt(portion) + ", portion of the populaton: " + parseFloat(iPortion);
            }
            list.innerHTML += '<li>' + text + ' <button class="delete" onclick="deleteIncome(this);">Remove!</button> </li>'; 
        }
    }else{
        alert("Fill in required information (Number of workers and/or Portion of population) !");
    }  
}

/* Populates employmentItemList with an li element based on user selection */
function populateEmployment(id, eWorkers, ePortion){
    if( id != "" && eWorkers != "" || id != "" && ePortion != ""){
        if(id == "custom"){
            
            console.log("I have a custom!");
            var list = document.getElementById("employmentItemList");
            var name = document.getElementById("employmentName").value;
            console.log(name);
            if(name != ""){
                if(eWorkers != "" && ePortion != ""){
                    var text = "Employment type: " + name + ", number of workers: " + parseInt(eWorkers) + ", portion of the populaton: " + parseFloat(ePortion);
                }
                if(eWorkers != "" && ePortion === ""){
                    var portion = parseInt(eWorkers) / parseInt(document.getElementById("population").value) * 100; 
                    var text = "Employment type: " + name + ", number of workers: " + parseInt(eWorkers) + ", portion of the populaton: " + parseFloat(portion);
                }
                if(eWorkers == "" && ePortion != ""){
                    var portion = parseInt(document.getElementById("population").value) * (parseInt(ePortion) / 100); 
                    var text = "Employment type: " + name + ", number of workers: " + parseInt(portion) + ", portion of the populaton: " + parseFloat(iPortion);
                }
                list.innerHTML += '<li>' + text + ' <button class="delete" onclick="deleteEmployment(this);">Remove!</button> </li>';
            }else{
                alert("Please name the employment.");
            }
        }
        else{
            var list = document.getElementById("employmentItemList");
            if(eWorkers != "" && ePortion != ""){
                var text = "Employment type: " + id + ", number of workers: " + parseInt(eWorkers) + ", portion of the populaton: " + parseFloat(ePortion);
            }
            if(eWorkers != "" && ePortion === ""){
                var portion = parseInt(eWorkers) / parseInt(document.getElementById("population").value) * 100; 
                var text = "Employment type: " + id + ", number of workers: " + parseInt(eWorkers) + ", portion of the populaton: " + parseFloat(portion);
            }
            if(eWorkers == "" && ePortion != ""){
                var portion = parseInt(document.getElementById("population").value) * (parseInt(ePortion) / 100); 
                var text = "Employment type: " + id + ", number of workers: " + parseInt(portion) + ", portion of the populaton: " + parseFloat(ePortion);
            }
            list.innerHTML += '<li>' + text + ' <button class="delete" onclick="deleteEmployment(this);">Remove!</button> </li>'; 
        }
    }else{
        alert("Fill in required information (Number of workers and/or Portion of population) !")
    }   
}
/* Deletes item from the list depending on which remove button was clicked */
function deleteIncome(currentElement){
    currentElement.parentNode.parentNode.removeChild(currentElement.parentNode);
}

function deleteEmployment(currentElement){
    currentElement.parentNode.parentNode.removeChild(currentElement.parentNode);
}
