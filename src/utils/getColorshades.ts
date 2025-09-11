import { TAILWIND_COLORS } from "../constants/colors";

export const getColorShades = (color: string) => {
  const baseColor = color.split("-")[0];
  return {
    ...TAILWIND_COLORS[baseColor as keyof typeof TAILWIND_COLORS],
  };
}
