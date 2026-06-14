import { createClient } from '@supabase/supabase-js';

// Estas variables las obtendremos del panel de Supabase en un momento
const supabaseAnonKey = 'sb_publishable_kqzR96TsA774Z4FY5M4sNA_RpkK_9Wu';
const supabaseUrl = 'https://owpbxwucijuqrwumltoq.supabase.co';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);