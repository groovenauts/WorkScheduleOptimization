import React from 'react'
import _ from 'lodash'
import moment from 'moment'
import {
  Icon,
  Avatar,
  Drawer,
} from 'antd'

import { getColor } from './utils'
import Calendar from './Calendar'

class Profile extends React.Component {
  render() {
    const {
      first_name,
      last_name,
      name_yomi,
      gender,
      birthday,
      phone,
      email,
      width,
      visible,
      schedules,
      onClose,
    } = this.props
    return (
      <Drawer
        width={width || 460}
        placement="right"
        style={{padding: 0}}
        className="profile"
        closable={false}
        onClose={onClose}
        visible={visible}
        >
        <div className="profile-header">
          <div className="profile-image">
            <Avatar style={{ color: '#fff', backgroundColor: getColor(gender) }} size={64} icon={'user'} />
          </div>
          <div className="profile-detail">
            <div className="name">
              <h1>{`${first_name} ${last_name}`}</h1>
              <p>{name_yomi}</p>
            </div>
            <div className="details">
              <span className="phone"><Icon type="phone" theme="filled" style={{marginRight: 4}}/>{phone}</span>
              <span className="mail"><Icon type="mail" theme="filled" style={{marginRight: 4}}/>{email}</span>
            </div>
          </div>
        </div>
        <div className="profile-content">
          <div className="calendar">
          <Calendar
            onRenderCell={(eventId, start, end) => {
              if (moment.isMoment(start) && moment.isMoment(end)) {
                return (
                  <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                    <span style={{textAlign: 'center'}}>{start.utc().format('HH:MM')}</span>
                    <span style={{textAlign: 'center'}}>|</span>
                    <span style={{textAlign: 'center'}}>{end.utc().format('HH:MM')}</span>
                  </div>
                )
              } else {
                return null
              }
            }}
            schedules={schedules} />
          </div>
        </div>
      </Drawer>
    )
  }
}

export default Profile
