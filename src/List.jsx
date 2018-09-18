import React from 'react'
import {
  Icon,
} from 'antd'

class List extends React.PureComponent {
  render() {
    const { header, data } = this.props
    return (
      <div className="list">
        {header &&
          <div className="list-header">{header}</div>
        }
        <ul>
          {_.map(data, (o, i) => {
            return (
              <li key={`list-${i}`}>
                <div className="icon">
                  {o.icon && <img src={o.icon} />}
                </div>
                <span className="title">{o.title}</span>
                <span className="description">{o.description}</span>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }
}

export default List
