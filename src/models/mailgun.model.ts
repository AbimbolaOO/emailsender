import * as Yup from 'yup';

export const MailgunSchema = Yup.object().shape({
  apiKey: Yup.string().min(8).required('Please! provide a your api key'),
  sandBoxUrl: Yup.string().min(4).required('Please! Enter sandbox url'),
  from: Yup.string().min(2).required('Please! Enter form information'),
  to: Yup.string().email().required('Please! Enter Email'),
  subject: Yup.string().min(2).required('Please! Provide a subject'),
});

export type MailgunDataType = Yup.InferType<typeof MailgunSchema>;

export type IMailgunInitialValues = {
  apiKey: string;
  sandBoxUrl: string;
  from: string;
  to: string;
  subject: string;
};

export const mailgunInitialValues: IMailgunInitialValues = {
  apiKey: '',
  sandBoxUrl: '',
  from: '',
  to: '',
  subject: '',
};
