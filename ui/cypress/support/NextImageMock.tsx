/* eslint-disable @next/next/no-img-element */

import Image from "next/image";

function NextImageMock({
  src,
  alt,
  ...props
}: any) {
  return (
    <Image
      {...props}
      unoptimized
      alt={alt || ``}
    />
  );
}

export default NextImageMock;
