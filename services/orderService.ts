import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

class Orders {}

export const productsService = new Orders();
