"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface AccessoryOptionsProps {
  options: any
  updateOption: (option: string, value: any) => void
}

export default function AccessoryOptions({ options, updateOption }: AccessoryOptionsProps) {
  const glassesTypes = [
    { value: "none", label: "None" },
    { value: "aviator", label: "Aviator" },
    { value: "round", label: "Round" },
    { value: "square", label: "Square" },
    { value: "rectangle", label: "Rectangle" },
  ]

  const beltTypes = [
    { value: "none", label: "None" },
    { value: "formal", label: "Formal" },
    { value: "casual", label: "Casual" },
  ]

  const watchTypes = [
    { value: "none", label: "None" },
    { value: "smart", label: "Smart Watch" },
    { value: "analog", label: "Analog" },
  ]

  const hatTypes = [
    { value: "none", label: "None" },
    { value: "cap", label: "Cap" },
    { value: "cowboy", label: "Cowboy Hat" },
    { value: "beanie", label: "Beanie" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium mb-3">Glasses</h3>
        <RadioGroup
          value={options.glassesType}
          onValueChange={(value) => updateOption("glassesType", value)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {glassesTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={`glasses-${type.value}`} />
              <Label htmlFor={`glasses-${type.value}`}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Belt</h3>
        <RadioGroup
          value={options.beltType}
          onValueChange={(value) => updateOption("beltType", value)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {beltTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={`belt-${type.value}`} />
              <Label htmlFor={`belt-${type.value}`}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Watch</h3>
        <RadioGroup
          value={options.watchType}
          onValueChange={(value) => updateOption("watchType", value)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {watchTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={`watch-${type.value}`} />
              <Label htmlFor={`watch-${type.value}`}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>

      <div>
        <h3 className="text-lg font-medium mb-3">Hat</h3>
        <RadioGroup
          value={options.hatType}
          onValueChange={(value) => updateOption("hatType", value)}
          className="grid grid-cols-2 sm:grid-cols-3 gap-3"
        >
          {hatTypes.map((type) => (
            <div key={type.value} className="flex items-center space-x-2">
              <RadioGroupItem value={type.value} id={`hat-${type.value}`} />
              <Label htmlFor={`hat-${type.value}`}>{type.label}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  )
}

