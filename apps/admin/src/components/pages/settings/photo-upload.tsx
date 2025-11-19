"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage, Button } from "@repo/components";
import { Upload } from "lucide-react";

export function ProfilePhotoUpload() {
  const [avatarUrl, setAvatarUrl] = useState<string>("");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatarUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-2 justify-between py-6 border-b">
      <div>
        <h3 className="text-lg font-semibold">Profile Photo</h3>
        <p className="text-sm text-muted-foreground">
          Min 400x400px, PNG or JPEG formats.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <Avatar className="h-20 w-20">
          <AvatarImage src={avatarUrl} alt="Profile" />
          <AvatarFallback className="text-lg">RP</AvatarFallback>
        </Avatar>
        <Button variant="outline" asChild>
          <label className="cursor-pointer">
            <Upload className="mr-2 h-4 w-4" />
            Upload
            <input
              type="file"
              className="hidden"
              accept="image/png, image/jpeg"
              onChange={handleFileChange}
            />
          </label>
        </Button>
      </div>
    </div>
  );
}
