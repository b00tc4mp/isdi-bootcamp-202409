import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const words = ["vet", "pet trainer", "grooming", "boarding", "petsitter"];

export default function RotatingTextComponent() {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState(0);
  const measureRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const el = measureRef.current;
    if (el) {
      const resizeObserver = new ResizeObserver(() => {
        setWidth(el.getBoundingClientRect().width);
      });
      resizeObserver.observe(el);
      setWidth(el.getBoundingClientRect().width);
      return () => resizeObserver.disconnect();
    }
  }, [index]);

  return (
    <div className="flex items-center justify-center gap-3 text-xl font-semibold relative mb-8">

      <span className="text-[#006D77]">I'm looking for a...</span>

      <div
        className="relative overflow-hidden rounded-md bg-[#006D77] text-white px-3 transition-all duration-300 flex items-center justify-center"
        style={{ width: width, minHeight: "2.5rem" }}
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={words[index]}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 400,
            }}
            className="absolute left-0 w-full text-center"
            style={{ top: "10%", transform: "translateY(-10%)" }}
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* Invisible measurer */}
      <span
        ref={measureRef}
        className="absolute opacity-0 pointer-events-none px-3 font-semibold text-xl"
        style={{ whiteSpace: "nowrap" }}
      >
        {words[index]}
      </span>
    </div>
  );
}


export { RotatingTextComponent };
