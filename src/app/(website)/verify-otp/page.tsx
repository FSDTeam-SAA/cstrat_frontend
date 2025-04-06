import VerifyOtp from '@/components/auth/Verify-otp'
import React from 'react'
import { Suspense } from "react";

const page = () => {
  return (
   <Suspense fallback={<div>Loading...</div>}>
    <VerifyOtp/>
    </Suspense>
  )
}

export default page
