import { TAILWIND_COLORS } from "../constants/colors";

export const getColorShades = (color: string, type: "primary" | "secondary") => {
  const baseColor = color.split("-")[0];

  const colors = Object.entries(TAILWIND_COLORS[baseColor as keyof typeof TAILWIND_COLORS])
    .reduce((acc, [key, value]) => {
      acc[type + '-' + key] = value;
      return acc;
    }, {} as Record<string, string>);

  return colors;
}
