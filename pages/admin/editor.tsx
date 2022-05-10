import React from 'react'
import Head from 'next/head'
import { Admin, Editor } from 'react-bricks'

const AdminEditor: React.FC = () => {
  return (
    <Admin>
      <Head>
        <title>Editor</title>
      </Head>
      <div className='w-full bg-green-400'>
        <Editor />
      </div>
    </Admin>
  )
}

export default AdminEditor
