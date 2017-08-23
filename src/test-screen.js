import React, { Component } from 'react';
import { ListView, ScrollView, StyleSheet, View, Text } from 'react-native';
import testData from './test-data';

const styles = StyleSheet.create({
  row: {
    paddingTop: 5,
    paddingBottom: 5,
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
  },
  scrollView: {
    flex: 1,
  },
});

class TestScreen extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(testData),
    };
  }

  componentWillMount() {
    console.log(`ScrollView - Rendering ${testData.length} components`);
    console.time('inline');
  }

  componentDidMount() {
    console.timeEnd('inline');
  }

  renderRow(row) {
    return <View style={styles.row}><Text>{row.name}</Text></View>;
  }

  renderListView() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }

  renderScrollView() {
    return (
      <ScrollView style={styles.scrollView}>
        {testData.map((row, index) => (
          <View style={styles.row} key={index}><Text>{row.name}</Text></View>
        ))}
      </ScrollView>
    );
  }

  render() {
    return this.renderScrollView();
  }
}
export default TestScreen;
