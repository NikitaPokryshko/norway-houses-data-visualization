import * as React from 'react';
import { useRef } from 'react';

import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official'
import HighchartsExporting from 'highcharts/modules/exporting'

if (typeof Highcharts === 'object') {
  HighchartsExporting(Highcharts)
}

const ChartWrapper = (props: HighchartsReact.Props) => {
  const chartComponentRef = useRef<HighchartsReact.RefObject>(null);

  return (
    <HighchartsReact
      highcharts={Highcharts}
      ref={chartComponentRef}
      {...props}
    />
  );
}

export default ChartWrapper
