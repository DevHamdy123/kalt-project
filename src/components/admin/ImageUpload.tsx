"use client";

import {
  CldUploadWidget,
  CloudinaryUploadWidgetResults,
} from "next-cloudinary";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
  disabled?: boolean;
  onChange: (value: string) => void;
  onRemove: (value: string) => void;
  value: string[];
}

export default function ImageUpload({
  disabled,
  onChange,
  onRemove,
  value,
}: ImageUploadProps) {
  const onUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    // التأكد من أن البيانات راجعة ككائن وتحتوي على الرابط
    if (
      typeof result.info === "object" &&
      result.info !== null &&
      "secure_url" in result.info
    ) {
      // التعديل هنا: بنبعت الرابط الجديد فوراً لـ onChange عشان يروح للفورم
      onChange(result.info.secure_url as string);
    }
  };

  return (
    <div>
      <div className="mb-4 flex flex-wrap items-center gap-4">
        {/* التعديل هنا: بنعمل Map مباشرة على الـ Props "value" */}
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden bg-zinc-100 border border-zinc-200 dark:bg-[#181a1e] dark:border-[#313338] transition-colors"
          >
            <div className="z-10 absolute top-2 right-2">
              <button
                type="button"
                onClick={() => onRemove(url)}
                className="p-1.5 bg-[#ff7782] hover:bg-red-600 transition rounded-md text-white shadow-md"
              >
                <Trash className="h-4 w-4" />
              </button>
            </div>
            <Image
              fill
              className="object-contain p-2"
              alt="Product Image"
              src={url}
            />
          </div>
        ))}
      </div>

      {/* التعديل هنا: بنستخدم onSuccess بدل onUpload عشان الـ Widget الجديد */}
      <CldUploadWidget onSuccess={onUploadSuccess} uploadPreset="kalt_store">
        {({ open }) => {
          return (
            <button
              type="button"
              disabled={disabled}
              onClick={() => open()}
              className="px-4 py-2.5 bg-[#363949] dark:bg-[#202528] text-white dark:text-[#edeffd] border border-transparent dark:border-[#313338] hover:bg-[#ff5c00] dark:hover:bg-[#ff5c00] transition-colors rounded-md flex items-center gap-2 text-sm font-medium disabled:opacity-50"
            >
              <ImagePlus className="h-4 w-4" />
              Upload image
            </button>
          );
        }}
      </CldUploadWidget>
    </div>
  );
}
