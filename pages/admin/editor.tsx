import React from 'react'
import Head from 'next/head'
import { Admin, Editor } from 'react-bricks'
import { StyleSheetManager } from 'styled-components'

const AdminEditor: React.FC = () => {
  return (
    <StyleSheetManager disableCSSOMInjection>
      <Admin>
        <Head>
          <title>Editor</title>
        </Head>
        <Editor />
      </Admin>
    </StyleSheetManager>
  )
}

export default AdminEditor
