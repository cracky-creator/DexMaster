import { Card } from "@/components/Card";
import { PokemonCard } from "@/components/pokemon/pokemonCard";
import { Row } from "@/components/Row";
import { SearchBar } from "@/components/SearchBar";
import { ThemedText } from "@/components/ThemedText";
import { getPokemonId } from "@/functions/pokemon";
import { usefetchQuery, useInfiniteFetchQuery } from "@/hooks/useFetchQuery";
import { usePokemonNames } from "@/hooks/usePokemonNames";
import { useThemeColors } from "@/hooks/useThemeColors";
import { Link } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, FlatList, Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Index() {
  const colors = useThemeColors();
  const {data, isFetching, fetchNextPage} = useInfiniteFetchQuery('/pokemon?limit=21');
  const [search, setSearch] = useState('');
  const pokemons = data?.pages.flatMap(page => page.results) ?? [];
  const pokemonsFR = usePokemonNames(pokemons);
  const filteredPokemons = search ? pokemonsFR.filter(p => p.nameFR.toLowerCase().includes(search.toLowerCase()) || p.id.toString() === search) : pokemonsFR;

  return (
    <SafeAreaView style={[styles.container, {backgroundColor: colors.tint}]}>
      <Row style={styles.header} gap={16}>
        <Image source={require("@/assets/images/pokeball.png")} style={{width: 24, height: 24}}/>
        <ThemedText variant="headline" color="grayWhite">Pokédex</ThemedText>
      </Row>
      <Row>
        <SearchBar value={search} onChange={setSearch}/>
      </Row>
      <Card style={styles.body}>
        <FlatList 
          data={filteredPokemons} 
          numColumns={3}
          contentContainerStyle={[styles.gridGap, styles.list]}
          columnWrapperStyle={styles.gridGap}
          ListFooterComponent={
            isFetching ? <ActivityIndicator color={colors.tint}/> : null
          }
          onEndReached={() => fetchNextPage()}
          renderItem={({item}) => <PokemonCard id={item.id} name={item.nameFR} style={{flex: 1/3,}}/>} keyExtractor={(item) => item.id.toString()} />
      </Card>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
  },
  header: {
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  body: {
    flex: 1,
    marginTop: 16
  },
  gridGap: {
    gap: 8,
  },
  list: {
    padding: 12,
  },
})
