import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState, useRef } from "react";

const words = ["Care","Sitter","Trainer"];

export default function RotatingLoginText() {
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
    <div className="flex items-center justify-center gap-1 text-3xl font-semibold relative mb-8">

  <span className="text-[#006D77]">Pet</span>

  <div
    className="relative overflow-hidden rounded-md bg-[#006D77] text-white px-4 transition-all duration-300 flex items-center justify-center"
    style={{ width: width, minHeight: "3.5rem" }}
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
        className="w-full text-center"
        style={{ whiteSpace: "nowrap" }}
      >
        {words[index]}
      </motion.span>
    </AnimatePresence>
  </div>

  <span
    ref={measureRef}
    className="absolute opacity-0 pointer-events-none px-4 font-semibold text-3xl whitespace-nowrap"
  >
    {words[index]}
  </span>
</div>

  );
}

export { RotatingLoginText };
