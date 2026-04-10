import Image from "next/image";

export function ImageWithBlur({
  src,
  blurDataURL,
  priority,
  fetchPriority,
  alt = ``,
}: {
  src: string;
  blurDataURL?: string;
  priority?: boolean;
  fetchPriority?: 'high' | 'low' | 'auto';
  alt?: string;
}) {
  return (
    <Image
      src={src}
      fill
      alt={alt}
      {...(blurDataURL && {
        placeholder: `blur`,
        blurDataURL,
      })}
      priority={priority}
      fetchPriority={fetchPriority}
    />
  );
}
