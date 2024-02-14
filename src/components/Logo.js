import { Image } from "react-native"
const image = require("../../assets/images/logo.png")
export default function Logo() {
  return (
    <Image source={image} className="mt-24 w-24 h-24"/>
    
  )
}