const itemForm = document.getElementById('item-form');
const itemInput= document.getElementById('item-input');
const itemList = document.getElementById('item-list');

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
itemForm.addEventListener('submit',addItem)