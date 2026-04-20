import clsx from "clsx";

export function DesignCard({
  title,
  description,
  className,
  theme,
}: {
  title: string;
  description: string;
  className: string;
  theme: 'purple' | 'pink' | 'yellow' | 'green';
}) {
  return (
    <li className={clsx(`design-card design-card--${theme} ${className}`)}>
      <h3 className="design-card__title">{title}</h3>
      <div className="design-card__description">{description}</div>
    </li>
  );
}
