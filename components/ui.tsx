import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "ghost" | "danger";

const VARIANTS: Record<Variant, string> = {
  primary: "bg-teal-600 text-white shadow-sm hover:bg-teal-700 disabled:bg-slate-300 disabled:text-slate-500",
  secondary: "border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 disabled:text-slate-400",
  ghost: "text-slate-600 hover:bg-slate-100 disabled:text-slate-400",
  danger: "border border-red-200 bg-white text-red-700 hover:bg-red-50 disabled:text-slate-400",
};

export function Button({
  variant = "secondary",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return (
    <button
      type="button"
      className={`inline-flex items-center justify-center gap-2 rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`}
      {...props}
    />
  );
}

export function StepHeading({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="mb-5">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {children && <p className="mt-1 text-sm text-slate-500">{children}</p>}
    </div>
  );
}

export function Card({ className = "", children }: { className?: string; children: ReactNode }) {
  return <div className={`rounded-xl border border-slate-200 bg-white p-4 shadow-sm ${className}`}>{children}</div>;
}

export function Alert({ tone = "warning", children }: { tone?: "warning" | "error" | "info"; children: ReactNode }) {
  const tones = {
    warning: "border-amber-200 bg-amber-50 text-amber-800",
    error: "border-red-200 bg-red-50 text-red-700",
    info: "border-sky-200 bg-sky-50 text-sky-800",
  };
  return (
    <div role={tone === "info" ? "status" : "alert"} className={`rounded-lg border px-3 py-2 text-sm ${tones[tone]}`}>
      {children}
    </div>
  );
}

export function StepFooter({ children }: { children: ReactNode }) {
  return <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-slate-100 pt-4">{children}</div>;
}

export function formatArea(areaM2: number): { hectares: string; squareMetres: string } {
  return {
    hectares: `${(areaM2 / 10_000).toLocaleString(undefined, { maximumFractionDigits: 2 })} ha`,
    squareMetres: `${Math.round(areaM2).toLocaleString()} m²`,
  };
}
