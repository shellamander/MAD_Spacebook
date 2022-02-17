import React, { useState, useEffect } from 'react';
import { Button, Image, View, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

export default function ImagePickerExample() {
  const [image, setImage] = useState(null);
  const [token1, setToken] = useState('d57191920ee5a8064700b32f66ce3074');

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);


    if (!result.cancelled) {
      await setImage(result.uri);
      console.log(result.uri, "ME")
      let res = await fetch(result.uri);
      let blob = await res.blob();
    
 
 fetch("http://localhost:3333/api/1.0.0/user/18/photo", {
          method: "POST",
          headers: {
              "Content-Type": "image/png",
              "X-Authorization": token1
          },
          body: blob
      })
      .then((response) => {
          console.log("Picture added", response);
      })
      .catch((err) => {
          console.log(err);
      })
  }
}
//};

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Pick an image from camera roll" onPress={pickImage} />
      {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}
    </View>
  );
  }