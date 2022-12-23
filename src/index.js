import { signingOut, checkAuth, createItem, fetchItems, upsertItem, deleteItem } from './fetch-utils';

import { renderContainer } from './render-utils';

const user = checkAuth();

const signOutLink = document.createElement('sign-out-link');

signOutLink.addEventListener('click', signingOut);

const listWrapper = document.getElementById('list-wrapper');
const listItemInput = document.getElementById('list-item-input');
const quantityItemInput = document.getElementById('quantity-item-input');
const addButton = document.getElementById('add-button');

async function displayItems() {
  listWrapper.innerHTML = ''
  const items = await fetchItems();

  for (let item of items) {
    const renderedItem = renderContainer(item, handleDelete);
    listWrapper.append(renderedItem);
  }
}


addButton.addEventListener('click', async () => {
  listWrapper.textContent = '';

  const item = listItemInput.value;
  const quantity = quantityItemInput.value;

  const grocery = {
    item: item,
    quantity: quantity
  };

  await createItem(grocery);

  const newContainer = renderContainer(grocery, handleDelete);

  listWrapper.append(newContainer);
  listItemInput.value = '';
  quantityItemInput.value = '';
});

displayItems();

async function handleDelete() {
  const message = `Delete this item?`;
  if (!confirm(message)) return;

  const res = await deleteItem(grocery.id);
  if (!res.error) {
    const items = await fetchItems();
    const index = items.indexOf(grocery);
    
    if (index !== -1) {
      items.splice(index, 1);
    }
    displayItems();
  }
}

async function handleDone() {
  const res = await upsertItem(grocery.id, bought);
  displayItems();

}