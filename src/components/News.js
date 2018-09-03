import React from 'react';
import {
  View,
  ScrollView,
  Image,
  Text,
  Dimensions,
  Linking
} from 'react-native';
import { Button } from 'react-native-elements';

class News extends React.Component {
  constructor(props) {
    super(props);
    this.state = { pictureSize: null };
    this.loadPictureSize();
  }

  async loadPictureSize() {
    const picture = this.props.data.picture;
    if (!picture) return;
    
    const { height, width } = Dimensions.get('window');
    Image.getSize(picture, (w, h) => {
      const ratio = h / w;
      this.setState({ pictureSize: { w: width, h: width * ratio } });
    });
  }

  render() {
    const {
      picture,
      title,
      message,
      link,
      linkText,
      link2,
      link2Text,
      link3,
      link3Text
    } = this.props.data;
    const { pictureSize } = this.state;

    const links = [
      { link: link, text: linkText },
      { link: link2, text: link2Text },
      { link: link3, text: link3Text }
    ]
      .filter(l => l.link)
      .map(l => (
        <Button
          borderRadius={15}
          backgroundColor="#FF9800"
          icon={l.link.startsWith('tel:') ? {name: 'phone'} : {}}
          key={l.link}
          containerViewStyle={{ margin: 15 }}
          onPress={() => Linking.openURL(l.link)}
          title={l.text || 'এখানে প্রেস করুন'}
        />
      ));

    return (
      <ScrollView style={{ flex: 1, backgroundColor: 'white' }}>
        {pictureSize && (
          <Image
            style={{ width: pictureSize.w, height: pictureSize.h }}
            source={{ uri: picture }}
          />
        )}
        <View style={{ margin: 20 }}>
          <Text
            style={{
              fontSize: 26,
              color: '#43484d',
              marginBottom: 20
            }}>
            {title}
          </Text>
          <Text
            style={{
              color: '#5e6977',
              marginBottom: 30
            }}>
            {message}
          </Text>
          {links}
        </View>
      </ScrollView>
    );
  }
}
export default News;
