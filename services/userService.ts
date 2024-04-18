import { IUser } from '@/models/userModel';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

class User {
  async getUser(): Promise<IUser> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      const { error, data: userData } = await supabase
        .from('user')
        .select()
        .eq('email', user?.email)
        .single();

      if (error) {
        throw new Error("couldn't read user");
      }

      return userData;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const userService = new User();
