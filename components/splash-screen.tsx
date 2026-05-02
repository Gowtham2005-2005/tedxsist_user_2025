"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function LoadingWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [isClient, setIsClient] = useState(false);
  const [progress, setProgress] = useState(0);
  const [matrixText, setMatrixText] = useState("");

  useEffect(() => {
    setIsClient(true);
    const hasLoaded = sessionStorage.getItem("hasLoaded") !== "true";
    setLoading(hasLoaded);
  }, []);

  useEffect(() => {
    if (!loading) {
      return;
    }

    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
    const progressInterval: NodeJS.Timeout = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(matrixInterval);
          setTimeout(() => {
            setLoading(false);
            sessionStorage.setItem("hasLoaded", "true");
          }, 500);
          return 100;
        }
        return prev + 1;
      });
    }, 30);

    const matrixInterval: NodeJS.Timeout = setInterval(() => {
      setMatrixText(
        Array.from({ length: 8 }, () => characters.charAt(Math.floor(Math.random() * characters.length))).join("")
      );
    }, 50);

    return () => {
      clearInterval(progressInterval);
      clearInterval(matrixInterval);
    };
  }, [loading]);

  if (!isClient) return <>{children}</>;

  if (loading && pathname === "/" ) {
    return (
      <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black">
        <div className="relative w-48 h-48 mb-8">
          <Image src="/logo.png" alt="TEDxSIST" fill className="object-contain" priority />
        </div>

        <div className="font-mono text-white mb-4 h-6">{`LOADING_SYSTEM: ${matrixText}`}</div>

        <div className="w-64 h-1 bg-dark-400 rounded-full overflow-hidden">
          <div className="h-full bg-white transition-all duration-100 ease-out" style={{ width: `${progress}%` }} />
        </div>

        <div className="mt-2 font-mono text-sm text-white">{`${progress}%`}</div>
      </div>
    );
  }

  return <>{children}</>;
}