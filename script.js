const itemForm = document.getElementById('item-form');
const itemInput= document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
//Event Listener

function addItem(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        alert('Please Enter Something');
        return;
    }
    //Creating element
    const li = document.createElement('li')
    li.appendChild(document.createTextNode(newItem));
    //Creating button
    const button = createButton('remove-item btn-link text-red');
    li.appendChild(button);
    itemList.appendChild(li);
    checkUI()
    
}

function createButton(classes){
    const button = document.createElement('button')
    button.className = classes
    const icon = createIcon('fa-solid fa-xmark')
    button.appendChild(icon)
    return button;
    
}
function createIcon(classes){
    const icon = document.createElement('i')
    icon.className = classes
    return icon;
}

//Function to remove item
function removeItem(e){
    if(confirm('Are you sure you want to delete?'));
    if(e.target.parentElement.classList.contains('remove-item'))
e.target.parentElement.parentElement.remove();//First parent element it ddelects the entire button but the second parent elemnt selects the full apples ka writing container everything
 checkUI()
}
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)// cannot do display none for the clear all functionality of check ui as they are not going away becoz on puttting display none the length is not becoming 0 and hence the clear all button and filter items are working on the else condition hence they are being displayed 
    }
    checkUI();
}
function checkUI(){
    const items = itemList.querySelectorAll('li')// this is continuously changing and hence we must write it in the function and not outside otherwise the length is going to remain 0 as initially when we defined it aboove elements the length = 0 and hence we write in the function
    console.log(items.length)
    if(items.length ===0){
        clearBtn.style.display='none'
        itemFilter.style.display = 'none'
    }
    else{
        clearBtn.style.display='block'
        itemFilter.style.display = 'block'   
    } 
}
function filterItem(e){
  const text = e.target.value.toLowerCase();
  const items = itemList.querySelectorAll('li')// this is continuously changing and hence we must write it in the function and not outside otherwise the length is going to remain 0 as initially when we defined it aboove elements the length = 0 and hence we write in the function
items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();
    if(itemName.indexOf(text) != -1){
        item.style.display = 'block'
    }
    else{
        item.style.display = 'none'
    }
})
}
itemForm.addEventListener('submit',addItem)
itemList.addEventListener('click',removeItem)
clearBtn.addEventListener('click',clearItems)
itemFilter.addEventListener('input',filterItem)
checkUI();
