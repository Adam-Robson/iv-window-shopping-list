const SUPABASE_URL = 'https://fjidvhxajekcfrrjsnla.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWR2aHhhamVrY2ZycmpzbmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxNDU2ODYsImV4cCI6MTk3NTcyMTY4Nn0._zi_gZoOt0ksKYa3J9htU9w6oH8ojf_WkKrLHWGaswo';

const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

export function getUser() {
    return client.auth.user();
}

export function checkAuth() {
    const user = getUser();
    if (!user) {
        const authUrl = location.pathname === '/' ? './auth/' : '../auth/';
        location.replace(`${authUrl}?redirectUrl=${encodeURIComponent(location)}`);
    }
    return user;
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({ email, password });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({ email, password });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function addItem(item, quantity) {
    const res = await client
        .from('shopping_list')
        .insert({
            item,
            quantity })
        .single();
    return checkError(res);
}

export async function getItems() {
    const res = await client.from('shopping_list').select('*');
    return checkError(res);
}

export async function updateItem(id) {
    const res = await client.from('shopping_list').update({ bought: true }).match({ id });
    return checkError(res);
}

export async function deleteAllItems() {
    const res = await client.from('shopping_list').delete().match({ user_id: client.auth.user().id });
    return checkError(res);
}

function checkError({ data, error }) {
    return error ? console.error(error) : data;
}