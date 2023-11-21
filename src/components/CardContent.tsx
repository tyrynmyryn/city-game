import { ReactNode } from 'react';
type Props = {
  children?: string | JSX.Element | JSX.Element[] | ReactNode;
};

const CardContent = ({ children }: Props) => {
  return <div className='p-6 bg-white rounded-b-2xl'>{children}</div>;
};

export default CardContent;
