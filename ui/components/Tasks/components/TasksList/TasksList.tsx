import { usePath } from "../../../../common/hooks";

export function TasksList({
  tasks,
}: {
  tasks: string[];
}) {
  const {
    slicePathname,
  } = usePath();

  return (
    <ul className="tasks-list">
      {tasks.map((text, index) => (
        <li
          key={text}
          className="tasks-list__item"
        >
          <div className={`tasks-list__number tasks-list__number--${slicePathname}`}>{index + 1}</div>
          <span className="tasks-list__text">{text}</span>
        </li>
      ))}
    </ul>
  );
}
