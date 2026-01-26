import { Form } from "antd";
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
  resolver?: any;
  defaultValues?: Record<string, any>;
};

const PHForm: React.FC<TProps> = ({
  onSubmit,
  children,
  resolver,
  defaultValues,
}) => {
  const formConfig: TFormConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  const methods = useForm(formConfig);
  const submit: SubmitHandler<FieldValues> = (data) => {
    onSubmit(data);
    methods.reset();
  };
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(submit)}>
        {children}
      </Form>
    </FormProvider>
  );
};

export default PHForm;
