"use client"

import type React from "react"

import { useEffect, useRef } from "react"

interface AvatarPreviewProps {
  options: any
  canvasRef: React.RefObject<HTMLCanvasElement>
}

export default function AvatarPreview({ options, canvasRef }: AvatarPreviewProps) {
  const loadedImagesRef = useRef<Record<string, HTMLImageElement>>({})

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    canvas.width = 500
    canvas.height = 500

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw avatar parts in layers
    drawAvatar(ctx, options, loadedImagesRef.current)
  }, [options, canvasRef])

  return <canvas ref={canvasRef} className="w-full h-full" aria-label="Avatar preview" />
}

async function drawAvatar(ctx: CanvasRenderingContext2D, options: any, loadedImages: Record<string, HTMLImageElement>) {
  // Draw background
  ctx.fillStyle = "#ffffff"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

  // Draw face
  drawFace(ctx, options)

  // Draw hair
  drawHair(ctx, options)

  // Draw facial hair
  if (options.beardStyle !== "none") {
    drawBeard(ctx, options)
  }

  if (options.mustacheStyle !== "none") {
    drawMustache(ctx, options)
  }

  // Draw clothing
  drawClothing(ctx, options)

  // Draw accessories
  drawAccessories(ctx, options)
}

function drawFace(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30 // Slightly above center
  const faceWidth = 150
  const faceHeight =
    options.faceShape === "oval"
      ? 180
      : options.faceShape === "round"
        ? 150
        : options.faceShape === "square"
          ? 160
          : options.faceShape === "diamond"
            ? 170
            : options.faceShape === "heart"
              ? 180
              : options.faceShape === "oblong"
                ? 200
                : options.faceShape === "triangle"
                  ? 170
                  : 180

  // Draw face shape
  ctx.fillStyle = options.skinTone
  ctx.beginPath()

  if (options.faceShape === "round") {
    ctx.arc(centerX, centerY, faceWidth / 2, 0, Math.PI * 2)
  } else if (options.faceShape === "square") {
    const radius = faceWidth / 5
    roundedRect(ctx, centerX - faceWidth / 2, centerY - faceHeight / 2, faceWidth, faceHeight, radius)
  } else if (options.faceShape === "diamond") {
    ctx.moveTo(centerX, centerY - faceHeight / 2)
    ctx.lineTo(centerX + faceWidth / 2, centerY)
    ctx.lineTo(centerX, centerY + faceHeight / 2)
    ctx.lineTo(centerX - faceWidth / 2, centerY)
  } else if (options.faceShape === "heart") {
    // Heart shape
    const topY = centerY - faceHeight / 2
    ctx.moveTo(centerX, centerY + faceHeight / 2)
    ctx.bezierCurveTo(centerX + faceWidth / 2, centerY, centerX + faceWidth / 2, topY, centerX, topY)
    ctx.bezierCurveTo(
      centerX - faceWidth / 2,
      topY,
      centerX - faceWidth / 2,
      centerY,
      centerX,
      centerY + faceHeight / 2,
    )
  } else if (options.faceShape === "triangle") {
    ctx.moveTo(centerX, centerY - faceHeight / 2)
    ctx.lineTo(centerX + faceWidth / 2, centerY + faceHeight / 2)
    ctx.lineTo(centerX - faceWidth / 2, centerY + faceHeight / 2)
  } else {
    // Default oval
    ctx.ellipse(centerX, centerY, faceWidth / 2, faceHeight / 2, 0, 0, Math.PI * 2)
  }

  ctx.fill()

  // Draw eyes
  const eyeY = centerY - 10
  const eyeSpacing = 40
  const eyeSize = 15

  // Left eye
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.ellipse(centerX - eyeSpacing, eyeY, eyeSize, eyeSize / 1.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Right eye
  ctx.beginPath()
  ctx.ellipse(centerX + eyeSpacing, eyeY, eyeSize, eyeSize / 1.5, 0, 0, Math.PI * 2)
  ctx.fill()

  // Eye pupils
  ctx.fillStyle = options.eyeColor
  ctx.beginPath()
  ctx.arc(centerX - eyeSpacing, eyeY, eyeSize / 2, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(centerX + eyeSpacing, eyeY, eyeSize / 2, 0, Math.PI * 2)
  ctx.fill()

  // Eye highlights
  ctx.fillStyle = "white"
  ctx.beginPath()
  ctx.arc(centerX - eyeSpacing + 2, eyeY - 2, 3, 0, Math.PI * 2)
  ctx.fill()

  ctx.beginPath()
  ctx.arc(centerX + eyeSpacing + 2, eyeY - 2, 3, 0, Math.PI * 2)
  ctx.fill()

  // Draw mouth
  const mouthY = centerY + 40
  ctx.strokeStyle = "#c0392b"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(centerX - 25, mouthY)
  ctx.quadraticCurveTo(centerX, mouthY + 15, centerX + 25, mouthY)
  ctx.stroke()

  // Draw nose
  ctx.strokeStyle = "#7f8c8d"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.moveTo(centerX, eyeY + 20)
  ctx.lineTo(centerX + 5, eyeY + 35)
  ctx.lineTo(centerX - 5, eyeY + 35)
  ctx.stroke()
}

function drawHair(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30
  const faceWidth = 150
  const faceHeight = 180

  ctx.fillStyle = options.hairColor

  if (options.hairStyle === "bald") {
    return
  }

  if (options.hairStyle === "short") {
    ctx.beginPath()
    ctx.arc(centerX, centerY - faceHeight / 2 + 10, faceWidth / 2 + 10, Math.PI, 0)
    ctx.fill()
  } else if (options.hairStyle === "medium") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 2 - 20, centerY)
    ctx.lineTo(centerX - faceWidth / 2 - 10, centerY - faceHeight / 2 - 10)
    ctx.lineTo(centerX + faceWidth / 2 + 10, centerY - faceHeight / 2 - 10)
    ctx.lineTo(centerX + faceWidth / 2 + 20, centerY)
    ctx.fill()
  } else if (options.hairStyle === "long") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 2 - 20, centerY + faceHeight / 2)
    ctx.lineTo(centerX - faceWidth / 2 - 10, centerY - faceHeight / 2 - 10)
    ctx.lineTo(centerX + faceWidth / 2 + 10, centerY - faceHeight / 2 - 10)
    ctx.lineTo(centerX + faceWidth / 2 + 20, centerY + faceHeight / 2)
    ctx.fill()
  } else if (options.hairStyle === "curly") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 2 - 20, centerY)

    // Draw curly top
    for (let i = 0; i < 10; i++) {
      const x = centerX - faceWidth / 2 - 20 + (faceWidth + 40) * (i / 10)
      const y = centerY - faceHeight / 2 - 10 + (i % 2 === 0 ? 10 : 0)
      ctx.lineTo(x, y)
    }

    ctx.lineTo(centerX + faceWidth / 2 + 20, centerY)
    ctx.fill()
  } else if (options.hairStyle === "wavy") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 2 - 20, centerY + 20)

    // Draw wavy hair
    for (let i = 0; i < 5; i++) {
      const x1 = centerX - faceWidth / 2 - 20 + (faceWidth + 40) * (i / 5)
      const y1 = centerY - faceHeight / 2 - 10 + (i % 2 === 0 ? 15 : 0)
      const x2 = centerX - faceWidth / 2 - 20 + (faceWidth + 40) * ((i + 0.5) / 5)
      const y2 = centerY - faceHeight / 2 - 10 + (i % 2 === 0 ? 0 : 15)

      ctx.quadraticCurveTo(x1, y1, x2, y2)
    }

    ctx.lineTo(centerX + faceWidth / 2 + 20, centerY + 20)
    ctx.fill()
  } else if (options.hairStyle === "buzz") {
    ctx.beginPath()
    ctx.arc(centerX, centerY - faceHeight / 2 + 10, faceWidth / 2 + 5, Math.PI, 0)
    ctx.fill()

    // Add buzz texture
    ctx.fillStyle = options.skinTone
    for (let i = 0; i < 50; i++) {
      const x = centerX - faceWidth / 2 + Math.random() * faceWidth
      const y = centerY - faceHeight / 2 - 10 + Math.random() * 30
      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  } else if (options.hairStyle === "mohawk") {
    ctx.beginPath()
    ctx.moveTo(centerX - 15, centerY - faceHeight / 2)
    ctx.lineTo(centerX, centerY - faceHeight / 2 - 40)
    ctx.lineTo(centerX + 15, centerY - faceHeight / 2)
    ctx.fill()
  }
}

