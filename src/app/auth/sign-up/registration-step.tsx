"use client"
import { useAuthContextHook } from '@/context/use-auth-context';
import React, { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import TypeSelectionForm from './type-selection-form';
import { Spinner } from '@/components/spinner';
import dynamic from 'next/dynamic';
const DetailForm=dynamic(()=>import("./account-details-form"),{
  ssr:false,
  loading:Spinner
});
const OtpForm=dynamic(()=>import("./otp-form"),{
  ssr:false,
  loading:Spinner
})
type Props = {}

const RegistrationStep= (props: Props) => {
  const {register,formState:{errors},setValue}=useFormContext();
  const {currentStep}=useAuthContextHook();
  const[onOtp,setOnOtp]=useState<string>('');
  const[onUserType,setOnUserType]=useState<'owner'|'student'>('owner');
  setValue('otp',onOtp);
  switch (currentStep){
    case 1:
        return <TypeSelectionForm
          register={register}
          userType={onUserType}
          setUserType={setOnUserType}
        />
    case 2:
      return <DetailForm
      errors={errors}
      register={register}
      />
    case 3:
      return (
        <OtpForm
         onOtp={onOtp}
         setOtp={setOnOtp}
        />
      )  
  }  
  return (
    <div>registration-step</div>
  )
}

export default RegistrationStep;