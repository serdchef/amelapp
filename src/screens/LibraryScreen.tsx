import React, { useState, useMemo } from 'react';
import {
  View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput,
} from 'react-native';
import { useTranslation } from 'react-i18next';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { colors, fonts, radius, spacing, globalStyles } from '../constants/theme';
import { useAppStore } from '../store/appStore';
import AmelItem from '../components/AmelItem';
import { storage } from '../services/storageService';
import { EXTENDED_AMELS } from '../constants/extendedAmels';

const CATEGORIES = [
  { id: 'zikirler', name: 'Zikirler', icon: '✨', color: '#1B3A28' },
  { id: 'salevatlar', name: 'Salevatlar', icon: '📿', color: '#B8860B' },
  { id: 'hamdler', name: 'Hamdler', icon: '🙌', color: '#2E8B57' },
  { id: 'istigfarlar', name: 'İstiğfarlar', icon: '🤲', color: '#4682B4' },
  { id: 'dualar', name: 'Dualar', icon: '🙏', color: '#8B4513' },
];

export default function LibraryScreen() {
  const { t } = useTranslation();
  const [selectedCat, setSelectedCat] = useState('zikirler');
  const [search, setSearch] = useState('');
  const store = useAppStore();

  const allAmels = useMemo(() => {
    return EXTENDED_AMELS[selectedCat] || [];
  }, [selectedCat]);

  const filteredAmels = useMemo(() => {
    const s = search.toLowerCase().trim();
    
    let pool = allAmels;
    if (s) {
      // Check if it's a page number search like "s 45" or "sayfa 45" or just "45"
      const pageMatch = s.match(/(?:s|sayfa|p|page)?\s*(\d+)/);
      const searchPage = pageMatch ? parseInt(pageMatch[1], 10) : null;

      pool = allAmels.filter(a => {
        const titleMatch = a.t.toLowerCase().includes(s);
        const fazMatch = a.faz.toLowerCase().includes(s);
        const textMatch = a.tr?.toLowerCase().includes(s) || a.txt?.toLowerCase().includes(s);
        const pageMatchBool = searchPage !== null && a.page === searchPage;
        
        return titleMatch || fazMatch || textMatch || pageMatchBool;
      });
    }

    // Sort by Title (Turkish locale aware)
    return [...pool].sort((a, b) => a.t.localeCompare(b.t, 'tr'));
  }, [allAmels, search]);

  return (
    <SafeAreaView style={globalStyles.screen} edges={['top']}>
      {/* HEADER */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('library.title', 'Zikir Kütüphanesi')}</Text>
        <Text style={styles.headerSubtitle}>{t('library.subtitle', 'Kitaptan Faziletli Ameller')}</Text>
      </View>

      {/* SEARCH */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={18} color={colors.ink4} />
          <TextInput
            style={styles.searchInput}
            placeholder={t('library.search_placeholder', 'Zikir veya fazilet ara...')}
            value={search}
            onChangeText={setSearch}
            placeholderTextColor={colors.ink4}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')}>
              <Ionicons name="close-circle" size={18} color={colors.ink4} />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* CATEGORIES */}
      <View style={styles.categoryContainer}>
        <FlatList
          data={CATEGORIES}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.categoryList}
          renderItem={({ item }) => {
            const isActive = item.id === selectedCat;
            return (
              <TouchableOpacity
                style={[styles.catTab, isActive && styles.catTabActive]}
                onPress={() => setSelectedCat(item.id)}
              >
                <Text style={[styles.catText, isActive && styles.catTextActive]}>
                  {item.icon} {item.name}
                </Text>
              </TouchableOpacity>
            );
          }}
        />
      </View>

      {/* LIST */}
      <FlatList
        data={filteredAmels}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listPadding}
        renderItem={({ item }) => (
          <AmelItem
            amel={item}
            bookmarked={store.bookmarkedAmels.includes(item.id)}
            onToggleBookmark={(id) => {
              store.toggleBookmark(id);
              const updated = store.bookmarkedAmels.includes(id)
                ? store.bookmarkedAmels.filter((x) => x !== id)
                : [...store.bookmarkedAmels, id];
              storage.saveBookmarks(updated);
            }}
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons name="library-outline" size={48} color={colors.cream3} />
            <Text style={styles.emptyText}>
              {search ? t('library.no_results', 'Sonuç bulunamadı') : t('library.loading', 'Yükleniyor...')}
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingHorizontal: spacing.md,
    paddingVertical: 16,
    backgroundColor: colors.white,
  },
  headerTitle: {
    fontFamily: fonts.playfair,
    fontSize: 24,
    color: colors.forest,
  },
  headerSubtitle: {
    fontFamily: fonts.dmSans,
    fontSize: 14,
    color: colors.ink3,
    marginTop: 2,
  },
  searchContainer: {
    paddingHorizontal: spacing.md,
    paddingBottom: 12,
    backgroundColor: colors.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.cream,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontFamily: fonts.dmSans,
    fontSize: 15,
    color: colors.ink,
  },
  categoryContainer: {
    backgroundColor: colors.white,
    borderBottomWidth: 1,
    borderBottomColor: colors.cream3,
  },
  categoryList: {
    paddingHorizontal: spacing.md,
    paddingBottom: 12,
    gap: 8,
  },
  catTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: colors.cream,
    borderWidth: 1,
    borderColor: colors.cream3,
  },
  catTabActive: {
    backgroundColor: colors.forest,
    borderColor: colors.forest,
  },
  catText: {
    fontFamily: fonts.dmSansMedium,
    fontSize: 13,
    color: colors.ink2,
  },
  catTextActive: {
    color: colors.white,
  },
  listPadding: {
    padding: spacing.md,
    paddingBottom: 100,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontFamily: fonts.dmSans,
    fontSize: 15,
    color: colors.ink4,
    marginTop: 12,
  },
});
