import { VButton } from "@/components/atoms/VButton"
import { ICustomKnobProps } from "./additional"


interface IVideoFileViewerProps extends ICustomKnobProps {
  propName?: string
}

export const VideoFileViewer = ({propName, value, isValid, onChange, errorMessage}: IVideoFileViewerProps) => {
  return(
    <div className="flex flex-col">
      <input type='file'></input>
      <VButton primary>Upload</VButton>
    </div>
  )
}