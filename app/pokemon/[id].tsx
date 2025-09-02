import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function pokemon () {
    const params = useLocalSearchParams()
    return <View>
        <Text>Pokemmon {params.id}</Text>
    </View>
}