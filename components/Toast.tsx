"use client";

import { useEffect, useState } from "react";

let toastTimer: ReturnType<typeof setTimeout>;
let toastSetter: ((msg: string) => void) | null = null;

export function showToast(msg: string) {
  if (toastSetter) toastSetter(msg);
}

export default function Toast() {
  const [msg, setMsg] = useState("");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    toastSetter = (m: string) => {
      setMsg(m);
      setVisible(true);
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => setVisible(false), 2200);
    };
    return () => { toastSetter = null; };
  }, []);

  return (
    <div className={`toast${visible ? " show" : ""}`}>
      <div className="toast-dot" />
      <span>{msg}</span>
    </div>
  );
}
