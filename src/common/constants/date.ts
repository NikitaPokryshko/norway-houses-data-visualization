const SEARCH_YEARS: Array<string> = [
  '2009', '2010', '2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018', '2019', '2020', '2021'
]

const SEARCH_QUARTERS: Array<string> = ['K1', 'K2', 'K3', 'K4']

const YEARS_WITH_QUARTERS = SEARCH_YEARS.reduce((acc: Array<string>, year: string) => [...acc, ...SEARCH_QUARTERS.map(quarter => year + quarter)], [])

const YEARS_WITH_QUARTERS_OPTIONS = YEARS_WITH_QUARTERS.map(y => ({
  value: y,
  label: y,
}))

export {
  SEARCH_YEARS,
  SEARCH_QUARTERS,
  YEARS_WITH_QUARTERS,
  YEARS_WITH_QUARTERS_OPTIONS,
}
