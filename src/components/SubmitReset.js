/* eslint-disable require-jsdoc */
import React, { useEffect } from 'react';
import { useForm, useFieldArray, Controller } from 'react-hook-form';

export default function SubmitReset() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitSuccessful },
  } = useForm({ defaultValues: { something: 'anything' } });

  const formState = useForm({ defaultValues: { something: 'anything' } });

  const onSubmit = (data) => {
    console.log(data);
  };

  useEffect(() => {
    register({ name: 'select' });
  }, [register]);

  React.useEffect(() => {
    if (formState.isSubmitSuccessful) {
      reset({ something: '' });
    }
  }, [formState, reset]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('something')} />
      <input type="submit" />
    </form>
  );
}
