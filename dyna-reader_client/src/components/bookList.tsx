// src/components/BookList.tsx
import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

type PdfRef = { uri: string; name: string };
type Props = { pdfs: PdfRef[] };

export default function BookList({ pdfs }: Props) {
  return (
    <FlatList
      style={{ alignSelf: "stretch" }}
      data={pdfs}
      keyExtractor={(_, i) => String(i)}
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      renderItem={({ item }) => (
        <View style={styles.item}>
          <Text style={styles.title}>{item.name.replace(/\.pdf$/i, '')}</Text>
        </View>
      )}
      ListEmptyComponent={
        <View style={styles.item}>
          <Text>Nenhum PDF selecionado ainda.</Text>
        </View>
      }
    />
  );
}

const styles = StyleSheet.create({
  item: { padding: 15 },
  title: { fontSize: 16, fontWeight: "bold" },
  separator: { height: 1, backgroundColor: "#ddd", marginHorizontal: 10 },
});