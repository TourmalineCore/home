import Image from "next/image";

export function ImageWithBlur({
  src,
  blurDataURL,
  alt = ``,
}: {
  src: string;
  blurDataURL?: string;
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
    />
  );
}
