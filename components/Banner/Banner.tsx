import { ReactNode } from 'react';

interface BannerProps {
  title: string;
  children?: ReactNode;
}
const Banner = ({ title, children }: BannerProps) => {
  return (
    <div className="banner flex h-[200px] flex-col items-center justify-center text-center text-xl font-black sm:text-2xl md:h-[300px] md:text-4xl lg:text-5xl">
      <p className="m-3">{title}</p>
      {children}
    </div>
  );
};

export default Banner;
