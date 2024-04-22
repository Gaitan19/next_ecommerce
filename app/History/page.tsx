import HeaderEcommerce from "@/components/HeaderEcommerce";
import HistoryOrders from "@/components/HistoryOrders";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function historyPage() {
  const cookieStore = cookies();

  const data = cookieStore.get("sb-fcybhjbilfsdcxkomjfk-auth-token");

  if (!data) return redirect("/login");

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <HistoryOrders />
    </>
  );
}
