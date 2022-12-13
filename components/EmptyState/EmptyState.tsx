import React from 'react';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex h-180 items-center justify-center">
      <p className="text:black text-2xl dark:text-gray-300 lg:text-4xl">
        {message}.
      </p>
    </div>
  );
};

export default EmptyState;
