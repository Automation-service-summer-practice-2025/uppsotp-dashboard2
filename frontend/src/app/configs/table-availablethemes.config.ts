import {
  colorSchemeDarkBlue,
  colorSchemeDarkWarm,
  colorSchemeLightCold,
  colorSchemeLightWarm,
  themeBalham,
  themeMaterial,
  themeQuartz,
} from 'ag-grid-community';

export const availableThemes = [
  {
    name: 'Quartz Dark Blue',
    theme: themeQuartz.withPart(colorSchemeDarkBlue),
  },
  {
    name: 'Quartz Dark Warm',
    theme: themeQuartz.withPart(colorSchemeDarkWarm),
  },
  {
    name: 'Quartz Light Warm',
    theme: themeQuartz.withPart(colorSchemeLightWarm),
  },
  {
    name: 'Quartz Light Cold',
    theme: themeQuartz.withPart(colorSchemeLightCold),
  },
  {
    name: 'Balham Light',
    theme: themeBalham.withPart(colorSchemeLightWarm),
  },
  {
    name: 'Balham Dark',
    theme: themeBalham.withPart(colorSchemeDarkWarm),
  },
  {
    name: 'Material Light',
    theme: themeMaterial.withPart(colorSchemeLightCold),
  },
  {
    name: 'Material Dark',
    theme: themeMaterial.withPart(colorSchemeDarkBlue),
  },
];
