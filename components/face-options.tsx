"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface FaceOptionsProps {
  options: any
  updateOption: (option: string, value: any) => void
}

export default function FaceOptions({ options, updateOption }: FaceOptionsProps) {
  const skinTones = [
    { value: "#f8d5c2", label: "Light" },
    { value: "#e8b89b", label: "Medium" },
    { value: "#c68863", label: "Tan" },
    { value: "#a66a53", label: "Brown" },
    { value: "#6a4c3b", label: "Dark" },
  ]

  const eyeColors = [
    { value: "#5b7553", label: "Green" },
    { value: "#634e34", label: "Brown" },
    { value: "#3d5a80", label: "Blue" },
    { value: "#301934", label: "Purple" },
    { value: "#36454f", label: "Gray" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Face Shape</h3>
        <RadioGroup
          value={options.faceShape}
          onValueChange={(value) => updateOption("faceShape", value)}
          className="grid grid-cols-2 sm:grid-cols-4 gap-3"
        >
          {["oval", "round", "square", "diamond", "heart", "oblong", "triangle", "rectangle"].map((shape) => (
            <div key={shape} className="flex items-center space-x-2">
              <RadioGroupItem value={shape} id={`face-${shape}`} />
              <Label htmlFor={`face-${shape}`} className="capitalize">
                {shape}
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Skin Tone</h3>
        <div className="grid grid-cols-5 gap-3">
          {skinTones.map((tone) => (
            <button
              key={tone.value}
              className={`h-12 rounded-md border-2 ${options.skinTone === tone.value ? "border-primary" : "border-transparent"}`}
              style={{ backgroundColor: tone.value }}
              onClick={() => updateOption("skinTone", tone.value)}
              aria-label={`Skin tone: ${tone.label}`}
            >
              <span className="sr-only">{tone.label}</span>
            </button>
          ))}
        </div>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Eye Color</h3>
        <div className="grid grid-cols-5 gap-3">
          {eyeColors.map((color) => (
            <button
              key={color.value}
              className={`h-12 rounded-md border-2 ${options.eyeColor === color.value ? "border-primary" : "border-transparent"}`}
              style={{ backgroundColor: color.value }}
              onClick={() => updateOption("eyeColor", color.value)}
              aria-label={`Eye color: ${color.label}`}
            >
              <span className="sr-only">{color.label}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

