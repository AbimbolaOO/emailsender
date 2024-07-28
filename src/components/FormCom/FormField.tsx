import { useField } from 'formik';
import React from 'react';

import styled from '@emotion/styled';

export interface IInputField {
  label?: any;
  id?: string;
  name: string;
  type: string;
  placeholder?: string;
  children?: any;
  className?: string;
}

export const TextInputField: React.FC<IInputField> = ({
  label,
  className,
  ...props
}) => {
  const [field, meta] = useField(props);

  return (
    <InputWrapper className={className}>
      <InputLabel htmlFor={props.name || props.id}>{label}</InputLabel>
      <Input {...field} {...props} />
      {meta.touched && meta.error && (
        <FieldErrorInfo>{meta.error}</FieldErrorInfo>
      )}
    </InputWrapper>
  );
};

export const FieldErrorInfo = styled.div`
  font-size: 14px;
  color: red;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2px;
`;

const InputLabel = styled.label`
  font-weight: 500;
  font-size: 14px;
  color: white;
`;

const Input = styled.input`
  border: 4px solid ${({ theme }) => theme.palette.buttonColor};
  color: #2a0134;
  padding: 12px;
  text-align: left;
  font-weight: 600;

  font-size: 14px;
  height: 50px;
  cursor: text;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.palette.buttonColor};
  }

  &:hover {
    cursor: text;
  }

  &::placeholder {
    color: #9ca3af;
    opacity: 1;
    font-weight: 600;
  }
`;
