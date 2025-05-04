/* eslint-disable @typescript-eslint/no-explicit-any */

import { DashboardTable } from "./tableComponents/dashboardTable";
import StatusBadge from "./tableComponents/StatusBadge";


export const TransactionsSection = ({ transactions, theme }: any) => (
  <div className="space-y-3 md:space-y-4">
    <h2 className="text-lg md:text-xl font-semibold">Recent Transactions</h2>
    <DashboardTable
      columns={[
        { header: "Date", className: "" },
        { header: "Amount", className: "" },
        { header: "Status", className: "" },
      ]}
      theme={theme}
    >
      {transactions.map((transaction: any, index: number) => (
        <tr style={{marginTop: 5}} key={index}>
          <td>{transaction.date}</td>
          <td>GHS {transaction.amount.toFixed(2)}</td>
          <td>
            <StatusBadge status={transaction.status} theme={theme} />
          </td>
        </tr>
      ))}
    </DashboardTable>
  </div>
);