import React from "react";
import {
  FieldValues,
  FormProvider,
  Resolver,
  SubmitHandler,
  useForm,
} from "react-hook-form";
// interface for form provider props
interface IFormProviderProps {
  children: React.ReactNode;
  onSubmit: SubmitHandler<FieldValues>;
  resolver?: Resolver;
  defaultValues?: Record<string, unknown>;
}
//
const WrapperForm = ({
  children,
  onSubmit,
  resolver,
  defaultValues,
}: IFormProviderProps) => {
  const formConfig: Partial<IFormProviderProps> = {};
  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  const methods = useForm(formConfig);

  const { handleSubmit, reset } = methods;
  const formSubmit = (data: FieldValues) => {
    onSubmit(data);
    reset();
  };
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(formSubmit)}>{children}</form>
    </FormProvider>
  );
};

export default WrapperForm;
