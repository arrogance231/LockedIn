import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, PhoneCall } from "lucide-react";
import { Button } from "@/components/ui/button";

function Hero() {
  const [titleNumber, setTitleNumber] = useState(0);
  const titles = useMemo(() => ["Han", "One"], []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0);
      } else {
        setTitleNumber(titleNumber + 1);
      }
    }, 2000);
    return () => clearTimeout(timeoutId);
  }, [titleNumber, titles]);

  return (
    <div className="w-full">
      <h1 className="flex text-5xl md:text-7xl max-w-2xl tracking-tighter text-center font-regular">
        <span className=" text-8xl font-poppins text-blue-500 font-extrabold">
          Bayani
        </span>
        <span className="relative flex w-full justify-center overflow-hidden text-center md:pb-4 md:pt-1">
          &nbsp;
          {titles.map((title, index) => (
            <motion.span
              key={index}
              className="absolute font-semibold text-8xl text-red- "
              initial={{ opacity: 0, y: "-100" }}
              transition={{ type: "spring", stiffness: 50 }}
              animate={
                titleNumber === index
                  ? {
                      y: 0,
                      opacity: 1,
                    }
                  : {
                      y: titleNumber > index ? -150 : 150,
                      opacity: 0,
                    }
              }
            >
              {title}
            </motion.span>
          ))}
        </span>
      </h1>
    </div>
  );
}

export { Hero };
