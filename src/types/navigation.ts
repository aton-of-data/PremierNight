import { NavigatorScreenParams } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

export type RootStackParamList = {
  HomeTabs: NavigatorScreenParams<HomeTabParamList>;
  FilmDetail: { filmId: number };
};

export type HomeTabParamList = {
  Home: undefined;
  Watchlist: undefined;
};

export type RootStackNavigationProp =
  NativeStackNavigationProp<RootStackParamList>;
export type HomeTabNavigationProp = NativeStackNavigationProp<HomeTabParamList>;

export type SpotlightHomeScreenNavigationProp = RootStackNavigationProp;
export type WatchlistScreenNavigationProp = RootStackNavigationProp;
export type FilmDetailScreenProps = NativeStackScreenProps<
  RootStackParamList,
  'FilmDetail'
>;

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
