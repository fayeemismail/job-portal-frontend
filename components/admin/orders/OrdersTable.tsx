'use client';

import { OrderItem } from '@/components/orders/constants';
import { useRouter } from 'next/navigation';
import { useSidebar } from '@/components/ui/sidebar';

interface OrdersTableProps {
  orders: OrderItem[];
}

export function OrdersTable({ orders }: OrdersTableProps) {
  const router = useRouter();
  const { accentTheme } = useSidebar();
  const isNavy = accentTheme === 'navy';

  const handleRowClick = (id: string) => {
    router.push(`/admin/orders/${id}`);
  };

  // Dynamic Theme Styling
  const headerBgClass = isNavy ? 'bg-[#0B2545]/5' : 'bg-[#FFFBF9]/80';
  const orderIdTextClass = isNavy ? 'text-[#0B2545]' : 'text-[#EE5E36]';
  const rowHoverBgClass = isNavy ? 'hover:bg-[#0B2545]/5' : 'hover:bg-[#FFFBF9]/30';

  return (
    <div className="bg-white border border-[#0B2545]/10 rounded-3xl overflow-hidden shadow-2xs">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr
              className={`${headerBgClass} border-b border-[#0B2545]/10 text-[#0B2545]/70 text-[11px] font-extrabold uppercase tracking-wider text-left`}
            >
              <th className="px-6 py-4 font-black">Order ID</th>
              <th className="px-6 py-4 font-black">Service Name</th>
              <th className="px-6 py-4 font-black">Category</th>
              <th className="px-6 py-4 font-black">Date</th>
              <th className="px-6 py-4 font-black">Worker</th>
              <th className="px-6 py-4 font-black">Amount</th>
              <th className="px-6 py-4 font-black">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order.id}
                  onClick={() => handleRowClick(order.id)}
                  className={`border-b border-gray-50 ${rowHoverBgClass} text-xs text-[#0B2545] transition-colors cursor-pointer`}
                >
                  <td className="px-6 py-4 font-semibold">
                    <span className={`font-mono font-black ${orderIdTextClass} hover:underline`}>
                      {order.id}
                    </span>
                  </td>
                  <td className="px-6 py-4 font-semibold">{order.serviceName}</td>
                  <td className="px-6 py-4 font-semibold">{order.category}</td>
                  <td className="px-6 py-4 font-semibold">{order.date}</td>
                  <td className="px-6 py-4 font-semibold">
                    {order.worker ? (
                      <div className="flex items-center gap-1.5">
                        <span className="font-semibold">{order.worker.name}</span>
                      </div>
                    ) : (
                      <span className="text-gray-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    <span className="font-bold text-gray-900">${order.price.toFixed(2)}</span>
                  </td>
                  <td className="px-6 py-4 font-semibold">
                    <span
                      className={
                        {
                          pending:
                            'bg-amber-50 text-amber-700 border border-amber-100 font-bold px-2.5 py-1 rounded-full text-[10px]',
                          'in-progress':
                            'bg-blue-50 text-blue-700 border border-blue-100 font-bold px-2.5 py-1 rounded-full text-[10px]',
                          completed:
                            'bg-green-50 text-green-700 border border-green-100 font-bold px-2.5 py-1 rounded-full text-[10px]',
                          cancelled:
                            'bg-red-50 text-red-700 border border-red-100 font-bold px-2.5 py-1 rounded-full text-[10px]',
                        }[order.status]
                      }
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="px-6 py-12 text-center text-gray-400 font-bold uppercase tracking-wider text-xs"
                >
                  No orders found matching criteria.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
