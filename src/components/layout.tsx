import { PropsWithChildren } from "react";

// eslint-disable-next-line @typescript-eslint/ban-types
export const PageLayout = (props: PropsWithChildren<{}>) => {
  return (
    <main className="flex h-screen justify-center">
      <div className="scrollbar-hide w-full overflow-y-scroll border-x border-slate-400 md:max-w-2xl">
        {props.children}
      </div>
    </main>
  );
};
