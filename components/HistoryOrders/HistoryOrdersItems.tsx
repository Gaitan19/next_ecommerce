import { tableHistoyHeaders } from '@/data/historyView';
import { IDataHistory, logService } from '@/services/logService';
import { userService } from '@/services/userService';
import Link from 'next/link';
import { v4 } from 'uuid';

const HistoryOrdersItems = async () => {
  const user = await userService.getUser();

  const orders: IDataHistory[] = await logService.getLogs(user.id);

  const renderTableHeaders = () =>
    tableHistoyHeaders.map((tableHeader) => (
      <th key={v4()} className="View-table-header">
        {tableHeader}
      </th>
    ));

  const renderTableBody = () =>
    orders.map((orderData: IDataHistory) => (
      <tr key={orderData.id} className="">
        <td className="">{orderData.orders.shipping_address}</td>

        <td className="">{orderData.orders.payment_method}</td>

        <td className="">{orderData.orders.order_status}</td>
        <td className="">
          <Link href={`/Details/${orderData.id}`}>View Details</Link>
        </td>
      </tr>
    ));

  return (
    <div>
      {orders.length !== 0 && (
        <table>
          <thead>
            <tr>{renderTableHeaders()}</tr>
          </thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      )}
    </div>
  );
};

export default HistoryOrdersItems;
