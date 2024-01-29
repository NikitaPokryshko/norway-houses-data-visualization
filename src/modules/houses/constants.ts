const HOUSE_TYPE_OPTIONS = [
  {
    value: '00',
    label: 'Boliger i alt',
  },
  {
    value: '02',
    label: 'Småhus',
  },
  {
    value: '03',
    label: 'Blokkleiligheter'
  }
];

const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar'
};

const CHART_TYPE_OPTIONS = [
  {
    value: CHART_TYPES.LINE,
    label: 'Line',
  },
  {
    value: CHART_TYPES.BAR,
    label: 'Bar',
  },
];


// const CHART_OPTIONS: Highcharts.Options = {
const CHART_OPTIONS = {
  chart: {
    type: CHART_TYPES.LINE,
  },
  yAxis: [
    {
      title: {
        text: 'Price'
      }
    }
  ],
  series: [{
    name: 'Norway statistics on the average price per square meter',
  }],
}

export {
  CHART_OPTIONS,
  CHART_TYPE_OPTIONS,
  CHART_TYPES,
  HOUSE_TYPE_OPTIONS
}
