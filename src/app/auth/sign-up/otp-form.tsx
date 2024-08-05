import OTPINPUT from '@/components/otp'
import React from 'react'

type Props = {
    setOtp:React.Dispatch<React.SetStateAction<string>>
    onOtp:string
}

const OtpForm = ({onOtp,setOtp}: Props) => {
  return (
    <>
    <h2 className='text-gravel md:text-4xl *:
    font-bold
    '>Enter Otp</h2>
    <p className='text-iridium md:text-sm'>
        Enter the one Time password that was sent to your email.
    </p>
    <div className='w-full justify-center flex py-5'>
        <OTPINPUT
        otp={onOtp}
        setOtp={setOtp}
        />
    </div>
    </>
  )
}

export default OtpForm