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

import * as appActions from './actions/app'
import * as tab2Actions from './actions/tab2'

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
    const { width, height, activeTabKey, year, month, actions } = this.props
    return (
      <LocaleProvider locale={jaJP}>
        <Layout>
          <Layout.Content>
            <Tabs activeKey={activeTabKey} onChange={key => actions.changeTab(key)}>
              <Tabs.TabPane tab={<span><Icon type="phone" theme="filled" />入電予測</span>} key="1">
                <Tab1 />
              </Tabs.TabPane>
              <Tabs.TabPane tab={<span><Icon type="calendar" theme="filled" />シフト最適化</span>} key="2">
                <Tab2 />
              </Tabs.TabPane>
            </Tabs>
          </Layout.Content>
          <div className="header-nav">
            <div className="content">
              <span className="item">{`${year}/${month}`}</span>
              <Icon type="caret-down" theme="outlined" className="down-icon" />
              {activeTabKey === "2" &&
                <Icon type="setting" theme="filled" onClick={()=>actions.showSetting()} className="setting-icon" />
              }
            </div>
          </div>
        </Layout>
      </LocaleProvider>
    )
  }
}

const mapStateToProps = state => {
  return {
    width: state.app.width,
    height: state.app.height,
    activeTabKey: state.app.activeTabKey,
    year: state.app.year,
    month: state.app.month,
  }
}

const mapDispatchToProps = dispatch => {
  return {
    actions: bindActionCreators(Object.assign({}, appActions, tab2Actions), dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
