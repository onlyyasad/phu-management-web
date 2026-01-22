import React from "react";
import {
  FormProvider,
  useForm,
  type FieldValues,
  type SubmitHandler,
} from "react-hook-form";

type TFormConfig = Record<string, any>;

type TProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: React.ReactNode;
  defaultValues?: Record<string, any>;
};

const PHForm: React.FC<TProps> = ({ onSubmit, children, defaultValues }) => {
  const formConfig: TFormConfig = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default PHForm;
