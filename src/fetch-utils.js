
import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://fjidvhxajekcfrrjsnla.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZqaWR2aHhhamVrY2ZycmpzbmxhIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjAxNDU2ODYsImV4cCI6MTk3NTcyMTY4Nn0._zi_gZoOt0ksKYa3J9htU9w6oH8ojf_WkKrLHWGaswo';

const client = createClient(SUPABASE_URL, SUPABASE_KEY);

//  ERRORS
const checkError = ({ data, error }) => {
  return error ? console.error(error) : data;
};

//  AUTH
export async function signingUp(email, password) {
  const res = await client.auth.signUp({ email, password });
  return checkError(res);
}

export async function signingIn(email, password) {
  const res = await client.auth.signInWithPassword({ email, password });
  return checkError(res);
}

export async function fetchUser() {
  const res = await client.auth.getUser();
    return checkError(res);
}

export async function updateCredentials(email, password, data) {
  const res = await client.auth.updateUser({ email, password, data });
  return checkError(res);
}

export async function signingOut() {
  const res = await supabase.auth.signOut();
  return checkError(res);
}

//  DATA
//  CRUD

export async function createItem() {
const res = await client
  .from('shopping')
  .insert([
    { name, 
      bought, 
      quantity
    },
  ]);
  return checkError(res);
}

export async function fetchItems() {
const res = await client
  .from('shopping')
  .select('*');
  return checkError(res);
}

export async function upsertItem() {
  const res = await client
  .from('shopping')
  .insert([{ bought: true }], { upsert: true })
  .match({ id })
  .single();
  return checkError(res);
}

export async function deleteItem() {
  const res = await client
    .from('shopping')
    .delete()
    .match({ name })
    .single()
    return checkError(res);
}








