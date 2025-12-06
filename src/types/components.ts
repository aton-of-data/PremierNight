import { Film } from './film';

export interface FilmPressHandler {
  onPress: (film: Film) => void;
}

export interface FilmItemProps extends FilmPressHandler {
  film: Film;
}
