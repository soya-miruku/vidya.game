import { ICustomKnobProps } from "./additional"
import { FileUpload } from "./IPFSUpload/index"

export const VideoFileViewer = ({value, isValid, onChange, errorMessage}: ICustomKnobProps) => {
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
      <FileUpload setUrl={onChange} />
    </div>
  )
}