function drawBeard(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30
  const faceWidth = 150
  const faceHeight = 180

  ctx.fillStyle = options.beardColor

  if (options.beardStyle === "stubble") {
    // Draw stubble as dots
    for (let i = 0; i < 200; i++) {
      const angle = Math.random() * Math.PI
      const distance = 50 + Math.random() * 30
      const x = centerX + Math.cos(angle) * distance
      const y = centerY + 40 + Math.sin(angle) * distance

      ctx.beginPath()
      ctx.arc(x, y, 1, 0, Math.PI * 2)
      ctx.fill()
    }
  } else if (options.beardStyle === "short") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 3, centerY + 30)
    ctx.quadraticCurveTo(centerX, centerY + 90, centerX + faceWidth / 3, centerY + 30)
    ctx.fill()
  } else if (options.beardStyle === "medium") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 3, centerY + 20)
    ctx.quadraticCurveTo(centerX, centerY + 110, centerX + faceWidth / 3, centerY + 20)
    ctx.fill()
  } else if (options.beardStyle === "long") {
    ctx.beginPath()
    ctx.moveTo(centerX - faceWidth / 3, centerY + 20)
    ctx.quadraticCurveTo(centerX, centerY + 140, centerX + faceWidth / 3, centerY + 20)
    ctx.fill()
  } else if (options.beardStyle === "goatee") {
    ctx.beginPath()
    ctx.moveTo(centerX - 15, centerY + 40)
    ctx.quadraticCurveTo(centerX, centerY + 90, centerX + 15, centerY + 40)
    ctx.fill()
  }
}

