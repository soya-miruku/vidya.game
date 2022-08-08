import { ICustomKnobProps } from "./additional"
import { FileUpload } from "./IPFSUpload/index"

export interface IFPSFileUploaderProps extends ICustomKnobProps {
  acceptOnly: string
}

export const FpsFileUploader = ({value, isValid, onChange, errorMessage, acceptOnly}: IFPSFileUploaderProps) => {
  return(
    <div className="flex flex-col">
      <input value={value} onChange={(e) => {
        onChange(e.target.value)
      }} style={{
        backgroundColor: isValid ? '#fff' : '#FF4365',
        borderRadius: '5px',
        border: 'none',
        padding: '10px',
        fontSize: '1rem',
      }}></input>
      <FileUpload acceptOnly={acceptOnly} setUrl={onChange} />
    </div>
  )
}