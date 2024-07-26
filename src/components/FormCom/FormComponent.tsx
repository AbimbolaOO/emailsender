import { Form, Formik } from 'formik';

import styled from '@emotion/styled';

interface IFormComponent {
  initialValues: any;
  schema: any;
  onSubmit: any;
  children: any;
  className?: any;
}

export const FormComponent: React.FC<IFormComponent> = ({
  initialValues,
  schema,
  onSubmit,
  children,
  className,
}) => {
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={schema}
      onSubmit={onSubmit}
    >
      <StyledForm className={className}>{children}</StyledForm>
    </Formik>
  );
};

const StyledForm = styled(Form)`
  width: 100%;
  display: grid;
  gap: 12px;

  @media (max-width: 480px) {
  }
`;