function drawMustache(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30
  const mouthY = centerY + 30

  ctx.fillStyle = options.beardColor

  if (options.mustacheStyle === "natural") {
    ctx.beginPath()
    ctx.moveTo(centerX - 30, mouthY - 5)
    ctx.quadraticCurveTo(centerX, mouthY - 10, centerX + 30, mouthY - 5)
    ctx.quadraticCurveTo(centerX, mouthY, centerX - 30, mouthY - 5)
    ctx.fill()
  } else if (options.mustacheStyle === "handlebar") {
    ctx.beginPath()
    ctx.moveTo(centerX - 40, mouthY - 5)
    ctx.quadraticCurveTo(centerX, mouthY - 15, centerX + 40, mouthY - 5)
    ctx.quadraticCurveTo(centerX, mouthY, centerX - 40, mouthY - 5)

    // Left curl
    ctx.moveTo(centerX - 40, mouthY - 5)
    ctx.quadraticCurveTo(centerX - 50, mouthY - 15, centerX - 45, mouthY - 20)

    // Right curl
    ctx.moveTo(centerX + 40, mouthY - 5)
    ctx.quadraticCurveTo(centerX + 50, mouthY - 15, centerX + 45, mouthY - 20)

    ctx.fill()
  } else if (options.mustacheStyle === "pencil") {
    ctx.beginPath()
    ctx.moveTo(centerX - 25, mouthY - 5)
    ctx.lineTo(centerX + 25, mouthY - 5)
    ctx.lineTo(centerX + 25, mouthY)
    ctx.lineTo(centerX - 25, mouthY)
    ctx.fill()
  }
}

