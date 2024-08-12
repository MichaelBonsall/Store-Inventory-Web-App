import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, Linking } from 'react-native';
import { Text, View } from '@/components/Themed';
import AntDesign from '@expo/vector-icons/AntDesign';

export default function ModalScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Made by Michael Bonsall</Text>
      <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)" />
      <Text style={styles.text} 
        onPress={() => Linking.openURL('https://github.com/MichaelBonsall')}>
        <AntDesign name="github" size={24} color="black" /> https://github.com/MichaelBonsall
      </Text>
      <Text style={styles.text} 
        onPress={() => Linking.openURL('https://www.linkedin.com/in/michael-bonsall/')}>
        <AntDesign name="linkedin-square" size={24} color="#0072b1" /> https://www.linkedin.com/in/michael-bonsall/
      </Text>

      {/* Use a light status bar on iOS to account for the black space above the modal */}
      <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  text: {
    fontSize: 16
  }
});
