import { IUser } from '@/models/userModel';
import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

class User {
  async getUser(email: string): Promise<IUser> {
    try {
      const { error, data: user } = await supabase
        .from('user')
        .select()
        .eq('email', email)
        .single();

      if (error) {
        throw new Error("couldn't read user");
      }

      return user;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }
}

export const userService = new User();
