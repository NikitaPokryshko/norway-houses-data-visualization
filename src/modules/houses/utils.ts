import { YEARS_WITH_QUARTERS } from "../../common/constants/date";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const parsedChartData = (responseData: any) => {
  return {
    categories: Object.values(responseData.dimension.Tid.category.label),
    label: responseData.label,
    series: [{data: responseData.value}]
  }
}

const getSelectedRange = (from: string, to: string): Array<string> => {
  const fromIndex = YEARS_WITH_QUARTERS.indexOf(from);
  const toIndex = YEARS_WITH_QUARTERS.indexOf(to) + 1;
  return YEARS_WITH_QUARTERS.slice(fromIndex, toIndex);
}

export {
  parsedChartData,
  getSelectedRange
}
