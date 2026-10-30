/* eslint-disable @next/next/no-img-element */

function NextImageMock({
  src,
  alt,
  fill,
  ...props
}: any) {
  return (
    <img
      src={typeof src === `object` && src !== null ? src.src : src}
      alt={alt || ``}
      style={fill ? {
        position: `absolute`,
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        width: `100%`,
        height: `100%`,
      } : {}}
      {...props}
    />
  );
}

export default NextImageMock;
