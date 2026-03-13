import { useEffect, useState } from "react";
import { getCountry } from "../utils/getCountry";

export function useIsRussianCountry() {
  const [country, setCountry] = useState<string | null>(null);

  useEffect(() => {
    const checkCountry = async () => {
      setCountry(await getCountry());
    };

    checkCountry();
  }, []);

  return country === `RUS`;
}
