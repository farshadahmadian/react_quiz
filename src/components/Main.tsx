import { ReactNode } from 'react';

type MainPropsType = {
  children: ReactNode;
};

function Main({ children }: MainPropsType) {
  return <div className='main'>{children}</div>;
}

export default Main;
