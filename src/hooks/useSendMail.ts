import axios from 'axios';
import FormData from 'form-data';
import { useContext, useState } from 'react';
import toast from 'react-hot-toast';

import { MailgunContext } from '../context/MailgunContext';
import { MailgunDataType } from '../models/mailgun.model';

type ReqConfig = MailgunDataType & { html: string };

const useSendMail = () => {
  const [loading, setLoading] = useState(false);
  const mailgunContext = useContext(MailgunContext);

  const setSendMailSuccess = (res: any) => {
    toast.success(`success -- > ${JSON.stringify(res)}`);
  };

  const onSendMailError = (err: any) => {
    console.log('onLoginError');
    toast.error(err?.response?.data?.message ?? 'Something went wrong');
  };

  const submitCredentials = (html: string) => {
    const reqConfig: ReqConfig = {
      apiKey: mailgunContext?.mailgunCredentials.apiKey ?? '',
      sandBoxUrl: mailgunContext?.mailgunCredentials.sandBoxUrl ?? '',
      from: mailgunContext?.mailgunCredentials.from ?? '',
      to: mailgunContext?.mailgunCredentials.to ?? '',
      subject: mailgunContext?.mailgunCredentials.subject ?? '',
      html,
    };

    request(reqConfig, setSendMailSuccess, setLoading, onSendMailError);
  };

  return {
    loading,
    submitCredentials,
  };
};

export default useSendMail;

const request = async (
  reqConfig: ReqConfig,
  successFn: (...arg: any) => void,
  loadinFn: (...arg: any) => void,
  errorFn: (...arg: any) => void
) => {
  const form = new FormData();
  form.append('from', `Via sendmail.com by ${reqConfig.from}`);
  form.append('to', reqConfig.to);
  form.append('subject', reqConfig.subject);
  form.append('html', reqConfig.html);

  try {
    const response = await axios.post(
      `https://api.mailgun.net/${reqConfig.sandBoxUrl}/messages`,
      form,
      {
        auth: {
          username: 'api',
          password: reqConfig.apiKey,
        },
        headers: { 'Content-Type': 'multipart/form-data' },
      }
    );
    console.log(response.data);
    successFn(response.data);
    loadinFn(true);
  } catch (error) {
    console.error(error);
    errorFn(error);
    loadinFn(false);
  }
};
