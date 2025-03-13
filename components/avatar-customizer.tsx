"use client"

import { useState, useRef } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Download, Eye, Shirt, PenIcon as Pants, Glasses, User, Palette } from "lucide-react"
import FaceOptions from "./face-options"
import HairOptions from "./hair-options"
import ClothingOptions from "./clothing-options"
import AccessoryOptions from "./accessory-options"
import AvatarPreview from "./avatar-preview"

export default function AvatarCustomizer() {
  const [activeTab, setActiveTab] = useState("face")
  const [avatarOptions, setAvatarOptions] = useState({
    faceShape: "oval",
    skinTone: "#f8d5c2",
    hairStyle: "short",
    hairColor: "#3a3a3a",
    beardStyle: "none",
    beardColor: "#3a3a3a",
    mustacheStyle: "none",
    eyeColor: "#5b7553",
    outfit: {
      topType: "tshirt",
      topColor: "#3b82f6",
      bottomType: "jeans",
      bottomColor: "#1e40af",
      jacketType: "none",
      jacketColor: "#000000",
      shoesType: "sneakers",
      shoesColor: "#ffffff",
      socksColor: "#ffffff",
      glassesType: "none",
      beltType: "none",
      watchType: "none",
      hatType: "none",
    },
  })

  const canvasRef = useRef<HTMLCanvasElement>(null)

  const updateAvatarOption = (category: string, option: string, value: any) => {
    if (category === "outfit") {
      setAvatarOptions((prev) => ({
        ...prev,
        outfit: {
          ...prev.outfit,
          [option]: value,
        },
      }))
    } else {
      setAvatarOptions((prev) => ({
        ...prev,
        [option]: value,
      }))
    }
  }

  const downloadAvatar = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.download = "my-avatar.png"
    link.href = dataUrl
    link.click()
  }

  const viewFullAvatar = () => {
    const canvas = canvasRef.current
    if (!canvas) return

    const dataUrl = canvas.toDataURL("image/png")
    const win = window.open()
    if (win) {
      win.document.write(`<img src="${dataUrl}" alt="Full Avatar" style="max-width: 100%; height: auto;"/>`)
    }
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <div className="lg:col-span-2">
        <Card className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid grid-cols-5 mb-6">
              <TabsTrigger value="face" className="flex flex-col items-center gap-1">
                <User size={18} />
                <span className="text-xs">Face</span>
              </TabsTrigger>
              <TabsTrigger value="hair" className="flex flex-col items-center gap-1">
                <Palette size={18} />
                <span className="text-xs">Hair</span>
              </TabsTrigger>
              <TabsTrigger value="tops" className="flex flex-col items-center gap-1">
                <Shirt size={18} />
                <span className="text-xs">Tops</span>
              </TabsTrigger>
              <TabsTrigger value="bottoms" className="flex flex-col items-center gap-1">
                <Pants size={18} />
                <span className="text-xs">Bottoms</span>
              </TabsTrigger>
              <TabsTrigger value="accessories" className="flex flex-col items-center gap-1">
                <Glasses size={18} />
                <span className="text-xs">Accessories</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="face" className="mt-0">
              <FaceOptions
                options={avatarOptions}
                updateOption={(option, value) => updateAvatarOption("face", option, value)}
              />
            </TabsContent>

            <TabsContent value="hair" className="mt-0">
              <HairOptions
                options={avatarOptions}
                updateOption={(option, value) => updateAvatarOption("hair", option, value)}
              />
            </TabsContent>

            <TabsContent value="tops" className="mt-0">
              <ClothingOptions
                type="top"
                options={avatarOptions.outfit}
                updateOption={(option, value) => updateAvatarOption("outfit", option, value)}
              />
            </TabsContent>

            <TabsContent value="bottoms" className="mt-0">
              <ClothingOptions
                type="bottom"
                options={avatarOptions.outfit}
                updateOption={(option, value) => updateAvatarOption("outfit", option, value)}
              />
            </TabsContent>

            <TabsContent value="accessories" className="mt-0">
              <AccessoryOptions
                options={avatarOptions.outfit}
                updateOption={(option, value) => updateAvatarOption("outfit", option, value)}
              />
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      <div>
        <Card className="p-6 flex flex-col items-center">
          <h2 className="text-xl font-semibold mb-4">Your Avatar</h2>
          <div className="relative w-full aspect-square mb-6 bg-white rounded-lg overflow-hidden">
            <AvatarPreview options={avatarOptions} canvasRef={canvasRef} />
          </div>

          <div className="flex gap-3 w-full">
            <Button onClick={viewFullAvatar} className="flex-1 flex items-center gap-2" variant="outline">
              <Eye size={18} />
              View Avatar
            </Button>
            <Button onClick={downloadAvatar} className="flex-1 flex items-center gap-2">
              <Download size={18} />
              Download
            </Button>
          </div>
        </Card>
      </div>
    </div>
  )
}

