import FormGenerator from '@/components/forms/form-generator';
import { USER_REGISTRATION_FORM } from '@/constants/forms';
import React from 'react'
import { FieldErrors,FieldValues, UseFormRegister } from 'react-hook-form';

type Props = {
    errors:FieldErrors<FieldValues>
    register:UseFormRegister<FieldValues>
}

const AccountDetailsForm = ({errors,register}: Props) => {
  return (
    <>
    <h2 className='text-gravel md:text-4xl font-bold'>
        Account details
    </h2>
    <p className='text-iridium md:text-sm'>Enter your Email and Password</p>
    {USER_REGISTRATION_FORM.map((feild)=>(
        <FormGenerator
        key={feild.id}
        {...feild}
        errors={errors}
        register={register}
        name={feild.name}
        />
    ))}
    </>
  )
}
export default  AccountDetailsForm;