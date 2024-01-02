"use client";
const Message = ({ message, time }: { message: string; time: string }) => {
  return (
    <div className="p-4">
      <p>{time}</p>
      <p>{message}</p>
    </div>
  );
};

export default Message;
