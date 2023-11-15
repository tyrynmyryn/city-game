type Props = {
  children?: string | JSX.Element | JSX.Element[];
};

const CardHeader = ({ children }: Props) => {
  return (
    <div className='flex justify-center items-center p-4 bg-white rounded-t-2xl'>{children}</div>
  );
};

export default CardHeader;
