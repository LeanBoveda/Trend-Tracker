import { createClient } from '@supabase/supabase-js';

// Estas variables las obtendremos del panel de Supabase en un momento
const supabaseUrl = 'AQUI_IRA_TU_URL';
const supabaseAnonKey = 'AQUI_IRA_TU_CLAVE';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);