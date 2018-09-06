import _ from 'lodash';
import React from 'react';
import { BarChart as RechartBarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from 'recharts';

class BarChart extends React.Component {
  render() {
    const { height, width, data, xDataKey, yDataKeys, yyAxis } = this.props;
    if (_.isEmpty(data) || _.isEmpty(xDataKey) || _.isEmpty(yDataKeys)) {
      return null;
    }
    return (
      <RechartBarChart height={height} width={width} data={data}>
        <XAxis dataKey={xDataKey} />
        <YAxis yAxisId="left" />
        {yyAxis && _.size(yDataKeys) >= 2 && <YAxis yAxisId="right" orientation="right"/>}
        <CartesianGrid strokeDasharray="2"/>
        <Tooltip />
        <Legend />
        {_.map(yDataKeys, (o, i) => {
          return <Bar key={`chart-${i}`}
                  dataKey={o.key}
                  fill={o.color}
                  name={o.label}
                  yAxisId={yyAxis && _.size(yDataKeys) >= 2 && _.size(yDataKeys) - 1 === i ? "right" : "left"}
                  />
        })}
      </RechartBarChart>
    )
  }
}

// BarChart.propTypes = {
//   height: PropTypes.number,
//   width: PropTypes.number,
//   data: PropTypes.arrayOf(PropTypes.object),
//   xDataKey: PropTypes.string,
//   yDataKeys: PropTypes.arrayOf(PropTypes.object),
//   yyAxis: PropTypes.bool,
// }
export default BarChart;
