import * as React from "react";
import clsx from "clsx";
import { twMerge } from "tailwind-merge";

// Função para mesclar classes, priorizando o Tailwind
export function cn(...inputs: (string | undefined)[]) {
  return twMerge(clsx(inputs.filter(Boolean))); // Remove valores indefinidos ou nulos
}

// Função utilitária para criar componentes reutilizáveis
function createComponent(baseClass: string) {
  return React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(
    ({ className, ...props }, ref) => (
      <div ref={ref} className={cn(baseClass, className)} {...props} />
    )
  );
}

// Componente Card e subcomponentes
const Card = createComponent(
  "rounded-xl border border-neutral-200 bg-white text-neutral-950 shadow dark:border-neutral-800 dark:bg-neutral-950 dark:text-neutral-50"
);
const CardHeader = createComponent("flex flex-col space-y-1.5 p-6");
const CardTitle = createComponent("font-semibold leading-none tracking-tight");
const CardDescription = createComponent("text-sm text-neutral-500 dark:text-neutral-400");
const CardContent = createComponent("p-6 pt-0");
const CardFooter = createComponent("flex items-center p-6 pt-0");

// Exportando os componentes
export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent };
