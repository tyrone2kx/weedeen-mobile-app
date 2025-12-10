import { Theme } from '@wd/utils/Theme';
import React from 'react';
import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native';

interface IProps {
  name: string;
  cardNumber: string;
  expiration: string;
}

const CreditCard = ({ name, cardNumber, expiration }: IProps) => {
  return (
    <View style={styles.cardContainer}>
      {/* Card Background Image */}
      <ImageBackground
        source={require('@assets/images/atm_card_background.png')}
        style={styles.cardBackground}
      >
        <View style={styles.card_wrapper}>
          {/* Card Holder Name */}
          <Text style={styles.cardHolderName}>{name}</Text>
          <Text style={styles.cardNumber}>{cardNumber}</Text>

          {/* Card Expiration Date */}
          <View style={styles.cardExpirationContainer}>
            <Text style={styles.cardExpiration}>{expiration}</Text>
            <Image
              source={require('@assets/images/master_card_icon.png')}
              style={styles.mastercard_image}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default CreditCard;

const styles = StyleSheet.create({
  cardContainer: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    overflow: 'hidden',
    alignItems: 'center',
  },
  cardBackground: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  card_wrapper: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  cardHolderName: {
    fontSize: 14,
    fontStyle: 'italic',
    fontWeight: 'bold',
    color: Theme.colors.black[600],
  },
  cardNumber: {
    fontSize: 30,
    color: Theme.colors.black[600],
  },
  cardExpirationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardExpiration: {
    fontSize: 12,
    color: Theme.colors.black[600],
  },
  mastercard_image: {
    width: 50,
    height: 50,
    resizeMode: 'contain',
  },
});
