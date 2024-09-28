import { AiOutlineLoading3Quarters } from 'react-icons/ai';

interface SpinerProps {
    className?: string;
  }


export const Spinner: React.FC<SpinerProps> = ({ className = "animate-spin text-4xl text-blue-500" }) => {
  return (
      <AiOutlineLoading3Quarters className={className} />
  );
};