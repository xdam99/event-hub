// FRONT - src/components/ReadMoreText.tsx
import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { TextService } from "../services/text.service";

type ReadMoreTextProps = {
    text: string;
    maxChars?: number;
    className?: string;
    moreLabel?: string;
    lessLabel?: string;
};

export const ReadMoreText: React.FC<ReadMoreTextProps> = ({
    text,
    maxChars = 100,
    className,
    moreLabel = "Lire plus",
    lessLabel = "Lire moins",
    }) => {
    const [expanded, setExpanded] = useState(false);

    const truncated = useMemo(
        () => TextService.truncateChars(text, maxChars),
        [text, maxChars]
    );

    const showToggle = useMemo(
        () => TextService.needsTruncationChars(text, maxChars),
        [text, maxChars]
    );

    const displayedText = expanded ? text : truncated;

    return (
        <div className={className}>
        <motion.div layout transition={{ type: "spring", stiffness: 260, damping: 28 }}>
            <AnimatePresence mode="wait">
            <motion.p
                key={expanded ? "expanded" : "collapsed"}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.18 }}
                style={{ margin: 0 }}
            >
                {displayedText}
            </motion.p>
            </AnimatePresence>
        </motion.div>

        {showToggle && (
            <button
            type="button"
            className="read-more pb-5"
            onClick={() => setExpanded((v) => !v)}
            >
            {expanded ? lessLabel : moreLabel}
            </button>
        )}
        </div>
    );
};
