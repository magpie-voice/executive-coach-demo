import { SVGProps } from "react";

const paths: Record<string, React.ReactNode> = {
  arrowRight: <><path d="M5 12h14"/><path d="m13 5 7 7-7 7"/></>,
  arrowLeft: <><path d="M19 12H5"/><path d="m11 19-7-7 7-7"/></>,
  arrowUp: <><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></>,
  arrowDown: <><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></>,
  check: <path d="M5 12.5 10 17 19 7"/>,
  sparkle: <><path d="M12 3v3M12 18v3M3 12h3M18 12h3M5.6 5.6l2.1 2.1M16.3 16.3l2.1 2.1M5.6 18.4l2.1-2.1M16.3 7.7l2.1-2.1"/></>,
  waveform: <><path d="M3 12h2M7 8v8M11 4v16M15 8v8M19 12h2"/></>,
  mic: <><rect x="9" y="3" width="6" height="12" rx="3"/><path d="M5 11a7 7 0 0 0 14 0"/><path d="M12 18v3"/></>,
  user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6"/></>,
  target: <><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none"/></>,
  chart: <><path d="M4 4v16h16"/><path d="M8 14l3-3 3 3 5-5"/></>,
  clock: <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  home: <><path d="M4 11 12 4l8 7"/><path d="M6 10v9h12v-9"/></>,
  stop: <rect x="6" y="6" width="12" height="12" rx="2"/>,
  play: <path d="M8 5v14l11-7z"/>,
  plus: <><path d="M12 5v14"/><path d="M5 12h14"/></>,
  handshake: <><path d="M3 12l4-4 5 4 5-4 4 4"/><path d="M7 12l4 4 2-2 4 4"/></>,
  scale: <><path d="M12 4v16"/><path d="M4 8h16"/><path d="m4 8-2 6a3 3 0 0 0 6 0z"/><path d="m20 8-2 6a3 3 0 0 0 6 0z"/></>,
  coins: <><ellipse cx="12" cy="7" rx="8" ry="3"/><path d="M4 7v6c0 1.7 3.6 3 8 3s8-1.3 8-3V7"/><path d="M4 13v4c0 1.7 3.6 3 8 3s8-1.3 8-3v-4"/></>,
  ear: <><path d="M6 9a6 6 0 0 1 12 0c0 3-2 3-2 6s-2 4-4 4-2-2-2-4"/><path d="M9 9a3 3 0 0 1 6 0"/></>,
  heart: <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/>,
  shield: <><path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z"/></>,
  eye: <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  compass: <><circle cx="12" cy="12" r="9"/><path d="m9 15 2-5 5-2-2 5z"/></>,
  chevronR: <path d="m9 6 6 6-6 6"/>,
  chevronD: <path d="m6 9 6 6 6-6"/>,
  trend: <><path d="M3 17l6-6 4 4 8-8"/><path d="M14 7h7v7"/></>,
  bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
  refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
  book: <><path d="M4 4h11a4 4 0 0 1 4 4v12H8a4 4 0 0 1-4-4z"/><path d="M4 16a4 4 0 0 1 4-4h11"/></>,
  flame: <path d="M12 21c4 0 7-2.5 7-6.5 0-2-1-3.5-2.5-4.5.5 2-.5 3-1.5 3 0-3-2-5.5-5-7 .5 3-2 5-2 8.5C8 18 9.5 21 12 21z"/>,
  sparkles2: <><path d="M10 4l1.5 4L15 9l-3.5 1L10 14l-1.5-4L5 9l3.5-1z"/><path d="M18 14l.8 2 2 .8-2 .8L18 20l-.8-2-2-.8 2-.8z"/></>,
};

interface IconProps extends SVGProps<SVGSVGElement> {
  name: string;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({ name, size = 18, strokeWidth = 1.5, color = "currentColor", style, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={style}
      {...rest}
    >
      {paths[name]}
    </svg>
  );
}
