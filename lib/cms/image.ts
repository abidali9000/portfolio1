import type { ImageFit, ImagePosition } from "@/lib/supabase/types"

const POSITION_TO_CSS: Record<ImagePosition, string> = {
  "top-left":     "left top",
  "top":          "center top",
  "top-right":    "right top",
  "left":         "left center",
  "center":       "center center",
  "right":        "right center",
  "bottom-left":  "left bottom",
  "bottom":       "center bottom",
  "bottom-right": "right bottom",
}

export const IMAGE_POSITIONS: ImagePosition[] = [
  "top-left", "top", "top-right",
  "left", "center", "right",
  "bottom-left", "bottom", "bottom-right",
]

export function objectPositionStyle(position: ImagePosition | string | null | undefined): string {
  return POSITION_TO_CSS[(position ?? "center") as ImagePosition] ?? "center center"
}

export function objectFitClass(fit: ImageFit | string | null | undefined): string {
  return fit === "contain" ? "object-contain" : "object-cover"
}
