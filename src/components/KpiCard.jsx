// 'use client';

import { Card } from '@tremor/react';
import { useSelector } from 'react-redux';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}


export default function KpiCard() {
    const {sales}=useSelector((state)=>state.stock)
    const {purchases}=useSelector((state)=>state.stock)
    const totalSales=sales.reduce((acc,item)=>acc+item.amount,0)

    const totalPurchases=purchases.reduce((acc,item)=>acc+item.amount,0)
    console.log(totalPurchases)

    const cash=totalSales-totalPurchases

    const data = [
        {
          name: 'Sales',
          value: `${totalSales}`,
        color:"fuchsia"
        },
        {
          name: 'Purchases',
          value: `${totalPurchases}`,
          color:"amber"
        },
        {
          name: 'Cash',
          value: `${cash}`,
          color:"indigo"
         
        },
      ];

console.log(sales)
  return (
    <>
      <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {data.map((item) => (
          <Card key={item.name}   decoration="top"
          decorationColor={item.color}>
            <dd className="flex items-start justify-between"  >
              <span className="text-tremor-metric font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong">
                € {item.value}
              </span>
     
            </dd>
            <dt className="mt-1 text-tremor-default text-tremor-content dark:text-dark-tremor-content">
              {item.name}
            </dt>
          </Card>
        ))}
      </dl>
    </>
  );
}