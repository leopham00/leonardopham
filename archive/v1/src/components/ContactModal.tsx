"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillSubject?: string;
}

export default function ContactModal({
  isOpen,
  onClose,
  prefillSubject = "",
}: ContactModalProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState(prefillSubject);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setSubject(prefillSubject);
  }, [prefillSubject]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // For now, construct mailto
    const mailtoBody = `Name: ${name}%0AEmail: ${email}${phone ? `%0APhone: ${phone}` : ""}%0A%0A${encodeURIComponent(message)}`;
    window.open(
      `mailto:leopham00@gmail.com?subject=${encodeURIComponent(subject)}&body=${mailtoBody}`,
      "_blank"
    );
    onClose();
  };

  const inputClasses =
    "w-full bg-transparent border-b border-border py-3 text-[14px] text-foreground placeholder:text-muted/50 focus:border-foreground focus:outline-none transition-colors duration-200";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-[80] bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          >
            <div
              className="bg-white w-full max-w-[520px] max-h-[90vh] overflow-y-auto p-8 md:p-10 relative"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close */}
              <button
                onClick={onClose}
                className="absolute top-6 right-6 text-muted hover:text-foreground transition-colors"
                aria-label="Close"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <line x1="1" y1="1" x2="15" y2="15" />
                  <line x1="15" y1="1" x2="1" y2="15" />
                </svg>
              </button>

              <h2 className="text-[13px] font-medium tracking-[0.04em] text-foreground mb-1">
                Get in touch
              </h2>
              <p className="text-[13px] text-muted mb-8">
                leopham00@gmail.com
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <input
                    type="text"
                    placeholder="Name *"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    placeholder="Email *"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    placeholder="Phone (optional)"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className={inputClasses}
                  />
                </div>
                <div>
                  <textarea
                    placeholder="Message *"
                    required
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={`${inputClasses} resize-none`}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 text-[13px] font-medium tracking-[0.04em] bg-foreground text-white hover:bg-foreground/85 transition-colors duration-200"
                >
                  Send message
                </button>
              </form>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
