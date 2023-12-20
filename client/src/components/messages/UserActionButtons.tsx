"use client";
const UserActionButtons = () => {
  return (
    <div className="flex flex-col gap-4 pt-[4rem]">
      <Button title={"Delete all messages"} styles="bg-[red]/70" />
      <Button title={"Log out"} styles="bg-primary" />
      <Button title={"Delete account"} styles="bg-[red]" />
    </div>
  );
};
function Button({
  title,
  onClick,
  styles,
}: {
  title: string;
  onClick?: () => void;
  styles: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full grid place-items-center text-white py-3 shadow-lg rounded-md ${styles}`}
    >
      {title}
    </button>
  );
}
export default UserActionButtons;
