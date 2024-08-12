import { Link, Stack } from 'expo-router';
import { StyleSheet, Image } from 'react-native';
import { Text, View } from '@/components/Themed';

export default function NotFoundScreen() {
  return (
    <>
      <Stack.Screen options={{ title: 'Whoops!' }} />
      <View style={styles.container}>
        <Text style={styles.title}>We don't know how you got here...</Text>
        <Image source={require('../assets/images/bruh.jpg')} />
        <Link href="/" style={styles.link}>
          <Text style={styles.linkText}>Click here to go to the home page.</Text>
        </Link>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 24,
    color: '#2e78b7',
  },
});
