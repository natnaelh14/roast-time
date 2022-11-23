import { ItemLoading } from './ItemLoading';
import React from 'react';

export const DashboardLoading = () => {
  const test = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div className="mt-5 flex flex-row overflow-x-scroll md:flex-wrap md:justify-center md:overflow-auto">
      {test.map((e, i) => {
        return <ItemLoading key={i} />;
      })}
    </div>
  );
};
