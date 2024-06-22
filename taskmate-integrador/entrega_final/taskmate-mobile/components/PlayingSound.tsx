import React, { useEffect, useState, useRef } from 'react';
import { View, StyleSheet, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome6 } from '@expo/vector-icons';
import { Image } from '@rneui/themed';
import { Text, Stack } from 'native-base';

const initialAudiosMP3 = [
  'https://onlinetestcase.com/wp-content/uploads/2023/06/500-KB-MP3.mp3',
  'https://onlinetestcase.com/wp-content/uploads/2023/06/500-KB-MP3.mp3',
];

export default function AudioComponent() {
  const [sounds, setSounds] = useState<{ [key: number]: Audio.Sound }>({});
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState<number | null>(null);
  const [audiosMP3, setAudiosMP3] = useState<string[]>(initialAudiosMP3);
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const animation = useRef(new Animated.Value(1)).current;

  async function loadSound(uri: string, index: number) {
    setIsLoading(index);
    try {
      if (activeIndex !== null && sounds[activeIndex]) {
        await sounds[activeIndex].unloadAsync();
      }

      const { sound } = await Audio.Sound.createAsync({ uri });
      setSounds((prevSounds) => ({ ...prevSounds, [index]: sound }));
      setActiveIndex(index);
      await sound.playAsync();

    } catch (error) {
      console.error('Error loading sound:', error);
    } finally {
      setIsLoading(null);
    }
  }

  async function pauseSound(index: number) {
    if (sounds[index]) {
      await sounds[index].pauseAsync();
      setActiveIndex(null);
    }
  }

  useEffect(() => {
    return () => {
      Object.values(sounds).forEach((sound) => sound.unloadAsync());
    };
  }, [sounds]);


  const startRecording = async () => {
    try {
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      }); 

      const recording = new Audio.Recording();
      await recording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await recording.startAsync();
      setRecording(recording);
    } catch (error) {
      console.error('Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {
    try {
      if (recording) {
        await recording.stopAndUnloadAsync();
        const uri = recording.getURI();
        if (uri) {
          setAudiosMP3((prevAudios) => [...prevAudios, uri]);
        }
      }
    } catch (error) {
      console.error('Failed to stop recording:', error);
    } finally {
      setRecording(null);
    }
  };

  return (
    <View style={styles.mainContainer}>
      {audiosMP3.map((url, i) => (
        <View key={i} style={styles.container}>
          <Image
            resizeMode='cover'
            source={{ uri: 'https://stereo-images.stereocdn.com/user-avatars/1610429173/orig.webp?1625274112' }}
            containerStyle={styles.wrapperDescriptionAvatar}
            PlaceholderContent={<ActivityIndicator />}
          />
          <Stack style={{ flex: 1 }}>
            {isLoading === i ? (
              <ActivityIndicator size="small" color="#0000ff" />
            ) : (
              <View style={styles.audioControl}>
                <TouchableOpacity onPress={activeIndex === i ? () => pauseSound(i) : () => loadSound(url, i)} accessible={true} accessibilityLabel={activeIndex === i ? "Pause" : "Play"}>
                  <FontAwesome6 name={activeIndex === i ? "pause" : "play"} size={24} color="black" />
                </TouchableOpacity>
                <Animated.View style={[styles.audioVisualizer, { height: activeIndex === i ? animation : 1 }]} />
              </View>
            )}
          </Stack>
          <Text italic fontSize={"xs"} style={styles.timestamp}>Hace 3 dias</Text>
        </View>
      ))}

      <TouchableOpacity onPress={recording ? stopRecording : startRecording} style={styles.recordButton}>
        <FontAwesome6 name="microphone" size={24} color={recording ? "red" : "black"} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    alignItems: 'center',
  },
  container: {
    backgroundColor: 'white',
    borderColor: "gray",
    borderWidth: 1,
    padding: 10,
    width: "100%",
    maxWidth: 300,
    borderRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 10,
  },
  wrapperDescriptionAvatar: {
    width: 30,
    height: 30,
    borderRadius: 50,
    backgroundColor: "white",
  },
  audioControl: {
    width: '100%',
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  audioVisualizer: {
    width: 2,
    backgroundColor: 'green',
    marginLeft: 10,
  },
  timestamp: {
    position: "absolute",
    right: 10,
    top: 0,
  },
  recordButton: {
    marginTop: 20,
    alignItems: 'center',
  },
});
