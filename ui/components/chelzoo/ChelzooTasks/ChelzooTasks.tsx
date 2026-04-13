import { useTranslation } from "next-i18next";
import Image from 'next/image';
import TaskImage from "../../../public/images/img-chelzoo-tasks.jpg";
import { Task } from "./Task/Task";

export function ChelzooTasks() {
  const {
    t,
  } = useTranslation(`chelzooTasks`);

  return (
    <section
      className="chelzoo-tasks"
      data-testid="chelzoo-tasks"
    >
      <div className="chelzoo-tasks__wrapper">
        <div className="chelzoo-tasks__card">
          <Task
            label={t(`taskLabel`, {
              number: 1,
            })}
            text={t(`firstTaskText`)}
          />
        </div>

        <div className="chelzoo-tasks__image-wrapper">
          <Image
            className="chelzoo-tasks__image"
            src={TaskImage}
            alt=""
            fill
            placeholder="blur"
          />
        </div>

        <div className="chelzoo-tasks__card">
          <Task
            label={t(`taskLabel`, {
              number: 2,
            })}
            text={t(`secondTaskText`)}
          />
        </div>
      </div>
    </section>
  );
}
