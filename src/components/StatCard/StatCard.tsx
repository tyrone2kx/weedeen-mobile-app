import React from 'react';
import { ActivityIndicator, View } from 'react-native';
import useTheme from '@wd/utils/theme/useTheme';
import Text from '../Text/Text';

export type StatCardAccent =
  | 'blue'
  | 'green'
  | 'purple'
  | 'orange'
  | 'red'
  | 'gray';

export interface StatCardTrend {
  value: string | number;
  direction?: 'up' | 'down';
}

interface Props {
  title?: string;
  value?: string | number;
  isLoading?: boolean;
  className?: string;
  icon?: React.ReactNode;
  /** Solid brand-blue treatment with white content (the "highlight" card in a pair). */
  filled?: boolean;
  /** @deprecated kept for API compatibility */
  accent?: StatCardAccent;
  /** @deprecated kept for API compatibility */
  trend?: StatCardTrend;
}

const StatCard = ({ title, value, isLoading, className, icon, filled }: Props) => {
  const { theme } = useTheme();

  const surface = filled ? theme.blue.DEFAULT : theme.white.DEFAULT;
  const tileBg = filled ? 'rgba(255,255,255,0.18)' : theme.blue[300];
  const valueColor = filled ? '#FFFFFF' : theme.black[700];
  const labelColor = filled ? 'rgba(255,255,255,0.85)' : theme.gray[500];

  return (
    <View
      className={`rounded-2xl p-4 ${className ?? ''}`}
      style={{
        backgroundColor: surface,
        borderWidth: filled ? 0 : 1,
        borderColor: theme.gray[200],
        shadowColor: filled ? theme.blue.DEFAULT : '#101828',
        shadowOpacity: filled ? 0.25 : 0.06,
        shadowRadius: filled ? 16 : 8,
        shadowOffset: { width: 0, height: filled ? 10 : 3 },
        elevation: filled ? 6 : 2,
        minHeight: 118,
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: 12,
          backgroundColor: tileBg,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>

      <View style={{ marginTop: 14 }}>
        {isLoading ? (
          <ActivityIndicator
            color={filled ? '#fff' : theme.blue.DEFAULT}
            style={{ alignSelf: 'flex-start' }}
          />
        ) : (
          <Text intent="h1" style={{ color: valueColor }} weight="extrabold">
            {value ?? 0}
          </Text>
        )}
        <Text intent="sm" style={{ color: labelColor, marginTop: 2 }} weight="medium">
          {title || '--/--'}
        </Text>
      </View>
    </View>
  );
};

export default StatCard;
