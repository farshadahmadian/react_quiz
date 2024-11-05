import { ReactNode } from 'react';

type FooterPropsType = {
  children: ReactNode;
};

function Footer({ children }: FooterPropsType) {
  return <div>{children}</div>;
}

export default Footer;
