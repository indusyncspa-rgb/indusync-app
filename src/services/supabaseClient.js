import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://bsslgbmwpdtpvsitsdoi.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_2MCL3uuW23LTuaU9XJu4xw_YRVUvWzu';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
