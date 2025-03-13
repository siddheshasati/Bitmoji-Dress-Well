"use client"

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ClothingOptionsProps {
  type: "top" | "bottom"
  options: any
  updateOption: (option: string, value: any) => void
}

export default function ClothingOptions({ type, options, updateOption }: ClothingOptionsProps) {
  const colors = [
    { value: "#ffffff", label: "White" },
    { value: "#000000", label: "Black" },
    { value: "#3b82f6", label: "Blue" },
    { value: "#ef4444", label: "Red" },
    { value: "#10b981", label: "Green" },
    { value: "#f59e0b", label: "Yellow" },
    { value: "#8b5cf6", label: "Purple" },
    { value: "#ec4899", label: "Pink" },
  ]

  const topTypes = [
    { value: "tshirt", label: "T-Shirt" },
    { value: "shirt", label: "Shirt" },
    { value: "polo", label: "Polo" },
    { value: "hoodie", label: "Hoodie" },
    { value: "sweater", label: "Sweater" },
    { value: "suit", label: "Suit" },
    { value: "kurta", label: "Kurta" },
    { value: "sherwani", label: "Sherwani" },
  ]

  const bottomTypes = [
    { value: "jeans", label: "Jeans" },
    { value: "chinos", label: "Chinos" },
    { value: "shorts", label: "Shorts" },
    { value: "trackpants", label: "Track Pants" },
    { value: "pajama", label: "Pajama" },
    { value: "formal", label: "Formal Pants" },
  ]

  const jacketTypes = [
    { value: "none", label: "None" },
    { value: "hoodie", label: "Hoodie" },
    { value: "blazer", label: "Blazer" },
    { value: "leather", label: "Leather Jacket" },
    { value: "denim", label: "Denim Jacket" },
    { value: "bomber", label: "Bomber Jacket" },
  ]

  const outfitSets = [
    { value: "casual", label: "Casual", top: "tshirt", bottom: "jeans", jacket: "none" },
    { value: "formal", label: "Formal", top: "shirt", bottom: "formal", jacket: "blazer" },
    { value: "business", label: "Business", top: "suit", bottom: "formal", jacket: "none" },
    { value: "sporty", label: "Sporty", top: "tshirt", bottom: "trackpants", jacket: "none" },
    { value: "traditional", label: "Traditional", top: "kurta", bottom: "pajama", jacket: "none" },
  ]

  const applyOutfitSet = (set: any) => {
    updateOption("topType", set.top)
    updateOption("bottomType", set.bottom)
    updateOption("jacketType", set.jacket)
  }

  if (type === "top") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Quick Outfits</h3>
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {outfitSets.map((set) => (
              <button
                key={set.value}
                className="p-3 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                onClick={() => applyOutfitSet(set)}
              >
                {set.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Top Type</h3>
          <RadioGroup
            value={options.topType}
            onValueChange={(value) => updateOption("topType", value)}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3"
          >
            {topTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={`top-${type.value}`} />
                <Label htmlFor={`top-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Top Color</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`h-12 rounded-md border-2 ${options.topColor === color.value ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
                onClick={() => updateOption("topColor", color.value)}
                aria-label={`Top color: ${color.label}`}
              >
                <span className="sr-only">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Jacket Type</h3>
          <RadioGroup
            value={options.jacketType}
            onValueChange={(value) => updateOption("jacketType", value)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {jacketTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={`jacket-${type.value}`} />
                <Label htmlFor={`jacket-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        {options.jacketType !== "none" && (
          <div>
            <h3 className="text-lg font-medium mb-3">Jacket Color</h3>
            <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
              {colors.map((color) => (
                <button
                  key={color.value}
                  className={`h-12 rounded-md border-2 ${options.jacketColor === color.value ? "border-primary" : "border-transparent"}`}
                  style={{ backgroundColor: color.value }}
                  onClick={() => updateOption("jacketColor", color.value)}
                  aria-label={`Jacket color: ${color.label}`}
                >
                  <span className="sr-only">{color.label}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  } else {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-3">Bottom Type</h3>
          <RadioGroup
            value={options.bottomType}
            onValueChange={(value) => updateOption("bottomType", value)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {bottomTypes.map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={`bottom-${type.value}`} />
                <Label htmlFor={`bottom-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Bottom Color</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {colors.map((color) => (
              <button
                key={color.value}
                className={`h-12 rounded-md border-2 ${options.bottomColor === color.value ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
                onClick={() => updateOption("bottomColor", color.value)}
                aria-label={`Bottom color: ${color.label}`}
              >
                <span className="sr-only">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Shoes Type</h3>
          <RadioGroup
            value={options.shoesType}
            onValueChange={(value) => updateOption("shoesType", value)}
            className="grid grid-cols-2 sm:grid-cols-3 gap-3"
          >
            {[
              { value: "sneakers", label: "Sneakers" },
              { value: "formal", label: "Formal Shoes" },
              { value: "boots", label: "Boots" },
              { value: "sandals", label: "Sandals" },
              { value: "slippers", label: "Slippers" },
              { value: "sports", label: "Sports Shoes" },
            ].map((type) => (
              <div key={type.value} className="flex items-center space-x-2">
                <RadioGroupItem value={type.value} id={`shoes-${type.value}`} />
                <Label htmlFor={`shoes-${type.value}`}>{type.label}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Shoes Color</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {colors.slice(0, 5).map((color) => (
              <button
                key={color.value}
                className={`h-12 rounded-md border-2 ${options.shoesColor === color.value ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
                onClick={() => updateOption("shoesColor", color.value)}
                aria-label={`Shoes color: ${color.label}`}
              >
                <span className="sr-only">{color.label}</span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-lg font-medium mb-3">Socks Color</h3>
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-3">
            {colors.slice(0, 3).map((color) => (
              <button
                key={color.value}
                className={`h-12 rounded-md border-2 ${options.socksColor === color.value ? "border-primary" : "border-transparent"}`}
                style={{ backgroundColor: color.value }}
                onClick={() => updateOption("socksColor", color.value)}
                aria-label={`Socks color: ${color.label}`}
              >
                <span className="sr-only">{color.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    )
  }
}

