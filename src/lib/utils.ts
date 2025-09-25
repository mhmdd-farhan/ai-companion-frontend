import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getAverageLatency(arr: { latency: string }[] | undefined) {
  if (!arr || !arr.length) return "0ms";

  const total = arr.reduce((sum, item) => {
    const num = parseFloat(item.latency);
    return sum + num;
  }, 0);

  const avg = total / arr.length;

  return `${avg.toFixed(0)}ms`;
}

export function formatToLocalDateTime(timestamp: string): string {
  const date = new Date(timestamp);
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  const hours = date.getHours().toString().padStart(2, "0");
  const minutes = date.getMinutes().toString().padStart(2, "0");
  return `${year}-${month}-${day} ${hours}:${minutes}`;
}