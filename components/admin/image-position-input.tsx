"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Label } from "@/components/ui/label"
import { IMAGE_POSITIONS } from "@/lib/cms/image"
import type { ImageFit, ImagePosition } from "@/lib/supabase/types"

/**
 * Picker for how an image should "fit" inside its container.
 *
 * Posts two hidden inputs to the surrounding form:
 *   • <name>          → ImagePosition keyword (e.g. "top-right")
 *   • <name>_fit      → "cover" | "contain"   (only when `withFit` is true)
 *
 * The 9-point grid is the practical version of "crop": it picks which part
 * of the image is anchored when the container is a different aspect ratio.
 */
export function ImagePositionInput({
  name,
  defaultPosition = "center",
  defaultFit = "cover",
  fitName,
  withFit = false,
  label = "Image fit",
}: {
  name: string
  defaultPosition?: ImagePosition | string
  defaultFit?: ImageFit | string
  fitName?: string
  withFit?: boolean
  label?: string
}) {
  const [position, setPosition] = React.useState<ImagePosition>(
    (IMAGE_POSITIONS.includes(defaultPosition as ImagePosition)
      ? defaultPosition
      : "center") as ImagePosition,
  )
  const [fit, setFit] = React.useState<ImageFit>(
    (defaultFit === "contain" ? "contain" : "cover") as ImageFit,
  )

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex flex-wrap items-start gap-4">
        {/* 3x3 anchor grid */}
        <div className="grid grid-cols-3 gap-1 rounded-lg border border-border bg-muted/40 p-1.5">
          {IMAGE_POSITIONS.map(p => (
            <button
              key={p}
              type="button"
              onClick={() => setPosition(p)}
              aria-label={`Anchor image to ${p}`}
              title={p}
              className={cn(
                "h-7 w-7 rounded transition-colors",
                position === p
                  ? "bg-foreground"
                  : "bg-background hover:bg-muted-foreground/20",
              )}
            />
          ))}
        </div>

        {withFit && (
          <div className="space-y-1.5">
            <div className="text-xs text-muted-foreground">Fit</div>
            <div className="inline-flex rounded-md border border-border p-0.5">
              {(["cover", "contain"] as const).map(opt => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setFit(opt)}
                  className={cn(
                    "rounded px-3 py-1 text-xs font-medium transition-colors capitalize",
                    fit === opt
                      ? "bg-foreground text-background"
                      : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>
        )}

        <p className="max-w-xs text-xs text-muted-foreground">
          Click a square to choose which part of the image stays visible when
          the container shape doesn&apos;t match the source.{" "}
          {withFit && (
            <><strong>Cover</strong> fills the box and crops the rest. <strong>Contain</strong> shows the whole image with letterboxing.</>
          )}
        </p>
      </div>

      {/* Hidden values for the form submit */}
      <input type="hidden" name={name} value={position} />
      {withFit && <input type="hidden" name={fitName ?? `${name}_fit`} value={fit} />}
    </div>
  )
}
