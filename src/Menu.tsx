import React, { useContext } from 'react';
import toast from 'react-hot-toast';

import styled from '@emotion/styled';

import { FormSubmitButton } from './components/Button/FormSubmitButton';
import PlaceHolderCard from './components/Card/PlaceHolderCard';
import { FormComponent } from './components/FormCom/FormComponent';
import { TextInputField } from './components/FormCom/FormField';
import { MailgunContext } from './context/MailgunContext';
import { MailgunDataType, MailgunSchema } from './models/mailgun.model';

interface IMenu {
  revealMenu: boolean;
}

const Menu: React.FC<IMenu> = ({ revealMenu }) => {
  const mailgunContext = useContext(MailgunContext);

  const handleOnFormSubmit = (values: MailgunDataType) => {
    mailgunContext?.setMailgunCredentials(values);
    toast.success('Credential saved.');
  };

  if (mailgunContext?.loading) {
    return <PlaceHolderCard className="purple-bg" />;
  }

  return (
    <Container className={revealMenu ? 'reveal' : ''}>
      <FormComponent
        initialValues={mailgunContext?.mailgunCredentials}
        schema={MailgunSchema}
        onSubmit={handleOnFormSubmit}
      >
        <TextInputField
          label="Api Key"
          name="apiKey"
          id="apiKey"
          type="text"
          placeholder=""
        />
        <TextInputField
          label="Sandbox URL"
          name="sandBoxUrl"
          id="sandBoxUrl"
          type="text"
          placeholder=""
        />
        <TextInputField
          label="From"
          name="from"
          id="from"
          type="text"
          placeholder=""
        />
        <TextInputField
          label="To"
          name="to"
          id="to"
          type="text"
          placeholder=""
        />
        <TextInputField
          label="Subject"
          name="subject"
          id="subject"
          type="text"
          placeholder=""
        />
        <FormSubmitButton>Save</FormSubmitButton>
      </FormComponent>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  padding: 16px;
  background-color: ${({ theme }) => theme.palette.mainColor};
  z-index: 1;
  width: var(--menu-width);
  height: calc(100vh - var(--header-height));
  position: absolute;

  transform: translateX(-320px);
  transition-property: transform;
  transition-duration: 0.3s;
  transform-origin: left;

  &.reveal {
    transform: translateX(0px);
  }
`;
