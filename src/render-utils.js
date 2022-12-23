export async function renderContainer(grocery, handleDelete) {
  const container = document.createElement('section');
  container.classList.add('container');

  const listItem = document.createElement('div');
  listItem.classList.add('list-item');
  listItem.textContent = grocery.name;

  const quantityItem = document.createElement('span');
  quantityItem.classList.add('quantity');
  quantityItem.textContent = grocery.quantity;

  const inputItem = document.createElement('input');
  inputItem.type.add('checkbox');
  grocery.bought === true ?
    inputItem.checkbox === 'checked' :
    inputItem.checkbox !== 'checked';

  const deleteButton = document.createElement('button');
  deleteButton.classList.add('deleteButton');
  deleteButton.textContent = 'delete';
  deleteButton.addEventListener('click', () => {
    handleDelete(grocery);
  });

  container.append(listItem, quantityItem, inputItem, deleteButton);
  return container    
}
