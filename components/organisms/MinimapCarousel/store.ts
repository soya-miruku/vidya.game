import { createRef } from "react"

interface IState {
  sections:number,
  pages:number,
  zoom:number,
  ref: any,
  top:any
}

const state: IState = {
  sections: 6,
  pages: 5,
  zoom: 75,
  ref: createRef(),
  top: createRef()
}

export default state
