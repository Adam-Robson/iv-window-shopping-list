import { signingOut, checkAuth, createItem, fetchItems, upsertItem, deleteItems } from './fetch-utils';

import { renderContainer } from './render-utils';

checkAuth();

const signOutLink = document.createElement('sign-out-link');
signOutLink.addEventListener('click', signingOut);

const listWrapper = document.getElementById('list-wrapper');
const addItemForm = document.getElementById('add-item-form');
const deleteButton = document.getElementById('delete-button');

addItemForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = new FormData(addItemForm);
    const item = formData.get('item');
    const quantity = formData.get('quantity');
    
    const response = await createItem(item, quantity);
    
    addItemForm.reset();
    
    const error = response.error;
    
    if (error) {
        /* eslint-disable no-console */
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
        /* eslint-disable no-console */
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
        listWrapper.append(renderedItems);
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
