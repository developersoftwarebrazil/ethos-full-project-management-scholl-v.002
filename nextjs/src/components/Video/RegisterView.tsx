"use client";

import { useEffect } from "react";
import { number } from "zod";

export function RegisterView({ videoId }: { videoId: string}) {
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_DJANGO_API_URL}/videos/${videoId}/register-view`, {
      method: "POST",
    }).catch(console.error);
  }, [videoId]);

  return null;
}
