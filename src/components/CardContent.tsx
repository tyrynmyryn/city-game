type Props = {
  children?: string | JSX.Element | JSX.Element[];
};

const CardContent = ({ children }: Props) => {
  return <div className='p-6 bg-white rounded-b-2xl'>{children}</div>;
};

export default CardContent;
