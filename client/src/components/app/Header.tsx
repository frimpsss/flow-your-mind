"use client";
const Header = ({ username }: { username?: string }) => {
  return (
    <div className="px-4 py-6 bg-primary text-white flex items-center justify-between">
      <h4 className="text-[1.2rem]">Flow your mind</h4>
      {username && <p>Hi Djangz</p>}
    </div>
  );
};

export default Header;
