import { createContext, useEffect, useState } from 'react';

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
  loading: boolean;
}

export const MailgunContext = createContext<IMailgunContext | null>(null);

export const MailgunProvider: React.FC<IMailgunProvider> = ({ children }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const data = localStorage.getItem('config');
    let parseData: IMailgunInitialValues = mailgunInitialValues;
    if (data) {
      parseData = JSON.parse(data);
      setMailgunCredentials(parseData);
    }
    setLoading(false);
  }, []);

  const [mailgunCredentials, setMailgunCredentials] =
    useState<IMailgunInitialValues>(mailgunInitialValues);

  useEffect(() => {
    if (Object.values(mailgunCredentials).every((value) => value !== '')) {
      localStorage.setItem('config', JSON.stringify(mailgunCredentials));
    }
  }, [mailgunCredentials]);

  return (
    <MailgunContext.Provider
      value={{
        mailgunCredentials,
        setMailgunCredentials,
        loading,
      }}
    >
      {children}
    </MailgunContext.Provider>
  );
};
