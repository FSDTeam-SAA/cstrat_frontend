import { cn } from '@/lib/utils';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';
import { ReactNode, useEffect } from 'react';

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, y: -50 },
  visible: { opacity: 1, y: 0 },
};

interface Props {
  open: boolean;
  onOpenChange: (val: boolean) => void;
  className: string;
  children: ReactNode;
}

export default function CstratModal({ open, onOpenChange, className, children }: Props) {
  // Close modal on escape key
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onOpenChange(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onOpenChange]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          onClick={() => onOpenChange(false)}
        >
          <motion.div
            className={cn(
              'relative mt-5 w-full max-w-[90%] rounded-2xl bg-white p-4 shadow-xl sm:max-w-[600px] md:max-w-[700px] md:p-6',
              className,
            )}
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="absolute right-3 top-3 rounded-full p-2 hover:bg-gray-100 focus:outline-none focus:ring focus:ring-gray-200"
              onClick={() => onOpenChange(false)}
              aria-label="Close Modal"
            >
              <X className="h-5 w-5" />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
