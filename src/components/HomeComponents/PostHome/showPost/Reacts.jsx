/* eslint-disable react/prop-types */
import { emojiReacts } from "./emojiReacts"

const Reacts = ({setShow}) => {
  return (
    <div  onMouseOver={()=> setTimeout(()=>{
        setShow(true)
      },500)    
      }
      onMouseLeave={()=>setTimeout(()=>{
        setShow(false)
      },500)} 
     className="flex justify-center">
        {emojiReacts.map((react,i)=>(
            <img className="cursor-pointer w-11 h-11" key={i} src={react.image} />
        ))}
    </div>
  )
}

export default Reacts