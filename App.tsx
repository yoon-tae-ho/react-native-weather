import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

export default function App() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Hello React Native!!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontSize: 40,
  },
});

// React-Native는 브라우저가 아니다.
// 1. <div></div>는 없다. <View></View>를 사용.
// 2. text를 적을 때는 항상 <Text></Text>를 사용해야 한다.
// 3. 브라우저의 CSS property를 전부 다 사용할 수는 없다. (약 98%)
