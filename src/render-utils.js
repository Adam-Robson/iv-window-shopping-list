export function renderShoppingList(item, handleUpdate) {
    const div = document.createElement('div');

    const p = document.createElement('p');
    p.textContent = `${item.quantity} ${item.item}`;

    if (item.bought) {
        p.classList.add('bought');
    } else {
        p.style.cursor = 'pointer';
        p.addEventListener('click', async () => {
            await handleUpdate(item);
        });
    }

    div.append(p);
    return div;
}
