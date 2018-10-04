import React from 'react'
import { Icon } from 'antd'

import t from './i18n'

class Header extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { activeKey, year, month, children } = this.props
    return (
      activeKey !== nextProps.activeKey ||
      year !== nextProps.year ||
      month !== nextProps.month ||
      children !== nextProps.children
    )
  }
  render() {
    const { activeKey, year, month, onChange, onClickSetting } = this.props
    return (
      <header className="header slideDown">
        <span className="title">{t("header.date", {year, month})}</span>
        <div className={`menu-button ${activeKey == 1 ? 'active':''}`} onClick={e => {
          if (activeKey != 1) {
            onChange(1)
          }}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
            <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2zm13.54-7.1l-.71-.7L13 9.29V5h-1v6h6v-1h-4.15z"/>
            <path fill="none" d="M0 0h24v24H0z"/>
          </svg>
          <span>{t("header.predict")}</span>
        </div>
        <div className={`menu-button ${activeKey == 2 ? 'active':''}`} onClick={e => {
          if (activeKey != 2) {
            onChange(2)
          }}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22px" height="22px" viewBox="0 0 24 24">
            <path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
            <path d="M0 0h24v24H0z" fill="none"/>
            <path d="M12.5 7H11v6l5.25 3.15.75-1.23-4.5-2.67z"/>
          </svg>
          <span>{t("header.optimization")}</span>
        </div>
        {this.props.children}
        <Icon type="setting" theme="filled" onClick={()=> onClickSetting()} className="setting-icon" />
      </header>
    )
  }
}

export default Header
