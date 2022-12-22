import {
  ActivityIndicator,
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";

const API_KEY = "095037fa1f35ee79edfa8cb86207ad4d";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "tomato",
  },
  city: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  cityName: {
    fontSize: 40,
    fontWeight: "700",
  },
  weather: {},
  day: {
    width: SCREEN_WIDTH,
    alignItems: "center",
  },
  temperature: {
    fontSize: 156,
    marginTop: 70,
  },
  weatherMain: {
    fontSize: 54,
    fontWeight: "500",
  },
  weatherDescription: {
    fontSize: 20,
  },
});

interface IDay {
  dt: number;
  sunrise: number;
  sunset: number;
  temp: {
    day: number;
    min: number;
    max: number;
    night: number;
    eve: number;
    morn: number;
  };
  feels_like: {
    day: number;
    night: number;
    eve: number;
    morn: number;
  };
  pressure: number;
  humidity: number;
  weather: {
    id: number;
    main: string;
    description: string;
    icon: string;
  }[];
  speed: number;
  deg: number;
  gust: number;
  clouds: number;
  pop: number;
  rain: number;
}

export default function App() {
  const [region, setRegion] = useState<string | null>(null);
  const [isOk, setIsOk] = useState<boolean>(false);
  const [days, setDays] = useState<IDay[] | null>(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") return setIsOk(false);

      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync();
      const location = await Location.reverseGeocodeAsync(
        { latitude, longitude },
        { useGoogleMaps: false }
      );
      setRegion(location[0].region);

      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=${7}&appid=${API_KEY}&units=metric&mode=json`
        );
        const data = await response.json();
        const list = data.list as IDay[];
        setDays(list);
        console.log(list);
      } catch (error) {
        console.error(error);
      }
    })();
  }, []);

  return (
    // Weather App
    <View style={styles.container}>
      {/* City */}
      <View style={styles.city}>
        <Text style={styles.cityName}>Seoul</Text>
      </View>
      {/* Information */}
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.weather}
      >
        {!days ? (
          <View style={styles.day}>
            <ActivityIndicator size="large" />
          </View>
        ) : (
          days.map((day) => (
            <View key={day.dt} style={styles.day}>
              {/* Temperature */}
              <Text style={styles.temperature}>{day.temp.day.toFixed(1)}</Text>
              {/* Description */}
              <Text style={styles.weatherMain}>{day.weather[0].main}</Text>
              <Text style={styles.weatherDescription}>
                {day.weather[0].description}
              </Text>
            </View>
          ))
        )}
      </ScrollView>
    </View>
  );
}
