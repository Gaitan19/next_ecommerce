import CheckoutOrder from "@/components/CheckOutOrder";
import FormCheck from "@/components/FormCheck";
import HeaderEcommerce from "@/components/HeaderEcommerce";
import TableView from "@/components/TableView";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function cartPage() {
  const cookieStore = cookies();

  const data = cookieStore.get("sb-fcybhjbilfsdcxkomjfk-auth-token");

  if (!data) return redirect("/login");

  const { user } = JSON.parse(data.value);

  return (
    <>
      <HeaderEcommerce value={data.value} />
      <section>
        <div className="container">
          <div className="wrapper flex flex-col gap-40">
            <TableView email={user.email} />
            <div>
              <FormCheck email={user.email}>
                <CheckoutOrder email={user.email} />
              </FormCheck>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
