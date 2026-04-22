export function Task({
  label,
  text,
}: {
  label: string;
  text: string;
}) {
  return (
    <div className="task">
      <div className="task__card">
        <div className="task__label">
          {label}
        </div>
        <p className="task__text">
          {text}
        </p>
      </div>
    </div>
  );
}
