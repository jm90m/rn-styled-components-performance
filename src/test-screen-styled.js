import React, { Component } from 'react';
import { ListView } from 'react-native';
import styled from 'styled-components/src/native';
import testData from './test-data';

const Row = styled.View`
  padding-top: 5;
  padding-bottom: 5;
  border-bottom-width: 1;
  border-bottom-color: grey;
`;

const RowText = styled.Text`
`;

const ScrollViewStyled = styled.ScrollView`
  flex: 1;
`;

const ListViewStyled = styled.ListView`
`;

class TestScreenStyled extends Component {
  constructor(props) {
    super(props);
    const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
    this.state = {
      dataSource: ds.cloneWithRows(testData),
    };
  }
  componentWillMount() {
    console.log(`ListView - Rendering ${testData.length} components`);
    console.time('styled');
  }

  componentDidMount() {
    console.timeEnd('styled');
  }

  renderRow(row) {
    return <Row><RowText>{row.name}</RowText></Row>;
  }

  renderListView() {
    return (
      <ListViewStyled
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        enableEmptySections={true}
      />
    );
  }

  renderScrollView() {
    return (
      <ScrollViewStyled>
        {testData.map((row, index) => <Row key={index}><RowText>{row.name}</RowText></Row>)}
      </ScrollViewStyled>
    );
  }

  render() {
    return this.renderListView();
  }
}

export default TestScreenStyled;
