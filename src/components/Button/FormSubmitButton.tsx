import { useFormikContext } from 'formik';
import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

interface IFormSubmitButton {
  loading?: boolean;
  children: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const FormSubmitButton: React.FC<IFormSubmitButton> = ({
  loading,
  children,
  className,
}) => {
  const { dirty, isValid } = useFormikContext<any>();
  return (
    <SubmitBtn
      className={className ? className : ''}
      type="submit"
      disabled={isValid && dirty ? false : true}
    >
      {loading && <LoadingOutlined />}
      {children}
    </SubmitBtn>
  );
};

export const PlainSubmitButton: React.FC<IFormSubmitButton> = ({
  loading,
  children,
  className,
  onClick,
}) => {
  return (
    <SubmitBtn
      className={className ? className : ''}
      type="submit"
      onClick={onClick}
    >
      {loading && <LoadingOutlined />}
      {children}
    </SubmitBtn>
  );
};

export const SubmitBtn = styled.button`
  border: 1px solid transparent;
  font-size: 16px;
  font-weight: 600;
  padding: 13px 24px;
  line-height: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-top: 24px;

  color: white;
  background-color: ${({ theme }) => theme.palette.buttonColor};
  height: fit-content;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: ${({ theme }) => theme.palette.buttonColor};
  }

  &:disabled,
  &.disabled:hover {
    background-color: ${({ theme }) => theme.palette.secondaryColor};
    color: ${({ theme }) => theme.palette.disableColor};
    cursor: not-allowed;
  }

  &.small {
    padding: 6px 24px;
    margin-top: 0px;
    /* background-color: transparent;
    border: 4px solid ${({ theme }) => theme.palette.buttonColor}; */
  }
`;
