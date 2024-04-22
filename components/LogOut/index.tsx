import { createClient } from "@/utils/supabase/client";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext } from "react";

export default function LogOut({ value }: any) {
  const router = useRouter();
  const supabase = createClient();

  const { user } = JSON.parse(value);

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    await router.push("/login");
  };

  return (
    <div className="flex items-center gap-4">
      <span className="text-black">{user.email}</span>

      <button
        onClick={handleSignOut}
        className="py-2 px-4 rounded-md bg-gray-300 text-black hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
      >
        Logout
      </button>
    </div>
  );
}
