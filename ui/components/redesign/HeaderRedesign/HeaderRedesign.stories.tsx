import translations from '../../../public/locales/ru/headerRedesign.json';
import { RouterTestProvider } from "../../../playwright-tests/RouterTestProvider";
import { HeaderRedesign } from "./HeaderRedesign";

export function HeaderRedesignStory() {
  return (
    <RouterTestProvider routerOptions={{
      locale: `ru`,
    }}
    >
      <HeaderRedesign {...translations} />
    </RouterTestProvider>
  );
}
