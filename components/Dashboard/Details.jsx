import React from "react";

const Line = ({ name, value }) => {
  return (
    <div className="w-[90%] my-4 border-b-[0.5px] flex-wrap flex justify-between items-center">
      <span className="  text-slate-600  inline">{name}</span>
      <span className="w-[300px] font-bold text-slate-800">{value}</span>
    </div>
  );
};
const Details = ({ data }) => {
  console.log(data);
  const List = [
    "First Name",
    "Last Name",
    "Telephone No",
    "Email Address",
    "Personal Address",
    "Postal Code",
  ];
  const Objects = ["FirstName", "LastName", "TEL", "EMAIL", "ADDR", "POSTCODE"];
  const profile = data[0];
  return (
    <div className="flex m-auto flex-col p-3 items-center">
      {List.map((item, i) => {
        return <Line name={item} value={profile[Objects[i]]} />;
      })}
    </div>
  );
};

export default Details;
