import { IconType } from "react-icons";
import { FaJs, FaNodeJs, FaBootstrap, FaHtml5, FaCss3Alt } from "react-icons/fa";
// import { iconLibrary } from "@/once-ui/icons";

import {
  HiChevronUp,
  HiChevronDown,
  HiChevronRight,
  HiChevronLeft,
  HiArrowUpRight,
  HiOutlineArrowPath,
  HiCheck,
  HiMiniQuestionMarkCircle,
  HiMiniXMark,
  HiOutlineLink,
  HiExclamationTriangle,
  HiInformationCircle,
  HiExclamationCircle,
  HiCheckCircle,
  HiMiniGlobeAsiaAustralia,
  HiArrowTopRightOnSquare,
  HiEnvelope,
  HiCalendarDays,
  HiClipboard,
  HiArrowRight,
  HiOutlineEye,
  HiOutlineEyeSlash,
} from "react-icons/hi2";
import { FaDocker, FaWordpress, FaPhp } from "react-icons/fa";
import { SiSymfony, SiComposer, SiReact, SiNextdotjs, SiMariadb,
  SiMysql, SiTypescript,
  SiFigma,
  SiAdobephotoshop,

} from "react-icons/si";

import {
  PiHouseDuotone,
  PiUserCircleDuotone,
  PiGridFourDuotone,
  PiBookBookmarkDuotone,
  PiImageDuotone,
} from "react-icons/pi";

import { FaDiscord, FaGithub, FaLinkedin, FaXTwitter } from "react-icons/fa6";

export const iconLibrary: Record<string, IconType> = {
  chevronUp: HiChevronUp,
  chevronDown: HiChevronDown,
  chevronRight: HiChevronRight,
  chevronLeft: HiChevronLeft,
  refresh: HiOutlineArrowPath,
  arrowUpRight: HiArrowUpRight,
  check: HiCheck,
  arrowRight: HiArrowRight,
  helpCircle: HiMiniQuestionMarkCircle,
  infoCircle: HiInformationCircle,
  warningTriangle: HiExclamationTriangle,
  errorCircle: HiExclamationCircle,
  checkCircle: HiCheckCircle,
  email: HiEnvelope,
  globe: HiMiniGlobeAsiaAustralia,
  person: PiUserCircleDuotone,
  grid: PiGridFourDuotone,
  book: PiBookBookmarkDuotone,
  close: HiMiniXMark,
  openLink: HiOutlineLink,
  calendar: HiCalendarDays,
  home: PiHouseDuotone,
  gallery: PiImageDuotone,
  discord: FaDiscord,
  eye: HiOutlineEye,
  eyeOff: HiOutlineEyeSlash,
  github: FaGithub,
  linkedin: FaLinkedin,
  x: FaXTwitter,
  clipboard: HiClipboard,
  arrowUpRightFromSquare: HiArrowTopRightOnSquare,
  javascript: FaJs,
  nodejs: FaNodeJs,
  bootstrap: FaBootstrap,
  html5: FaHtml5,
  css3: FaCss3Alt,
  docker: FaDocker, // Docker
  symfony: SiSymfony, // Symfony
  composer: SiComposer, // Composer
  wordpress: FaWordpress, // WordPress
  php: FaPhp, // PHP
  react: SiReact, // React
  nextjs: SiNextdotjs, // Next.js
  mariadb: SiMariadb, // MariaDB
  mysql: SiMysql, // MySQL
  typescript: SiTypescript, // TypeScript
  figma: SiFigma, // Figma
  photoshop: SiAdobephotoshop, // Photoshop




};
