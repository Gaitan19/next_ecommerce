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
      <th
        key={v4()}
        className="py-3 px-6 bg-gray-200 text-gray-700 font-bold uppercase border border-gray-300"
      >
        {tableHeader}
      </th>
    ));

  const renderTableBody = () =>
    orders.map((orderData: IDataHistory) => (
      <tr key={orderData.id} className="border-b border-gray-200">
        <td className="py-3 px-6">{orderData.orders.shipping_address}</td>

        <td className="py-3 px-6">{orderData.orders.payment_method}</td>

        <td className="py-3 px-6">{orderData.orders.order_status}</td>
        <td className="py-3 px-6">
          <Link
            href={`/Details/${orderData.id}`}
            className="inline-block bg-gray-300 text-gray-700 py-2 px-4 rounded transition duration-300 hover:bg-gray-400 hover:no-underline no-underline"
          >
            View Details
          </Link>
        </td>
      </tr>
    ));

  return (
    <div className="w-full pt-10 max-h-[569px] overflow-auto">
      {orders.length !== 0 && (
        <table className="w-full table-auto border-collapse border border-gray-300 shadow-md rounded-lg">
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
