import { createContext, useState } from 'react';

import {
  IMailgunInitialValues,
  mailgunInitialValues,
} from '../models/mailgun.model';

interface IMailgunProvider {
  children: React.ReactNode;
}

interface IMailgunContext {
  setMailgunCredentials: (credential: IMailgunInitialValues) => void;
  mailgunCredentials: IMailgunInitialValues;
}

export const MailgunContext = createContext<IMailgunContext | null>(null);

export const MailgunProvider: React.FC<IMailgunProvider> = ({ children }) => {
  const [mailgunCredentials, setMailgunCredentials] =
    useState<IMailgunInitialValues>(mailgunInitialValues);

  return (
    <MailgunContext.Provider
      value={{
        mailgunCredentials,
        setMailgunCredentials,
      }}
    >
      {children}
    </MailgunContext.Provider>
  );
};
