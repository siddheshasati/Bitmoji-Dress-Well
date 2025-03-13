"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface HairOptionsProps {
  options: any
  updateOption: (option: string, value: any) => void
}

export default function HairOptions({ options, updateOption }: HairOptionsProps) {
  const hairColors = [
    { value: "#3a3a3a", label: "Black" },
    { value: "#6b4423", label: "Brown" },
    { value: "#c19a6b", label: "Blonde" },
    { value: "#b7472a", label: "Red" },
    { value: "#808080", label: "Gray" },
  ]

  const hairStyles = [
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
    { value: "curly", label: "Curly" },
    { value: "wavy", label: "Wavy" },
    { value: "bald", label: "Bald" },
    { value: "buzz", label: "Buzz Cut" },
    { value: "mohawk", label: "Mohawk" },
  ]

  const beardStyles = [
    { value: "none", label: "None" },
    { value: "stubble", label: "Stubble" },
    { value: "short", label: "Short" },
    { value: "medium", label: "Medium" },
    { value: "long", label: "Long" },
    { value: "goatee", label: "Goatee" },
  ]

  const mustacheStyles = [
    { value: "none", label: "None" },
    { value: "natural", label: "Natural" },
    { value: "handlebar", label: "Handlebar" },
    { value: "pencil", label: "Pencil" },
  ]

  return (
    <div>
      <Tabs defaultValue="hairstyle">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="hairstyle">Hair</TabsTrigger>
          <TabsTrigger value="beard">Beard</TabsTrigger>
          <TabsTrigger value="mustache">Mustache</TabsTrigger>
        </TabsList>

        <TabsContent value="hairstyle" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Hair Style</h3>
            <RadioGroup
              value={options.hairStyle}
              onValueChange={(value) => updateOption("hairStyle", value)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {hairStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={`hair-${style.value}`} />
                  <Label htmlFor={`hair-${style.value}`}>{style.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <div>
            <h3 className="text-lg font-medium mb-3">Hair Color</h3>
            <div className="grid grid-cols-5 gap-3">
              {hairColors.map((color) => (
                <button
                  key={color.value}
                  className={`h-12 rounded-md border-2 ${options.hairColor === color.value ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => updateOption("hairColor", color.value)}
                  aria-label={`Hair color: ${color.label}`}
                >
                  <span className="sr-only">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        </TabsContent>

        <TabsContent value="beard" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Beard Style</h3>
            <RadioGroup
              value={options.beardStyle}
              onValueChange={(value) => updateOption("beardStyle", value)}
              className="grid grid-cols-2 sm:grid-cols-3 gap-3"
            >
              {beardStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={`beard-${style.value}`} />
                  <Label htmlFor={`beard-${style.value}`}>{style.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {options.beardStyle !== "none" && (
            <div>
              <h3 className="text-lg font-medium mb-3">Beard Color</h3>
              <div className="grid grid-cols-5 gap-3">
                {hairColors.map((color) => (
                  <button
                    key={color.value}
                    className={`h-12 rounded-md border-2 ${options.beardColor === color.value ? "border-primary" : "border-transparent"}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => updateOption("beardColor", color.value)}
                    aria-label={`Beard color: ${color.label}`}
                  >
                    <span className="sr-only">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="mustache" className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-3">Mustache Style</h3>
            <RadioGroup
              value={options.mustacheStyle}
              onValueChange={(value) => updateOption("mustacheStyle", value)}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {mustacheStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2">
                  <RadioGroupItem value={style.value} id={`mustache-${style.value}`} />
                  <Label htmlFor={`mustache-${style.value}`}>{style.label}</Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {options.mustacheStyle !== "none" && (
            <div>
              <h3 className="text-lg font-medium mb-3">Mustache Color</h3>
              <div className="grid grid-cols-5 gap-3">
                {hairColors.map((color) => (
                  <button
                    key={color.value}
                    className={`h-12 rounded-md border-2 ${options.beardColor === color.value ? "border-primary" : "border-transparent"}`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => updateOption("beardColor", color.value)}
                    aria-label={`Mustache color: ${color.label}`}
                  >
                    <span className="sr-only">{color.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}

