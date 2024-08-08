"use server";
import InfoBar from '@/components/infobar'
import BillingSettings from '@/components/settings/billing-settings/page'
import ChangePassword from '@/components/settings/change-password/page'
import DarkMode from '@/components/settings/dark-mode/page'

import React from 'react'

type Props = {}

const Settings = (props: Props) => {
  return (
    <>
    <InfoBar/>
    <BillingSettings />
    <DarkMode />
    <ChangePassword />
    </>
  )
}

export default Settings