import { NextPage } from 'next';

const Protected: NextPage = (): JSX.Element => {
  const test = false;
  if (test)
    return (
      <div className="flex min-h-[600px] items-center justify-center text-2xl">
        You are Logged In.
      </div>
    );
  return <div>Loading...</div>;
};

export default Protected;
