import { lusitana } from './fonts';
import { ExpiryCalender, NonExpiry, TotalItems } from '../heroicon/icons';
const iconMap = {
  total: ExpiryCalender,
  expired: TotalItems,
  nonExpiry: NonExpiry,
};
  
export function CardWrapper({totalItems, expiredItems, nonExpiryItems}) {
  return (
      <div className={`${lusitana.className} grid gap-6 sm:grid-cols-2 lg:grid-cols-4`}>
          <Card title="Total Items" value={totalItems} type="total" />
          <Card title="Expired Items" value={expiredItems} type="expired" />
          <Card title="Non Expiry Items" value={nonExpiryItems} type="nonExpiry" />
      </div>
  );
}
  
export function Card({ title, value, type }) {
  const Icon = iconMap[type];

  return (
    <div className="rounded-xl bg-orange-50 p-2 shadow-sm">
      <div className="flex p-4">
        {Icon ? <Icon className="h-5 w-5 text-gray-700" /> : null}
        <h3 className="ml-2 text-sm font-medium">{title}</h3>
      </div>
      <p
        className={`${lusitana.className}
          truncate rounded-xl bg-white px-4 py-8 text-center text-2xl`}
      >
        {value}
      </p>
    </div>
  );
}

