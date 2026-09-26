/* Type declarations for the React Bits SlingButton (installed as SlingButton.jsx).
   Place this next to SlingButton.jsx at src/components/SlingButton.d.ts so
   TypeScript can resolve the default import from a .jsx module. */
import type { FC } from "react";

export interface SlingButtonProps {
  /** Fired when the slingshot is launched (or tapped, if `tapSends`). */
  onSend?: () => void;
  padColor?: string;
  iconColor?: string;
  accentColor?: string;
  wellColor?: string;
  bandColor?: string;
  size?: number;
  strokeWidth?: number;
  armAt?: number;
  maxPull?: number;
  launchSpeed?: number;
  recoil?: number;
  flight?: number;
  particles?: number;
  spread?: number;
  axis?: "any" | "x" | "y";
  tapSends?: boolean;
  disabled?: boolean;
  className?: string;
}

declare const SlingButton: FC<SlingButtonProps>;
export default SlingButton;