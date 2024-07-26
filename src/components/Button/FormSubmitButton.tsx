import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';
import styled from '@emotion/styled';

interface IFormSubmitButton {
  loading?: boolean;
  children: string;
  className?: string;
  disabled?: boolean;
  // onClick?: (...args: any) => any;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

export const FormSubmitButton: React.FC<IFormSubmitButton> = ({
  loading,
  children,
  className,
  disabled,
  onClick,
}) => {
  return (
    <FormSubmitBtn
      disabled={disabled}
      className={className ? className : ''}
      type="submit"
      onClick={onClick}
    >
      {loading && <LoadingOutlined />}
      {children}
    </FormSubmitBtn>
  );
};

export const FormSubmitBtn = styled.button`
  border: 1px solid red;
  border-radius: 8px;
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
  background-color: red;
  height: fit-content;
  width: fit-content;
  cursor: pointer;

  &:hover {
    background-color: red;
  }

  &:disabled,
  &.disabled:hover {
    color: yellow;
    background-color: green;
    border-color: blue;
    cursor: not-allowed;
  }
`;
