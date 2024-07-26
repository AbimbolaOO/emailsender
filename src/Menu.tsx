import React from 'react';

import styled from '@emotion/styled';

import { FormSubmitBtn } from './components/Button/FormSubmitButton';
import { FormComponent } from './components/FormCom/FormComponent';
import { TextInputField } from './components/FormCom/FormField';
import { mailgunInitialValues, MailgunSchema } from './models/mailgun.model';

interface IMenu {
  revealMenu: boolean;
}

const Menu: React.FC<IMenu> = ({ revealMenu }) => {
  const handleOnFormSubmit = () => {
    console.log('LOL');
  };

  const onSubitBtn = () => {};

  return (
    <Container className={revealMenu ? 'reveal' : ''}>
      <FormComponent
        initialValues={mailgunInitialValues}
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
        <FormSubmitBtn type="submit" onClick={onSubitBtn}>
          Save
        </FormSubmitBtn>
      </FormComponent>
    </Container>
  );
};

export default Menu;

const Container = styled.div`
  padding: 16px;
  background-color: rebeccapurple;
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
