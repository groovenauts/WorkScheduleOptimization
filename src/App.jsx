import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'
import {
  LocaleProvider,
  Layout,
  Tabs,
  Icon,
  Select,
} from 'antd';
import jaJP from 'antd/lib/locale-provider/ja_JP';
import enUS from 'antd/lib/locale-provider/en_US';

import './styles/index.scss'
import './styles/index.less'

import Tab1 from './Tab1'
import Tab2 from './Tab2'

import * as actions from './actions/app'

class App extends React.Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.onWindowResize()
    window.addEventListener('resize', this.onWindowResize.bind(this))
  }
  componentWillUnmount() {
    window.removeEventListener('resize', this.onWindowResize.bind(this));
  }
  onWindowResize() {
    this.props.actions.resizeWindow(
      document.body.clientWidth,
      document.body.clientHeight
    );
  }
  render() {
    const { width, height, activeTabKey, year, month } = this.props
    return (
      <LocaleProvider locale={jaJP}>
        <Layout>
          <Layout.Content>
            <Tabs
              defaultActiveKey="2"
              tabBarExtraContent={<span style={{marginRight: 20, fontStyle: 'italic'}}>{`${year}/${month}`}</span>}>
              <Tabs.TabPane tab={<span><Icon type="phone" theme="filled" />入電予測</span>} key="1">
                <Tab1 />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><Icon type="calendar" theme="filled" />シフト最適化</span>} key="2">
                <Tab2 />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>
        </Layout>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.app.width,
    height: state.app.height,
    year: state.app.year,
    month: state.app.month,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(actions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
