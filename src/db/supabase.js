// Permite crear una conexión con los elementos almacenados en supabase
import { createClient } from '@supabase/supabase-js';
import { env } from '../config/env.js';

// Si existen los elementos de conexión a Supabase, se crea el servicio
export const supabase = env.supabase.url && env.supabase.serviceRoleKey
  ? createClient(env.supabase.url, env.supabase.serviceRoleKey)
  : null;

// Función que permite cargar/generar imágenes de los eventos en supabase: Se usa para crear un ticket y generar un QR 
export async function uploadPng(buffer, path) {
  if (!supabase) throw new Error('Supabase not configured');
  const bucket = env.supabase.bucket;
  const { data, error } = await supabase.storage.from(bucket).upload(path, buffer, {
    contentType: 'image/png',
    upsert: true
  });
  if (error) throw error;
  // URL de la imagen almacenada
  const { data: pub } = supabase.storage.from(bucket).getPublicUrl(path);
  return pub.publicUrl;
}