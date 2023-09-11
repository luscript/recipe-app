import React, { useEffect } from "react";
import RecipeFormInput from "./RecipeFormInput";
import { CookingTimeI } from "../domain/CookingTime";

interface CookingTimeProps {
  onCookingTimeChange: (cookingTime: CookingTimeI) => void;
  value?: CookingTimeI;
}

enum TimeUnit {
  hours = "hours",
  minutes = "minutes",
}

const CookingTime: React.FC<CookingTimeProps> = ({ onCookingTimeChange, value }) => {
  const [cookingTime, setCookingTime] = React.useState<CookingTimeI>({
    hours: 0,
    minutes: 0,
  });

  useEffect(() => {
    onCookingTimeChange(cookingTime);
  }, [cookingTime]);

  useEffect(() => {
    if (value) {
      setCookingTime(value);
    }
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    value: TimeUnit
  ) => {
    setCookingTime({ ...cookingTime, [value]: parseFloat(e.target.value) });
  };

  return (
    <div className="mt-6 flex flex-col mb-6">
      <p className="mb-2">Cooking Time</p>
      <div className="flex items-center gap-4">
        <input
          type="number"
          placeholder="Hours"
          onChange={(event) => handleChange(event, TimeUnit.hours)}
          className="text-black"
          required
          value={cookingTime.hours ?? ""}
        />
        <p>:</p>
        <input
          type="number"
          placeholder="Minutes"
          onChange={(event) => handleChange(event, TimeUnit.minutes)}
          className="text-black"
          required
          value={cookingTime.minutes ?? ""}
        />
      </div>
    </div>
  );
};

export default CookingTime;
