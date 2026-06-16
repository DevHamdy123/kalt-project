"use client";

import { useState, useEffect } from "react";

export default function TypewriterEffect() {
  const [displayText, setDisplayText] = useState("KALT..");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = "KALT..";
    const timeout = setTimeout(
      () => {
        if (isDeleting) {
          setDisplayText((prev) => prev.slice(0, -1));
          if (displayText === "") setIsDeleting(false);
        } else {
          setDisplayText(fullText.substring(0, displayText.length + 1));
          if (displayText === fullText) {
            setTimeout(() => setIsDeleting(true), 2000);
            return;
          }
        }
      },
      isDeleting ? 100 : 200,
    );

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return <span>{displayText}</span>;
}
