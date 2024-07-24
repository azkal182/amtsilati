import { FontAwesome5 } from "@expo/vector-icons";
import { type IconProps } from "@expo/vector-icons/build/createIconSet";
import { type ComponentProps } from "react";

export function TabBarIcon({
  style,
  ...rest
}: IconProps<ComponentProps<typeof FontAwesome5>["name"]>) {
  return (
    <FontAwesome5 size={28} style={[{ marginBottom: -3 }, style]} {...rest} />
  );
}
