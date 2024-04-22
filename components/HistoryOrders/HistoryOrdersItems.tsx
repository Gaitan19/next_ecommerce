import { IDataHistory, logService } from "@/services/logService";
import { userService } from "@/services/userService";

const HistoryOrdersItems = async () => {
  const user = await userService.getUser();

  const orders: IDataHistory[] = await logService.getLogs(user.id);

  console.log("orders :>> ", orders);

  return <div>history</div>;
};

export default HistoryOrdersItems;
