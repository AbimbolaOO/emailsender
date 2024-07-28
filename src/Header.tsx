import React from 'react';

import { MenuOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

import { PlainSubmitButton } from './components/Button/FormSubmitButton';
import useSendMail from './hooks/useSendMail';

interface IHeader {
  onMenuClick: (...args: any) => void;
  emailContent: string;
}

const Header: React.FC<IHeader> = ({ onMenuClick, emailContent }) => {
  const { submitCredentials, loading: sendEmailLoading } = useSendMail();
  const handleSubmitMail = () => {
    submitCredentials(emailContent);
  };

  return (
    <Container>
      <MenuLogoArea>
        <HamburgerStyle onClick={onMenuClick}>
          <MenuOutlined />
        </HamburgerStyle>
        SendMail
      </MenuLogoArea>
      <PlainSubmitButton
        className="small"
        onClick={handleSubmitMail}
        loading={sendEmailLoading}
      >
        Send Mail
      </PlainSubmitButton>
    </Container>
  );
};

export default Header;

const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.mainColor};
  height: var(--header-height);
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-left: 16px;
  padding-right: 16px;
`;

const MenuLogoArea = styled.div`
  display: flex;
  font-size: 28px;
  font-weight: 900;
  gap: 16px;
  align-items: center;
  color: white;
`;

const HamburgerStyle = styled.div`
  cursor: pointer;
`;
