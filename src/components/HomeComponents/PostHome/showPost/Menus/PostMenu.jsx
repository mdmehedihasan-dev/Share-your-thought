/* eslint-disable react/prop-types */

const PostMenu = ({icon,title}) => {
    const Icon = icon 
  return (
    <div>
        <div className="flex items-center mb-5 gap-x-3 text-secondary_bg">
            <Icon/>
            <p>{title}</p>
        </div>
    </div>
  )
}

export default PostMenu