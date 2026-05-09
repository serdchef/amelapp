import { StyleSheet } from 'react-native';

// ─── COLORS ──────────────────────────────────────────────
export const colors = {
  cream:   '#F7F2E8',
  cream2:  '#EDE7D5',
  cream3:  '#E2D9C4',

  forest:  '#1B3A28',
  forest2: '#2C5F3F',
  forest3: '#3D7A54',

  sage:    '#7FA882',
  sage2:   '#A8C5A0',
  sage3:   '#D4E8D0',

  gold:    '#B8920E',
  gold2:   '#D4AE18',
  gold3:   '#F0D060',
  gold4:   '#FBF2D0',

  ink:     '#1A1A14',
  ink2:    '#3D3D30',
  ink3:    '#6B6B58',
  ink4:    '#9B9B85',

  white:   '#FFFFFF',
  danger:  '#C0392B',
  dangerBg:'#FDECEA',
  warn:    '#E67E22',
  warnBg:  '#FEF3E8',
};

// ─── TYPOGRAPHY ──────────────────────────────────────────
export const fonts = {
  playfair: 'PlayfairDisplay_700Bold',
  playfairRegular: 'PlayfairDisplay_400Regular',
  dmSans:   'DMSans_400Regular',
  dmSansMedium: 'DMSans_500Medium',
  dmSansSemiBold: 'DMSans_600SemiBold',
  amiri:    'Amiri_400Regular',
};

// ─── SPACING ─────────────────────────────────────────────
export const spacing = {
  xs: 4,
  sm: 8,
  md: 14,
  lg: 20,
  xl: 28,
};

// ─── RADIUS ──────────────────────────────────────────────
export const radius = {
  r1: 8,
  r2: 14,
  r3: 20,
  r4: 28,
};

// ─── SHADOWS ─────────────────────────────────────────────
export const shadows = {
  sh1: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 8,
    elevation: 3,
  },
  sh2: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.09,
    shadowRadius: 16,
    elevation: 5,
  },
  sh3: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.13,
    shadowRadius: 24,
    elevation: 8,
  },
};

// ─── GLOBAL STYLES ───────────────────────────────────────
export const globalStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.cream,
  },
  sectionLabel: {
    fontSize: 10.5,
    fontFamily: fonts.dmSansSemiBold,
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    color: colors.ink4,
    marginBottom: 9,
  },
  section: {
    paddingHorizontal: spacing.md,
    marginBottom: spacing.md,
  },
});
