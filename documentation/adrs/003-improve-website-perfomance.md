# 003: Improve website performance by optimizing images using Next.js.

## Status
Accepted(2026-04-27)

## Accepted
Image optimization consumes a significant amount of CPU and RAM, causing some services to hit resource limits and crash. As a result, the site may stop working, and users will see a 500 error.

## Decision
Convert images to WEBP instead of AVIF.

## Rationale
The [documentation](https://nextjs.org/docs/pages/api-reference/components/image#formats) states that conversion to AVIF consumes 50% more resources than conversion to WEBP. At the same time, AVIF is only 20% smaller, which is not critical.

## Consequences
Using WEBP significantly speeds up image loading on website pages, while the server’s CPU and RAM are not overloaded, ensuring that services run stably and load for users.

## Alternatives

### Disable NextJS image optimization

Advantages:
 - Server load will be minimal because resources will no longer be spent on image optimization

Disadvantages:
 - You will have to manually pre-optimize each image for different screen resolutions and convert it to WEBP
 - You lose the Next.js features that allow images to be automatically adapted to different screen resolutions
