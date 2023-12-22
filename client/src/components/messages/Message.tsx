"use client"
const Message = ({message, time}: {message: string, time: string}) => {
  return (
    <div>
        {time}
        {message}
    </div>
  )
}

export default Message