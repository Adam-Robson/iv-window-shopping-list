import { signingOut, checkAuth, createItem, fetchItems, upsertItem, deleteItems } from './fetch-utils';

import { renderContainer } from './render-utils';

const user = checkAuth();

const signOutLink = document.createElement('sign-out-link');
signOutLink.addEventListener('click', signingOut);

const listWrapper = document.getElementById('list-wrapper');
const listItemInput = document.getElementById('list-item-input');
const quantityItemInput = document.getElementById('quantity-item-input');
const addButton = document.getElementById('add-button');

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(addItemForm);
    const item = formData.get('item');
    const quantity = formData.get('quantity');
    
    const response = await createItem(name, quantity);
    
    addItemForm.reset();
    
    const error = response.error;
    
    if (error) {
        console.log(error.message);
    } else {
        displayList();
    }
});

let list = [];

async function handleUpdate(item) {
    const update = {
        bought: true
    };
    const response = await upsertItem(item.id, update);
    if (response.error) {
        console.log(response.error);
    } else {
        const bought = response.data;
        const index = list.indexOf(item);
        list[index] = bought;

        displayList();
    }
}

async function displayList() {
    const items = await fetchItems();
    
    listWrapper.innerHTML = '';

    for (let item of items) {
        const renderedItems = renderContainer(item, handleUpdate);
        listDiv.append(renderedItems);
    }
}

async function onLoad() {
    await displayList();
}

onLoad();


deleteButton.addEventListener('click', async () => {
    const message = 'Delete all items?';
    if (!confirm(message)) return;
    const response = await deleteItems();

    if (!response.error) {
        list = [];
    }
    displayList();
});


