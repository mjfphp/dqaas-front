import chroma from 'chroma-js';
import { ColorPalette } from '../models/color-palette.model';

// Colors_______________________________________________
const PRIMARY_COLOR: string = '#FF4C89';

// Palette functions____________________________________
const getBrightenValue = (color: string, level: number): string => {
    return chroma(color).brighten(level).hex();
};

const getDarkenValue = (color: string, level: number): string => {
    return chroma(color).darken(level).hex();
};

// Primary color palette________________________________
export const primaryPalette: ColorPalette = {
  50: getBrightenValue(PRIMARY_COLOR, 4.5),
  100: getBrightenValue(PRIMARY_COLOR, 4),
  200: getBrightenValue(PRIMARY_COLOR, 3),
  300: getBrightenValue(PRIMARY_COLOR, 2),
  400: getBrightenValue(PRIMARY_COLOR, 1),
  500: PRIMARY_COLOR,
  600: getDarkenValue(PRIMARY_COLOR, 1),
  700: getDarkenValue(PRIMARY_COLOR, 2),
  800: getDarkenValue(PRIMARY_COLOR, 3),
  900: getDarkenValue(PRIMARY_COLOR, 4),
  950: getDarkenValue(PRIMARY_COLOR, 5),
};
