export interface SpacingProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
}
const Spacing: React.FC<SpacingProps> = ({ size = "md" }) => {
  return <div className={`${SpacingSizeMap[size]}`} />;
};

export default Spacing;

const SpacingSizeMap = {
  xs: "w-1 h-1",
  sm: "w-3 h-3",
  md: "w-4 h-4",
  lg: "w-9 h-9",
  xl: "w-12 h-12",
};
