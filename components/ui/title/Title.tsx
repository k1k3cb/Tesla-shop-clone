import { titleFont } from '@/src/config/fonts';

interface TitleProps {
  title: string;
  subtitle?: string;
  className?: string;
}

const Title = ({ title, subtitle, className }: TitleProps) => {
  return (
    <div className={`mt-3 ${className}`}>
      <h1
        className={`${titleFont.className} antialiased font-semibold text-4xl my-10`}
      >
        {title}
      </h1>

      {subtitle && <h3 className=' font-light text-xl mb-5'>{subtitle}</h3>}
    </div>
  );
};

export default Title;
