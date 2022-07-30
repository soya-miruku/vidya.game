import React, { useState } from 'react'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import { VLabel } from '@/components/atoms/VLabel'

const ipfs = ipfsHttpClient({ host: 'ipfs.infura.io', port: 5001, protocol: 'https' })

export const FileUpload = ({ setUrl, acceptOnly }) => {
  const [file, setFile] = useState<any>({})
  const [fileUrl, setFileUrl] = useState('')
  const [loading, setLoading] = useState(false)
  const [uploaded, setUploaded] = useState(false)

  const uploadFile = async (e) => {
      setLoading(true)
      e.preventDefault()

      try {
          const added = await ipfs.add(file)
          const url = `https://ipfs.infura.io/ipfs/${added.path}`;
          setFileUrl(url)
          setUrl(url)
          setUploaded(true)
      } catch (err) {
          console.log('Error uploading the file : ', err)
      }
      setLoading(false)
  }

  const preUpload = (e) => {
      if (e.target.value !== '') {
          setFile(e.target.files[0])
      } else {
          setFile({})
      }
  }

  const fileAndUploadButton = () => {
      if (file.name) {
          if (!loading) {
              return (
                  <div>
                      <h5>
                          {file.name} <VLabel>{file.size} kb</VLabel>
                      </h5>

                      {uploaded ? (
                          <h5>
                              ✅{' '}
                              <a href={fileUrl} target='_blank'rel='noopener noreferrer'>File </a>
                              Uploaded Successfully
                          </h5>
                      ) : (
                          <button style={{
                            backgroundColor: '#FF4365',
                            color: '#fff',
                            padding: '10px',
                            borderRadius: '5px',
                            border: 'none',
                            fontSize: '1.2rem',
                          }} type='submit'>Upload File</button>
                      )}
                  </div>
              )
          } else {
              return (
                  <div>
                      <h4>Uploading File...</h4>
                  </div>
              )
          }
      }
  }

  return (
      <div>
          <form onSubmit={uploadFile}>
              <input
                accept={acceptOnly || 'image/*'}
                type='file'
                name='file'
                id='file'
                onChange={preUpload}
                required
              />
              {fileAndUploadButton()}
          </form>
      </div>
  )
}