function drawClothing(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30
  const shoulderY = centerY + 100

  // Draw neck
  ctx.fillStyle = options.skinTone
  ctx.beginPath()
  ctx.moveTo(centerX - 25, centerY + 70)
  ctx.lineTo(centerX + 25, centerY + 70)
  ctx.lineTo(centerX + 20, shoulderY)
  ctx.lineTo(centerX - 20, shoulderY)
  ctx.fill()

  // Draw top clothing
  ctx.fillStyle = options.outfit.topColor

  if (options.outfit.topType === "tshirt") {
    ctx.beginPath()
    ctx.moveTo(centerX - 80, shoulderY)
    ctx.lineTo(centerX + 80, shoulderY)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.fill()

    // Collar
    ctx.beginPath()
    ctx.moveTo(centerX - 20, shoulderY)
    ctx.lineTo(centerX, shoulderY + 30)
    ctx.lineTo(centerX + 20, shoulderY)
    ctx.stroke()
  } else if (options.outfit.topType === "shirt") {
    ctx.beginPath()
    ctx.moveTo(centerX - 80, shoulderY)
    ctx.lineTo(centerX + 80, shoulderY)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.fill()

    // Collar
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 20, shoulderY)
    ctx.lineTo(centerX - 10, shoulderY + 40)
    ctx.lineTo(centerX, shoulderY + 30)
    ctx.lineTo(centerX + 10, shoulderY + 40)
    ctx.lineTo(centerX + 20, shoulderY)
    ctx.stroke()

    // Buttons
    ctx.fillStyle = "white"
    for (let i = 0; i < 3; i++) {
      ctx.beginPath()
      ctx.arc(centerX, shoulderY + 50 + i * 30, 3, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    }
  } else if (options.outfit.topType === "suit") {
    // Suit jacket
    ctx.fillStyle = "#2c3e50"
    ctx.beginPath()
    ctx.moveTo(centerX - 80, shoulderY)
    ctx.lineTo(centerX + 80, shoulderY)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.fill()

    // Lapels
    ctx.beginPath()
    ctx.moveTo(centerX - 30, shoulderY)
    ctx.lineTo(centerX - 20, shoulderY + 70)
    ctx.lineTo(centerX, shoulderY + 100)
    ctx.lineTo(centerX + 20, shoulderY + 70)
    ctx.lineTo(centerX + 30, shoulderY)
    ctx.fill()

    // Shirt underneath
    ctx.fillStyle = "white"
    ctx.beginPath()
    ctx.moveTo(centerX - 20, shoulderY + 70)
    ctx.lineTo(centerX, shoulderY + 100)
    ctx.lineTo(centerX + 20, shoulderY + 70)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.fill()

    // Tie
    ctx.fillStyle = "#e74c3c"
    ctx.beginPath()
    ctx.moveTo(centerX - 10, shoulderY + 70)
    ctx.lineTo(centerX, shoulderY + 80)
    ctx.lineTo(centerX + 10, shoulderY + 70)
    ctx.lineTo(centerX + 15, shoulderY + 120)
    ctx.lineTo(centerX, shoulderY + 150)
    ctx.lineTo(centerX - 15, shoulderY + 120)
    ctx.fill()
  } else if (options.outfit.topType === "hoodie") {
    ctx.fillStyle = options.outfit.topColor
    ctx.beginPath()
    ctx.moveTo(centerX - 80, shoulderY)
    ctx.lineTo(centerX + 80, shoulderY)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.fill()

    // Hood
    ctx.beginPath()
    ctx.moveTo(centerX - 40, shoulderY)
    ctx.quadraticCurveTo(centerX, shoulderY - 30, centerX + 40, shoulderY)
    ctx.stroke()

    // Pocket
    ctx.beginPath()
    ctx.moveTo(centerX - 40, shoulderY + 100)
    ctx.lineTo(centerX + 40, shoulderY + 100)
    ctx.lineTo(centerX + 40, shoulderY + 140)
    ctx.lineTo(centerX - 40, shoulderY + 140)
    ctx.closePath()
    ctx.stroke()
  } else if (options.outfit.topType === "kurta") {
    ctx.fillStyle = options.outfit.topColor
    ctx.beginPath()
    ctx.moveTo(centerX - 80, shoulderY)
    ctx.lineTo(centerX + 80, shoulderY)
    ctx.lineTo(centerX + 90, ctx.canvas.height)
    ctx.lineTo(centerX - 90, ctx.canvas.height)
    ctx.fill()

    // Collar
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 15, shoulderY)
    ctx.lineTo(centerX, shoulderY + 40)
    ctx.lineTo(centerX + 15, shoulderY)
    ctx.stroke()

    // Embroidery
    ctx.strokeStyle = "gold"
    ctx.beginPath()
    ctx.moveTo(centerX - 40, shoulderY + 20)
    ctx.lineTo(centerX + 40, shoulderY + 20)
    ctx.stroke()
  }

  // Draw jacket if selected
  if (options.outfit.jacketType !== "none") {
    if (options.outfit.jacketType === "hoodie") {
      ctx.fillStyle = options.outfit.jacketColor
      ctx.beginPath()
      ctx.moveTo(centerX - 90, shoulderY)
      ctx.lineTo(centerX + 90, shoulderY)
      ctx.lineTo(centerX + 80, ctx.canvas.height)
      ctx.lineTo(centerX - 80, ctx.canvas.height)
      ctx.fill()

      // Hood
      ctx.beginPath()
      ctx.moveTo(centerX - 50, shoulderY)
      ctx.quadraticCurveTo(centerX, shoulderY - 40, centerX + 50, shoulderY)
      ctx.stroke()

      // Open front
      ctx.fillStyle = options.outfit.topColor
      ctx.beginPath()
      ctx.moveTo(centerX - 20, shoulderY)
      ctx.lineTo(centerX + 20, shoulderY)
      ctx.lineTo(centerX + 20, ctx.canvas.height)
      ctx.lineTo(centerX - 20, ctx.canvas.height)
      ctx.fill()
    } else if (options.outfit.jacketType === "blazer") {
      ctx.fillStyle = options.outfit.jacketColor
      ctx.beginPath()
      ctx.moveTo(centerX - 90, shoulderY)
      ctx.lineTo(centerX + 90, shoulderY)
      ctx.lineTo(centerX + 80, ctx.canvas.height)
      ctx.lineTo(centerX - 80, ctx.canvas.height)
      ctx.fill()

      // Lapels
      ctx.beginPath()
      ctx.moveTo(centerX - 40, shoulderY)
      ctx.lineTo(centerX - 30, shoulderY + 80)
      ctx.lineTo(centerX, shoulderY + 100)
      ctx.lineTo(centerX + 30, shoulderY + 80)
      ctx.lineTo(centerX + 40, shoulderY)
      ctx.fill()

      // Open front
      ctx.fillStyle = options.outfit.topColor
      ctx.beginPath()
      ctx.moveTo(centerX - 30, shoulderY + 80)
      ctx.lineTo(centerX, shoulderY + 100)
      ctx.lineTo(centerX + 30, shoulderY + 80)
      ctx.lineTo(centerX + 25, ctx.canvas.height)
      ctx.lineTo(centerX - 25, ctx.canvas.height)
      ctx.fill()
    } else if (options.outfit.jacketType === "leather") {
      ctx.fillStyle = options.outfit.jacketColor
      ctx.beginPath()
      ctx.moveTo(centerX - 90, shoulderY)
      ctx.lineTo(centerX + 90, shoulderY)
      ctx.lineTo(centerX + 80, ctx.canvas.height)
      ctx.lineTo(centerX - 80, ctx.canvas.height)
      ctx.fill()

      // Collar
      ctx.strokeStyle = "black"
      ctx.lineWidth = 3
      ctx.beginPath()
      ctx.moveTo(centerX - 40, shoulderY)
      ctx.lineTo(centerX - 30, shoulderY + 20)
      ctx.lineTo(centerX + 30, shoulderY + 20)
      ctx.lineTo(centerX + 40, shoulderY)
      ctx.stroke()

      // Zipper
      ctx.strokeStyle = "silver"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, shoulderY + 20)
      ctx.lineTo(centerX, ctx.canvas.height - 50)
      ctx.stroke()
    } else if (options.outfit.jacketType === "denim") {
      ctx.fillStyle = "#3b5998"
      ctx.beginPath()
      ctx.moveTo(centerX - 90, shoulderY)
      ctx.lineTo(centerX + 90, shoulderY)
      ctx.lineTo(centerX + 80, ctx.canvas.height)
      ctx.lineTo(centerX - 80, ctx.canvas.height)
      ctx.fill()

      // Collar
      ctx.strokeStyle = "black"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX - 40, shoulderY)
      ctx.lineTo(centerX - 30, shoulderY + 30)
      ctx.lineTo(centerX + 30, shoulderY + 30)
      ctx.lineTo(centerX + 40, shoulderY)
      ctx.stroke()

      // Buttons
      ctx.fillStyle = "gold"
      for (let i = 0; i < 4; i++) {
        ctx.beginPath()
        ctx.arc(centerX, shoulderY + 50 + i * 30, 4, 0, Math.PI * 2)
        ctx.fill()
      }
    } else if (options.outfit.jacketType === "bomber") {
      ctx.fillStyle = options.outfit.jacketColor
      ctx.beginPath()
      ctx.moveTo(centerX - 90, shoulderY)
      ctx.lineTo(centerX + 90, shoulderY)
      ctx.lineTo(centerX + 80, ctx.canvas.height)
      ctx.lineTo(centerX - 80, ctx.canvas.height)
      ctx.fill()

      // Elastic bands
      ctx.fillStyle = "#333"
      ctx.beginPath()
      ctx.rect(centerX - 90, shoulderY, 180, 10)
      ctx.rect(centerX - 80, ctx.canvas.height - 20, 160, 20)
      ctx.fill()

      // Zipper
      ctx.strokeStyle = "silver"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.moveTo(centerX, shoulderY + 10)
      ctx.lineTo(centerX, ctx.canvas.height - 20)
      ctx.stroke()
    }
  }

  // Draw bottom clothing
  const waistY = shoulderY + 120

  ctx.fillStyle = options.outfit.bottomColor

  if (options.outfit.bottomType === "jeans") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 60, ctx.canvas.height)
    ctx.lineTo(centerX + 20, ctx.canvas.height)
    ctx.lineTo(centerX + 10, waistY + 100)
    ctx.lineTo(centerX - 10, waistY + 100)
    ctx.lineTo(centerX - 20, ctx.canvas.height)
    ctx.lineTo(centerX - 60, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Jeans details
    ctx.strokeStyle = "#1e3a8a"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX, waistY)
    ctx.lineTo(centerX, waistY + 100)
    ctx.stroke()

    // Pockets
    ctx.beginPath()
    ctx.rect(centerX - 50, waistY + 20, 20, 15)
    ctx.rect(centerX + 30, waistY + 20, 20, 15)
    ctx.stroke()
  } else if (options.outfit.bottomType === "chinos") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 50, ctx.canvas.height)
    ctx.lineTo(centerX + 20, ctx.canvas.height)
    ctx.lineTo(centerX + 10, waistY + 100)
    ctx.lineTo(centerX - 10, waistY + 100)
    ctx.lineTo(centerX - 20, ctx.canvas.height)
    ctx.lineTo(centerX - 50, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()
  } else if (options.outfit.bottomType === "shorts") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 60, waistY + 100)
    ctx.lineTo(centerX + 20, waistY + 100)
    ctx.lineTo(centerX + 10, waistY + 80)
    ctx.lineTo(centerX - 10, waistY + 80)
    ctx.lineTo(centerX - 20, waistY + 100)
    ctx.lineTo(centerX - 60, waistY + 100)
    ctx.closePath()
    ctx.fill()
  } else if (options.outfit.bottomType === "trackpants") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 50, ctx.canvas.height)
    ctx.lineTo(centerX + 20, ctx.canvas.height)
    ctx.lineTo(centerX + 10, waistY + 100)
    ctx.lineTo(centerX - 10, waistY + 100)
    ctx.lineTo(centerX - 20, ctx.canvas.height)
    ctx.lineTo(centerX - 50, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Stripes
    ctx.strokeStyle = "white"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX - 50, waistY + 20)
    ctx.lineTo(centerX - 40, ctx.canvas.height)
    ctx.moveTo(centerX + 50, waistY + 20)
    ctx.lineTo(centerX + 40, ctx.canvas.height)
    ctx.stroke()
  } else if (options.outfit.bottomType === "formal") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 50, ctx.canvas.height)
    ctx.lineTo(centerX + 20, ctx.canvas.height)
    ctx.lineTo(centerX + 10, waistY + 100)
    ctx.lineTo(centerX - 10, waistY + 100)
    ctx.lineTo(centerX - 20, ctx.canvas.height)
    ctx.lineTo(centerX - 50, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Crease
    ctx.strokeStyle = "rgba(0,0,0,0.3)"
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(centerX - 30, waistY + 20)
    ctx.lineTo(centerX - 25, ctx.canvas.height)
    ctx.moveTo(centerX + 30, waistY + 20)
    ctx.lineTo(centerX + 25, ctx.canvas.height)
    ctx.stroke()
  } else if (options.outfit.bottomType === "pajama") {
    ctx.beginPath()
    ctx.moveTo(centerX - 70, waistY)
    ctx.lineTo(centerX + 70, waistY)
    ctx.lineTo(centerX + 60, ctx.canvas.height)
    ctx.lineTo(centerX + 20, ctx.canvas.height)
    ctx.lineTo(centerX + 10, waistY + 100)
    ctx.lineTo(centerX - 10, waistY + 100)
    ctx.lineTo(centerX - 20, ctx.canvas.height)
    ctx.lineTo(centerX - 60, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Drawstring
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 20, waistY)
    ctx.lineTo(centerX + 20, waistY)
    ctx.stroke()
  }

  // Draw shoes
  const feetY = ctx.canvas.height - 20

  ctx.fillStyle = options.outfit.shoesColor

  if (options.outfit.shoesType === "sneakers") {
    // Left shoe
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY)
    ctx.lineTo(centerX - 20, feetY)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.lineTo(centerX - 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Right shoe
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY)
    ctx.lineTo(centerX + 20, feetY)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX + 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Shoe details
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY + 5)
    ctx.lineTo(centerX - 20, feetY + 5)
    ctx.moveTo(centerX + 60, feetY + 5)
    ctx.lineTo(centerX + 20, feetY + 5)
    ctx.stroke()
  } else if (options.outfit.shoesType === "formal") {
    // Left shoe
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY)
    ctx.lineTo(centerX - 20, feetY)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 80, ctx.canvas.height)
    ctx.lineTo(centerX - 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Right shoe
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY)
    ctx.lineTo(centerX + 20, feetY)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 80, ctx.canvas.height)
    ctx.lineTo(centerX + 75, feetY + 10)
    ctx.closePath()
    ctx.fill()
  } else if (options.outfit.shoesType === "boots") {
    // Left boot
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY - 20)
    ctx.lineTo(centerX - 20, feetY - 20)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.lineTo(centerX - 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Right boot
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY - 20)
    ctx.lineTo(centerX + 20, feetY - 20)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX + 75, feetY + 10)
    ctx.closePath()
    ctx.fill()
  } else if (options.outfit.shoesType === "sandals") {
    // Left sandal
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY)
    ctx.lineTo(centerX - 20, feetY)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Right sandal
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY)
    ctx.lineTo(centerX + 20, feetY)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Straps
    ctx.strokeStyle = "black"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY + 5)
    ctx.lineTo(centerX - 20, feetY + 5)
    ctx.moveTo(centerX + 60, feetY + 5)
    ctx.lineTo(centerX + 20, feetY + 5)
    ctx.stroke()
  } else if (options.outfit.shoesType === "slippers") {
    // Left slipper
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY)
    ctx.lineTo(centerX - 20, feetY)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()

    // Right slipper
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY)
    ctx.lineTo(centerX + 20, feetY)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.closePath()
    ctx.fill()
  } else if (options.outfit.shoesType === "sports") {
    // Left shoe
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY)
    ctx.lineTo(centerX - 20, feetY)
    ctx.lineTo(centerX - 15, ctx.canvas.height)
    ctx.lineTo(centerX - 70, ctx.canvas.height)
    ctx.lineTo(centerX - 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Right shoe
    ctx.beginPath()
    ctx.moveTo(centerX + 60, feetY)
    ctx.lineTo(centerX + 20, feetY)
    ctx.lineTo(centerX + 15, ctx.canvas.height)
    ctx.lineTo(centerX + 70, ctx.canvas.height)
    ctx.lineTo(centerX + 75, feetY + 10)
    ctx.closePath()
    ctx.fill()

    // Shoe details
    ctx.strokeStyle = "white"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.moveTo(centerX - 60, feetY + 5)
    ctx.lineTo(centerX - 20, feetY + 5)
    ctx.moveTo(centerX + 60, feetY + 5)
    ctx.lineTo(centerX + 20, feetY + 5)
    ctx.stroke()

    // Logo
    ctx.beginPath()
    ctx.arc(centerX - 40, feetY + 10, 5, 0, Math.PI * 2)
    ctx.arc(centerX + 40, feetY + 10, 5, 0, Math.PI * 2)
    ctx.stroke()
  }

  // Draw socks if visible
  if (["sneakers", "sports", "formal", "boots"].includes(options.outfit.shoesType)) {
    ctx.fillStyle = options.outfit.socksColor

    // Left sock
    ctx.beginPath()
    ctx.rect(centerX - 60, feetY - 20, 40, 20)
    ctx.fill()

    // Right sock
    ctx.beginPath()
    ctx.rect(centerX + 20, feetY - 20, 40, 20)
    ctx.fill()
  }
}

