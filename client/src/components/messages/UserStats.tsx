import React from "react";

const UserStats = () => {
  return (
    <div className="mt-2">
      {/* <h4 className="text-[1.5rem] text-primary">Statistics</h4> */}
      <p className="text-[1.2rem]">
        Date joined:{" "}
        <span className="text-primary font-medium">13th Jan 2023</span>
      </p>
      <p className="text-[1.2rem]">
        Total messages:{" "}
        <span className="text-primary font-medium">120</span>
      </p>
    </div>
  );
};

export default UserStats;
