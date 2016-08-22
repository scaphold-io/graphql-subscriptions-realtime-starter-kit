import React from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import {Row, Col} from 'react-bootstrap';
let LineChart = require("react-chartjs").Line;

class Dashboard extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      totalUsers: 0,
      totalMessages: 0,
      oldUser: {},
      oldMessage: {},
      userMapping: [],
      messageMapping: [],
      countryCount: []
    }
    this.getUserMapping = this.getUserMapping.bind(this);
    this.getMessageMapping = this.getMessageMapping.bind(this);
    this.addToCountry = this.addToCountry.bind(this);
  }

  componentWillReceiveProps(props) {
    setTimeout(() => {
      if (this.state.userMapping.length && props.newUser.id && this.state.oldUser !== props.newUser) {
        // Update when new user comes in
        this.state.totalUsers++;
        this.setState({
          userMapping: this.addNewUser(this.state.userMapping),
          totalUsers: this.state.totalUsers,
          countryCount: this.addToCountry(this.state.countryCount),
          oldUser: this.props.newUser
        });
      }
      if (props.newMessage.id && this.state.oldMessage !== props.newMessage) {
        // Update when new message comes in
        this.state.totalMessages++;
        this.setState({
          messageMapping: this.addNewMessage(this.state.messageMapping),
          totalMessages: this.state.totalMessages,
          oldMessage: this.props.newMessage
        });
      }
      if (props.data.viewer && this.state.totalUsers == 0 && this.state.totalMessages == 0) {
        // Initialize states
        this.setState({
          totalUsers: this.props.data.viewer.allUsers.totalCount[0].reduction,
          totalMessages: this.props.data.viewer.allMessages.totalCount[0].reduction,
          countryCount: this.props.data.viewer.allUsers.countryCount,
          userMapping: this.getUserMapping(),
          messageMapping: this.getMessageMapping()
        });
      }
    }, this.props.wait);
  }

  getUserMapping() {
    let userMapping = [];
    if (this.props.data.viewer) {
      let j;
      if (!this.props.data.viewer.allUsers.groupedHourly[0].group) { j = 2; } else { j = 1; }
      for (let i = 0; i < 24; i++) {
        let grouping = this.props.data.viewer.allUsers.groupedHourly[j-1];
        let num;
        if (grouping && grouping.group != i) {
          num = 0;
        } else if (grouping) {
          num = grouping.reduction;
          j++;
        }
        let newObj = {hour: i, num: num || 0};
        userMapping.push(newObj);
      }
    }
    return userMapping;
  }

  addNewUser(userMapping) {
    let hour = this.props.newUser.createdAtHour;
    userMapping[hour].num++;
    return userMapping;
  }

  getMessageMapping() {
    let messageMapping = [];
    if (this.props.data.viewer) {
      let j;
      if (!this.props.data.viewer.allMessages.groupedHourly[0].group) { j = 2 } else { j = 1 }
      for (let i = 0; i < 24; i++) {
        let grouping = this.props.data.viewer.allMessages.groupedHourly[j-1];
        let num;
        if (grouping && grouping.group != i) {
          num = 0;
        } else if (grouping) {
          num = grouping.reduction;
          j++;
        }
        let newObj = {hour: i, num: num || 0};
        messageMapping.push(newObj);
      }
    }
    return messageMapping;
  }

  addNewMessage(messageMapping) {
    let hour = this.props.newMessage.createdAtHour;
    messageMapping[hour].num++;
    return messageMapping;
  }

  addToCountry(countryCount) {
    let country = this.props.newUser.country;
    countryCount.forEach(countryGroup => {
      if (countryGroup.group == country) {
        countryGroup.reduction++;
      }
    });
    return countryCount;
  }

  render() {

    let userChartData = {
      labels: this.state.userMapping.map(item => { return item.hour }),
      datasets: [
        {
          fillColor: "rgba(151,187,205,0.2)",
          strokeColor: "#1daaa0",
          pointColor: "#1daaa0",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#1daaa0",
          data: this.state.userMapping.map(item => { return item.num })
        }
      ]
    };
    let messageChartData = {
      labels: this.state.messageMapping.map(item => { return item.hour }),
      datasets: [
        {
          fillColor: "rgba(220,220,220,0.2)",
          strokeColor: "#1daaa0",
          pointColor: "#1daaa0",
          pointStrokeColor: "#fff",
          pointHighlightFill: "#fff",
          pointHighlightStroke: "#1daaa0",
          data: this.state.messageMapping.map(item => { return item.num })
        }
      ]
    };
    let chartOptions = {};

    let countryComponent = <div>Count by Country: 0</div>
    if (this.props.data.viewer) {
      countryComponent = <div>Count by Country: {this.state.countryCount.map((item, i) => {
        return <div key={i}>{item.group ? item.group : 'Other'} - {item.reduction}</div>
      })}</div>
    }

    return (
      <div>
        <h3>Chat Dashboard</h3>

        <div>
          <Row style={styles.numbersRow}>
            <Col sm={4}>
              <div style={styles.numbersRow.numbers}>{this.props.data.viewer ? this.state.totalUsers : '0'}</div>
              <div>Total Users</div>
            </Col>
            <Col sm={4}>
              <div style={styles.numbersRow.numbers}>{this.props.data.viewer ? this.state.totalMessages : '0'}</div>
              <div>Total Messages</div>
            </Col>
            <Col sm={4}>
              {countryComponent}
            </Col>
          </Row>

          <hr/>

          <div>
            <h4 style={styles.graph}>Users vs. Hour of the Day (UTC)</h4>
            <LineChart data={userChartData} options={chartOptions} height="300%" width="650%" />

            <h4 style={styles.graph}>Messages vs. Hour of the Day (UTC)</h4>
            <LineChart data={messageChartData} options={chartOptions} height="300%" width="650%" />
          </div>

        </div>

      </div>
    );
  }
}

Dashboard.propTypes = {
  data: React.PropTypes.object
}

const GET_ALL_DATA = gql `
  query {
    viewer {
      allUsers {
        totalCount: count {
          reduction
        }
        countryCount: count (groupBy: "country") {
          group
          reduction
        }
        groupedHourly: count (groupBy: "createdAtHour") {
          group
          reduction
        }
      }
      allMessages {
        totalCount: count {
          reduction
        }
        groupedHourly: count (groupBy: "createdAtHour") {
          group
          reduction
        }
      }
    }
  }
`

const componentWithAllData = graphql(GET_ALL_DATA);

export default componentWithAllData(Dashboard);

const styles = {
  numbersRow: {
    margin: `20px 20px`,
    textAlign: `center`,
    numbers: {
      fontSize: `30px`
    }
  },
  graph: {
    marginTop: '40px'
  }
};
