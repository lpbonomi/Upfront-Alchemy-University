"use client";

import React, {
  useState,
  useEffect,
  type ReactElement,
  type ReactNode,
} from "react";

export default function ClientOnly({
  children,
}: {
  children: ReactNode;
}): ReactElement | null {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }

  return <div className="inline">{children}</div>;
}