function drawAccessories(ctx: CanvasRenderingContext2D, options: any) {
  const centerX = ctx.canvas.width / 2
  const centerY = ctx.canvas.height / 2 - 30

  // Draw glasses
  if (options.outfit.glassesType !== "none") {
    ctx.strokeStyle = "black"
    ctx.lineWidth = 2

    const eyeY = centerY - 10
    const eyeSpacing = 40

    if (options.outfit.glassesType === "aviator") {
      // Left lens
      ctx.beginPath()
      ctx.ellipse(centerX - eyeSpacing, eyeY, 25, 20, Math.PI / 6, 0, Math.PI * 2)
      ctx.stroke()

      // Right lens
      ctx.beginPath()
      ctx.ellipse(centerX + eyeSpacing, eyeY, 25, 20, -Math.PI / 6, 0, Math.PI * 2)
      ctx.stroke()

      // Bridge
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing + 15, eyeY - 5)
      ctx.lineTo(centerX + eyeSpacing - 15, eyeY - 5)
      ctx.stroke()

      // Temple arms
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing - 20, eyeY)
      ctx.lineTo(centerX - eyeSpacing - 40, eyeY + 20)
      ctx.moveTo(centerX + eyeSpacing + 20, eyeY)
      ctx.lineTo(centerX + eyeSpacing + 40, eyeY + 20)
      ctx.stroke()
    } else if (options.outfit.glassesType === "round") {
      // Left lens
      ctx.beginPath()
      ctx.arc(centerX - eyeSpacing, eyeY, 20, 0, Math.PI * 2)
      ctx.stroke()

      // Right lens
      ctx.beginPath()
      ctx.arc(centerX + eyeSpacing, eyeY, 20, 0, Math.PI * 2)
      ctx.stroke()

      // Bridge
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing + 15, eyeY)
      ctx.lineTo(centerX + eyeSpacing - 15, eyeY)
      ctx.stroke()

      // Temple arms
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing - 20, eyeY)
      ctx.lineTo(centerX - eyeSpacing - 40, eyeY + 10)
      ctx.moveTo(centerX + eyeSpacing + 20, eyeY)
      ctx.lineTo(centerX + eyeSpacing + 40, eyeY + 10)
      ctx.stroke()
    } else if (options.outfit.glassesType === "square") {
      // Left lens
      ctx.beginPath()
      roundedRect(ctx, centerX - eyeSpacing - 20, eyeY - 15, 40, 30, 3)
      ctx.stroke()

      // Right lens
      ctx.beginPath()
      roundedRect(ctx, centerX + eyeSpacing - 20, eyeY - 15, 40, 30, 3)
      ctx.stroke()

      // Bridge
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing + 20, eyeY)
      ctx.lineTo(centerX + eyeSpacing - 20, eyeY)
      ctx.stroke()

      // Temple arms
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing - 20, eyeY)
      ctx.lineTo(centerX - eyeSpacing - 40, eyeY + 10)
      ctx.moveTo(centerX + eyeSpacing + 20, eyeY)
      ctx.lineTo(centerX + eyeSpacing + 40, eyeY + 10)
      ctx.stroke()
    } else if (options.outfit.glassesType === "rectangle") {
      // Left lens
      ctx.beginPath()
      roundedRect(ctx, centerX - eyeSpacing - 25, eyeY - 12, 50, 24, 3)
      ctx.stroke()

      // Right lens
      ctx.beginPath()
      roundedRect(ctx, centerX + eyeSpacing - 25, eyeY - 12, 50, 24, 3)
      ctx.stroke()

      // Bridge
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing + 25, eyeY)
      ctx.lineTo(centerX + eyeSpacing - 25, eyeY)
      ctx.stroke()

      // Temple arms
      ctx.beginPath()
      ctx.moveTo(centerX - eyeSpacing - 25, eyeY)
      ctx.lineTo(centerX - eyeSpacing - 45, eyeY + 10)
      ctx.moveTo(centerX + eyeSpacing + 25, eyeY)
      ctx.lineTo(centerX + eyeSpacing + 45, eyeY + 10)
      ctx.stroke()
    }
  }

  // Draw belt if selected
  if (options.outfit.beltType !== "none") {
    const waistY = centerY + 100 + 120

    ctx.fillStyle = "black"
    ctx.beginPath()
    ctx.rect(centerX - 70, waistY, 140, 10)
    ctx.fill()

    // Belt buckle
    if (options.outfit.beltType === "formal") {
      ctx.fillStyle = "gold"
      ctx.beginPath()
      ctx.rect(centerX - 10, waistY - 2, 20, 14)
      ctx.fill()
    } else if (options.outfit.beltType === "casual") {
      ctx.fillStyle = "silver"
      ctx.beginPath()
      ctx.arc(centerX, waistY + 5, 10, 0, Math.PI * 2)
      ctx.fill()
    }
  }

  // Draw watch if selected
  if (options.outfit.watchType !== "none") {
    const wristY = centerY + 100 + 50

    if (options.outfit.watchType === "smart") {
      ctx.fillStyle = "black"
      ctx.beginPath()
      roundedRect(ctx, centerX - 90, wristY - 10, 20, 30, 5)
      ctx.fill()

      // Watch face
      ctx.fillStyle = "#333"
      ctx.beginPath()
      roundedRect(ctx, centerX - 87, wristY - 7, 14, 24, 3)
      ctx.fill()

      // Watch display
      ctx.fillStyle = "#0f0"
      ctx.font = "8px Arial"
      ctx.fillText("12:34", centerX - 85, wristY + 5)
    } else if (options.outfit.watchType === "analog") {
      // Watch band
      ctx.fillStyle = "brown"
      ctx.beginPath()
      ctx.rect(centerX - 95, wristY - 5, 30, 20)
      ctx.fill()

      // Watch face
      ctx.fillStyle = "white"
      ctx.beginPath()
      ctx.arc(centerX - 80, wristY + 5, 12, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = "gold"
      ctx.lineWidth = 2
      ctx.beginPath()
      ctx.arc(centerX - 80, wristY + 5, 12, 0, Math.PI * 2)
      ctx.stroke()

      // Watch hands
      ctx.strokeStyle = "black"
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.moveTo(centerX - 80, wristY + 5)
      ctx.lineTo(centerX - 80, wristY - 3)
      ctx.moveTo(centerX - 80, wristY + 5)
      ctx.lineTo(centerX - 74, wristY + 5)
      ctx.stroke()
    }
  }

  // Draw hat if selected
  if (options.outfit.hatType !== "none") {
    const hatY = centerY - 100

    if (options.outfit.hatType === "cap") {
      ctx.fillStyle = "red"

      // Cap crown
      ctx.beginPath()
      ctx.arc(centerX, hatY, 60, Math.PI, 0, true)
      ctx.fill()

      // Cap bill
      ctx.beginPath()
      ctx.moveTo(centerX - 60, hatY)
      ctx.lineTo(centerX + 60, hatY)
      ctx.lineTo(centerX + 90, hatY + 10)
      ctx.lineTo(centerX - 90, hatY + 10)
      ctx.fill()
    } else if (options.outfit.hatType === "cowboy") {
      ctx.fillStyle = "tan"

      // Hat crown
      ctx.beginPath()
      ctx.ellipse(centerX, hatY - 20, 30, 40, 0, 0, Math.PI * 2)
      ctx.fill()

      // Hat brim
      ctx.beginPath()
      ctx.ellipse(centerX, hatY, 80, 40, 0, 0, Math.PI * 2)
      ctx.fill()

      // Hat band
      ctx.fillStyle = "brown"
      ctx.beginPath()
      ctx.ellipse(centerX, hatY - 20, 32, 42, 0, 0, Math.PI * 2)
      ctx.stroke()
    } else if (options.outfit.hatType === "beanie") {
      ctx.fillStyle = "navy"

      // Beanie
      ctx.beginPath()
      ctx.ellipse(centerX, hatY, 60, 40, 0, 0, Math.PI, true)
      ctx.fill()

      // Fold
      ctx.strokeStyle = "rgba(255,255,255,0.5)"
      ctx.lineWidth = 5
      ctx.beginPath()
      ctx.ellipse(centerX, hatY - 10, 60, 40, 0, Math.PI * 1.25, Math.PI * 1.75)
      ctx.stroke()
    }
  }
}

function roundedRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) {
  ctx.beginPath()
  ctx.moveTo(x + radius, y)
  ctx.lineTo(x + width - radius, y)
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius)
  ctx.lineTo(x + width, y + height - radius)
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height)
  ctx.lineTo(x + radius, y + height)
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius)
  ctx.lineTo(x, y + radius)
  ctx.quadraticCurveTo(x, y, x + radius, y)
  ctx.closePath()
}

