const itemForm = document.getElementById('item-form');
const itemInput= document.getElementById('item-input');
const itemList = document.getElementById('item-list');
const clearBtn = document.getElementById('clear')
const itemFilter = document.getElementById('filter')
const formBtn = itemForm.querySelector('button')
const Change= document.querySelector('h3')
let isEditMode = false;
//Event Listener

function onAddItemSubmit(e) {
    e.preventDefault();
    const newItem = itemInput.value;
    if(newItem === ''){
        alert('Please Enter Something');
        return;
    }
    if(isEditMode){
        const itemToEdiy = itemList.querySelector('.edit-mode')
        removeItemFromStorage(itemToEdiy.textContent)
        itemToEdiy.classList.remove('edit-mode')
        itemToEdiy.remove()
        isEditMode = false
    }
    else{
        if(onClickIfItemExists(newItem)){
            alert('Item Already Exists')
            return
        }
    }
    addItemToDom(newItem)
    addItemToStorage(newItem)
    checkUI()
    
}
function addItemToDom(item){
        //Creating element
        const li = document.createElement('li')
        li.appendChild(document.createTextNode(item));
        //Creating button
        const button = createButton('remove-item btn-link text-red');
        li.appendChild(button);
        itemList.appendChild(li);
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
function removeItem(item){
    if(confirm('Are you sure you want to delete?')){
        item.remove()//first parent element it ddelects the entire button but the second parent elemnt selects the full apples ka writing container everything
        removeItemFromStorage(item.textContent)
          checkUI()
    }
 
}
function clearItems(e){
    while(itemList.firstChild){
        itemList.removeChild(itemList.firstChild)// cannot do display none for the clear all functionality of check ui as they are not going away becoz on puttting display none the length is not becoming 0 and hence the clear all button and filter items are working on the else condition hence they are being displayed 
    }
    localStorage.removeItem('items')
    checkUI();
}
function checkUI(){
    itemInput.value = ''
    const items = itemList.querySelectorAll('li')// this is continuously changing and hence we must write it in the function and not outside otherwise the length is going to remain 0 as initially when we defined it aboove elements the length = 0 and hence we write in the function
    console.log(items.length)
    if(items.length ===0){
        clearBtn.style.display='none'
        itemFilter.style.display = 'none'
        Change.textContent = ''
    }
    else{
        clearBtn.style.display='block'
        itemFilter.style.display = 'block'
        Change.textContent = 'To edit click on the items'  
    } 
    formBtn.innerHTML = '<i class = "fa-solid"></i> Add item'
    formBtn.style.backgroundColor='#333'
    isEditMode = false
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
function addItemToStorage(item){
    const itemsFromStorage = getItemsFromStorage();
itemsFromStorage.push(item)
localStorage.setItem('items' , JSON.stringify(itemsFromStorage))
}
function getItemsFromStorage(){
    if(localStorage.getItem('items') === null)
    itemsFromStorage = []
else{
    itemsFromStorage = JSON.parse(localStorage.getItem('items'))
}
return itemsFromStorage;
}
function displayItems(){
    const itemsFromStorage = getItemsFromStorage();
    itemsFromStorage.forEach(item =>addItemToDom(item));
checkUI()
}
function onClickItem(e){
    if(e.target.parentElement.classList.contains('remove-item')){
        removeItem(e.target.parentElement.parentElement)
    }
    else{
        setItemToEdit(e.target)
    }
    
}
function setItemToEdit (item){
    isEditMode = true
    itemList.querySelectorAll('li').forEach((i) => i.classList.remove('edit-mode'))
    item.classList.add('edit-mode')
    formBtn.innerHTML = '<i class = "fa-solid" fa-pen></i>UpdateItem'
    itemInput.value = item.textContent
    formBtn.style.background = 'green'
}

function removeItemFromStorage(item){
    let itemsFromStorage = getItemsFromStorage()
    itemsFromStorage = itemsFromStorage.filter((i)=> i !== item)
    localStorage.setItem('items',JSON.stringify(itemsFromStorage))
}
function onClickIfItemExists(item){
    const itemsFromStorage = getItemsFromStorage()
    return itemsFromStorage.includes(item)
}
function addition (item){
   
}
addition()

function init(){
    itemForm.addEventListener('submit',onAddItemSubmit)
itemList.addEventListener('click',onClickItem)
clearBtn.addEventListener('click',clearItems)
itemFilter.addEventListener('input',filterItem)
document.addEventListener('DOMContentLoaded',displayItems)
checkUI();
}
init();

