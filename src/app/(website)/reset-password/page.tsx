import ResetPassword from '@/components/auth/ResetPassword'
import React from 'react'
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResetPassword/>
      </Suspense>
  )
}

export default page
