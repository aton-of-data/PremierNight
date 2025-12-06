import React from 'react';
import { Button } from '../../atoms';

interface WatchlistButtonProps {
  isInWatchlist: boolean;
  onPress: () => void;
  loading?: boolean;
}

/**
 * Watchlist button component.
 *
 * @param isInWatchlist - Whether the film is in the watchlist.
 * @param onPress - The function to call when the button is pressed.
 * @param loading - Whether the button is loading.
 * @returns The watchlist button component.
 *
 * @example
 * <WatchlistButton isInWatchlist={true} onPress={() => {}} loading={false} />
 */
export const WatchlistButton: React.FC<WatchlistButtonProps> = ({
  isInWatchlist,
  onPress,
  loading = false,
}) => {
  return (
    <Button
      variant={isInWatchlist ? 'primary' : 'secondary'}
      size="medium"
      onPress={onPress}
      loading={loading}
    >
      {isInWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
    </Button>
  );
};
