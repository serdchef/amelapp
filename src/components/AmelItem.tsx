import React, { useState } from 'react';
import {
  View, Text, TouchableOpacity, StyleSheet, LayoutAnimation, Platform, UIManager, Share, Clipboard,
} from 'react-native';
import { colors, fonts, radius, spacing } from '../constants/theme';
import type { Amel } from '../types';
import { useTranslation } from 'react-i18next';

if (Platform.OS === 'android') {
  UIManager.setLayoutAnimationEnabledExperimental?.(true);
}

interface Props {
  amel: Amel;
  bookmarked?: boolean;
  onToggleBookmark?: (id: string) => void;
}

export default function AmelItem({ amel, bookmarked, onToggleBookmark }: Props) {
  const { i18n } = useTranslation();
  const [expanded, setExpanded] = useState(false);
  const lang = i18n.language;
  const isTr = lang === 'tr';
  const isUr = lang === 'ur';

  const displayTitle = isUr ? (amel.ur_t || amel.t) : (lang !== 'tr' && amel.en_t) ? amel.en_t : amel.t;
  const displayFaz   = isUr ? (amel.ur_faz || amel.faz) : (lang !== 'tr' && amel.en_faz) ? amel.en_faz : amel.faz;
  const displayTxt   = isUr ? (amel.ur_txt || amel.txt) : amel.txt;

  function toggle() {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setExpanded((v) => !v);
  }

  async function handleShare() {
    const text = `
✨ ${displayTitle} (Sayfa: ${amel.page || '-'})
--------------------
📖 Arapça: ${amel.ar || '-'}
--------------------
📖 Türkçe: ${displayTxt}
--------------------
📌 Fazileti: ${displayFaz}
--------------------
📚 Kaynak: ${amel.src}

(Faziletli Ameller Uygulamasından Paylaşıldı)
    `.trim();

    try {
      await Share.share({ message: text });
    } catch (error) {
      console.warn('Share error:', error);
    }
  }

  function handleCopyArabic() {
    if (amel.ar) {
      Clipboard.setString(amel.ar);
      // Optional: Add a toast/alert here if needed
    }
  }

  return (
    <TouchableOpacity
      activeOpacity={0.85}
      onPress={toggle}
      style={[styles.container, expanded && styles.expanded]}
    >
      {/* Başlık satırı */}
      <View style={styles.top}>
        <Text style={styles.title} numberOfLines={expanded ? undefined : 2}>
          {displayTitle}
        </Text>
        {amel.k ? <Text style={styles.kac}>{amel.k}</Text> : null}
      </View>

      {/* Fazilet */}
      <View style={styles.fazRow}>
        <Text style={styles.faz} numberOfLines={expanded ? undefined : 1}>
          ✦ {displayFaz}
        </Text>
        {amel.page ? <Text style={styles.pageBadge}>s. {amel.page}</Text> : null}
      </View>

      {/* Genişletilmiş içerik */}
      {expanded && (
        <View style={styles.body}>
          {/* Arapça metin */}
          {amel.ar ? (
            <View style={styles.arabicWrap}>
              <Text style={styles.arabic}>{amel.ar}</Text>
            </View>
          ) : null}

          {/* Metin (Okunuş/Açıklama) */}
          <Text style={styles.txt}>{displayTxt}</Text>

          {/* Kaynak + bookmark */}
          <View style={styles.footer}>
            <Text style={styles.src}>📚 {amel.src}</Text>
            <View style={styles.footerRight}>
              {amel.ar && (
                <TouchableOpacity onPress={handleCopyArabic} style={styles.footerBtn}>
                  <Text style={styles.footerIcon}>📋</Text>
                </TouchableOpacity>
              )}
              <TouchableOpacity onPress={handleShare} style={styles.footerBtn}>
                <Text style={styles.footerIcon}>📤</Text>
              </TouchableOpacity>
              {onToggleBookmark && (
                <TouchableOpacity
                  onPress={() => onToggleBookmark(amel.id)}
                  style={styles.footerBtn}
                >
                  <Text style={styles.footerIcon}>{bookmarked ? '🔖' : '🏷️'}</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.cream,
    borderRadius: radius.r2,
    padding: 12,
    marginBottom: 7,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  expanded: {
    backgroundColor: colors.white,
    borderColor: colors.cream3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 2,
  },
  top: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
  },
  title: {
    flex: 1,
    fontSize: 13.5,
    fontFamily: fonts.dmSansSemiBold,
    color: colors.ink,
    lineHeight: 19,
  },
  kac: {
    backgroundColor: colors.sage3,
    color: colors.forest2,
    borderRadius: 6,
    paddingHorizontal: 7,
    paddingVertical: 2,
    fontSize: 10.5,
    fontFamily: fonts.dmSansSemiBold,
    flexShrink: 0,
  },
  fazRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 3,
  },
  faz: {
    flex: 1,
    fontSize: 11.5,
    color: colors.gold,
    fontFamily: fonts.dmSansMedium,
  },
  pageBadge: {
    fontSize: 10,
    fontFamily: fonts.dmSans,
    color: colors.ink4,
    backgroundColor: colors.cream2,
    paddingHorizontal: 6,
    paddingVertical: 1,
    borderRadius: 4,
    marginLeft: 8,
  },
  body: {
    marginTop: 11,
    paddingTop: 11,
    borderTopWidth: 1,
    borderTopColor: colors.cream3,
  },
  arabicWrap: {
    backgroundColor: 'rgba(27,58,40,0.04)',
    borderRadius: radius.r1,
    padding: 12,
    marginBottom: 10,
    borderRightWidth: 3,
    borderRightColor: colors.gold2,
  },
  arabic: {
    fontFamily: fonts.amiri,
    fontSize: 18,
    lineHeight: 36,
    textAlign: 'right',
    color: colors.forest,
    writingDirection: 'rtl',
  },
  txt: {
    fontSize: 12.5,
    lineHeight: 21,
    color: colors.ink3,
    fontFamily: fonts.dmSans,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 7,
  },
  src: {
    fontSize: 10.5,
    color: colors.ink4,
    fontFamily: fonts.dmSans,
    flex: 1,
  },
  footerRight: {
    flexDirection: 'row',
    gap: 12,
  },
  footerBtn: {
    padding: 6,
    backgroundColor: colors.cream,
    borderRadius: 8,
  },
  footerIcon: {
    fontSize: 15,
  },
});
