import React, {Component} from 'react';
import {
  Platform, 
  StyleSheet, 
  Text, 
  View,
  ActivityIndicator,
  ListView,
  Image
} from 'react-native';

// type Props = {};
export default class App extends Component<Props> {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: null,
    }
  }

  componentDidMount() {
    fetch('http://data.taipei/opendata/datalist/apiAccess?scope=resourceAquire&rid=bf073841-c734-49bf-a97f-3757a6013812')
      .then((response) => response.json())
      .then((jsonData) => {
        var ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2,});
        this.setState({
          dataSource: ds.cloneWithRows(jsonData.result.results),
        });
      })
      .catch((error) => {
        console.error(error);
      });
  }

  ListViewItemSeparator = () => {
    return (
      <View
        style={{
          height: .5,
          width: "100%",
          backgroundColor: "#000",
        }}
      />
    );
  }

  renderRow(rowData) {
    return(
      <View style={{flex:1, flexDirection: 'row'}}>
        <Image 
          style={styles.imageView}
          resizeMode="center"
          source={{uri: 'https://www.google.com.tw/images/branding/googlelogo/1x/googlelogo_color_272x92dp.png'}} />
        <View style={{justifyContent: 'center'}}>
        <Text
          numberOfLines={1}>
          {rowData.ParkName}
        </Text>
        <Text
          numberOfLines={1}>
          {rowData.Name}
          </Text>
          </View>
      </View>
    )
  }

  render() {
    if(!this.state.dataSource) {
      return (
        <View style={{flex: 1, paddingTop: 20}}>
         <ActivityIndicator />
       </View>
      )
    }
    return (
      <View style={styles.container}>
        <ListView
          renderSeparator= {this.ListViewItemSeparator}
          dataSource={this.state.dataSource}
          renderRow={(rowData) => this.renderRow(rowData)}>
        </ListView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    flex: 1,
    margin: 5, 
  },
  imageView: {
    width: 160,
    height: 120,
    margin: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
