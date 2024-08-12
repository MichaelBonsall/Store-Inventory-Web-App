import { useState, useEffect } from 'react';
import { View, Image, Text, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

export const fetchImage = async (filename: string): Promise<string | undefined> => {
  try {
    const response = await fetch(`http://localhost:5000/images/${filename}`);
    
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const blob = await response.blob();
    const imageUrl = URL.createObjectURL(blob);
    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    return undefined;
  }
};

interface ImageComponentProps {
  filename: string;
  imageStyle?: ImageStyle;
}

export const ImageComponent: React.FC<ImageComponentProps> = ({ filename, imageStyle}) => {
  const [imageUrl, setImageUrl] = useState<string | undefined>(undefined);

  useEffect(() => {
    const loadImage = async () => {
      const url = await fetchImage(filename);
      if (url == null) {
        setImageUrl('../assets/images/image-not-found.jpg');
      } else {
        setImageUrl(url);
      }
    };

    loadImage();
  }, [filename]);

  return (
    <View style={[styles.container,]}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={[styles.image, imageStyle]} />
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    image: {
        width: 50,
        height: 100,
    },
});