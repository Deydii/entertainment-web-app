import { motion } from 'framer-motion';

const loadingContainerVariants = {
  start: {
    transition: {
      staggerChildren: 0.2,
    },
  },
  end: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const loadingCircleVariants = {
  start: {
    y: "0%",
  },
  end: {
    y: "60%",
  },
};

const Loader = () => {
  return (
    <div className="h-screen flex justify-center mt-16">
      <motion.div
        className="flex justify-around w-16 h-16"
        variants={loadingContainerVariants}
        initial="start"
        animate="end"
      >
        <motion.span
          className="block w-4 h-4 rounded-lg bg-blue-200"
          variants={loadingCircleVariants}
          transition={{ duration : 1, repeat : Infinity, ease: 'easeInOut' }}
        ></motion.span>
        <motion.span
          className="block w-4 h-4 rounded-lg bg-blue-200"
          variants={loadingCircleVariants}
          transition={{duration : 1, repeat : Infinity, ease: 'easeInOut'}}
        ></motion.span>
        <motion.span
          className="block w-4 h-4 rounded-lg bg-blue-200"
          variants={loadingCircleVariants}
          transition={{duration : 1, repeat : Infinity, ease: 'easeInOut'}}
          ></motion.span>
      </motion.div>
    </div>
  )
};

export default Loader;