import React from 'react';

const EmptyState = ({ message }: { message: string }) => {
  return (
    <div className="flex h-128 items-center justify-center">
      <p className="text:black text-5xl dark:text-gray-300">{message}.</p>
    </div>
  );
};

export default EmptyState;
