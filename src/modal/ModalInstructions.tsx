import React from 'react';
import {
  View,
  Text,
  Modal,
  StyleSheet,
  ModalProps,
  ScrollView,
} from 'react-native';
import Button from '../buttons/Button';
import {useTranslation} from 'react-i18next';
import Ball from 'react-native-vector-icons/SimpleLineIcons';
import Heart from 'react-native-vector-icons/Ionicons';
import Hat from 'react-native-vector-icons/MaterialCommunityIcons';

interface ModalInstructionsProps extends ModalProps {
  visible: boolean;
  onClose: () => void;
}

const ModalInstructions: React.FC<ModalInstructionsProps> = ({
  visible,
  onClose,
}) => {
  const {t} = useTranslation();
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
      statusBarTranslucent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalView}>
          <ScrollView>
            <View style={styles.userInfo}>
              <Text style={styles.text}>{t('text1')}</Text>
              <Text style={styles.text}>
                <Ball name="magic-wand" size={50} style={styles.icon} />
              </Text>
              <Text style={styles.text}>{t('text2')}</Text>
              <Text style={styles.text}>
                <Heart
                  name="heart"
                  size={50}
                  color="#7b4c52"
                  style={styles.icon}
                />
              </Text>
              <Text style={styles.text}>{t('text3')}</Text>
              <Text style={styles.text}>
                <Hat name="wizard-hat" size={50} style={styles.icon} />
              </Text>
            </View>
            <View style={styles.button}>
              <Button
                text="close"
                paddingRight={15}
                paddingLeft={15}
                padding={10}
                color="#836e4b"
                onPress={onClose}
              />
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: '#cec5c0',
    padding: 10,
    width: '90%',
    height: '60%',
    borderRadius: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.8,
    shadowRadius: 2,
    alignItems: 'center',
  },
  icon: {
    textShadowColor: '#526466',
    textShadowOffset: {width: 0, height: 0},
    textShadowRadius: 5,
  },
  iconContainer: {
    flexDirection: 'row',
    alignItems: 'baseline',
    justifyContent: 'center',
    width: 40,
  },
  userInfo: {
    marginTop: 20,
    textAlign: 'center',
  },
  text: {
    fontSize: 20,
    color: '#526466',
    fontFamily: 'antikvarika1',
    textAlign: 'center',
  },
  button: {
    marginTop: 20,
    alignItems: 'center',
  },
});

export default ModalInstructions;
