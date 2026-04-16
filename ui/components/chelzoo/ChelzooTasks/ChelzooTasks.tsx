import { useTranslation } from "next-i18next";
import Image from 'next/image';
import { useRouter } from "next/router";
import TaskImage from "../../../public/images/chelzoo-tasks.jpg";
import TaskImageEng from "../../../public/images/chelzoo-tasks-eng.jpg";
import { Task } from "./Task/Task";

export function ChelzooTasks() {
  const {
    t,
  } = useTranslation(`chelzooTasks`);

  const {
    locale,
  } = useRouter();

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
            src={locale === `ru` ? TaskImage : TaskImageEng}
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
