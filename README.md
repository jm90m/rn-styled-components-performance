# rn-styled-components-performance
Testing performance styled-components vs inline styles in React Native

# To run this project
* `npm install`
* and open with expo

From this blog post: [https://codeburst.io/a-quick-performance-comparison-of-styled-components-vs-inline-styles-in-react-native-e07adffd14cb](https://codeburst.io/a-quick-performance-comparison-of-styled-components-vs-inline-styles-in-react-native-e07adffd14cb)
# A Quick Performance Comparison of Styled-Components vs Inline Styles in React Native

I have often wondered what the performance differences were between
styled-components and inline styles when it comes to React Native. Here, I’ll be
comparing the two with several test cases. I will be using 2 different versions
of styled-components for my test, one version being the latest release and the
other version coming from the master branch
([https://github.com/styled-components/styled-components](https://github.com/styled-components/styled-components)).
Since [Max Stoiber](https://medium.com/@mxstbr), had informed me that they had
done some performance optimizations on master.

The first test case I have includes a ScrollView that will render 10,000
elements. We use ScrollView rather than ListView since ListView is optimized for
big data sets, and it doesn’t render all the data at once. <br> While ScrollView
renders all its react child components at once.

I created 2 different screens that each housed a ListView and ScrollView, with
child components created using styled-components and inline styles.

Here’s , this is the screen that has inline styles. It contains both a
renderListView & renderScrollView functions (swapping them out when I test,
rather than creating a different screen)

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
        const ds = new ListView.
    ({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          dataSource: ds.cloneWithRows(testData),
        };
      }

      componentWillMount() {
        
    .log(`ListView - Rendering ${testData.length} components`);
        
    .time('inline');
      }

      componentDidMount() {
        
    .timeEnd('inline');
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
        return this.renderListView();
      }
    }
    export default TestScreen;

Here’s , and it includes all components even the ListView and ScrollView
initialized with styled-components.

    import React, { Component } from 'react';
    import { ListView } from 'react-native';
    import styled from 'styled-components/native';
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
        const ds = new ListView.
    ({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.state = {
          dataSource: ds.cloneWithRows(testData),
        };
      }
      componentWillMount() {
        
    .log(`ListView - Rendering ${testData.length} components`);
        
    .time('styled');
      }

      componentDidMount() {
        
    .timeEnd('styled');
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

### Performance Results

![Performance Results](https://cdn-images-1.medium.com/max/1000/1*_btyJwRSwfGZOjerxfCJ_g.png)

The current version of styled-components performed way better than the latest
release version. There is about a 1–2 second performance difference in
styled-components latest release version vs master in the ScrollView tests. I
only tested the time it took from componentWillMount to componentDidMount, for
rendering components in both ListView and ScrollView. When it comes to rendering
smaller amount of components (1000 and under) in a ScrollView or using the
ListView for rendering any amount of components, then the difference is
negligible between styled-components and inline styles.

When you’re rendering large amounts of components in a list, you would want to
use a ListView rather than a ScrollView, since ScrollView just loads everything
at once. So you would never really use a ScrollView to render a large set of
components. The time difference between rendering components in a ListView in
styled-components versus inline styles, is fairly small for all different
amounts of components rendered. Even when it comes to rendering large amounts of
components in the ScrollView, the latest version on master for styled-components
comes fairly close to inline styles.

### Conclusion

Styled-components is coming closer and closer to being as fast as inline styles.
I recommend everyone to give it a try in their project, it’s pretty rare if ever
that you’ll actually render large amounts of components in a ScrollView. The
ListView performance for styled-components is almost the same to the performance
of inline styles even for extremely large component sets. The amount of context
and readability that styled-components provides to your components and screens
is well worth the small performance costs (if any) in many instances. I have no
doubt in my mind as future updates to styled-components happen, we will start to
see the performance gap become even smaller.



