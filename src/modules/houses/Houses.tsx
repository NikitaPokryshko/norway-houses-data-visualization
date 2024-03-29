import type { NextPage } from 'next'
import { useEffect, useMemo, useState, useCallback } from 'react'
import { useRouter } from 'next/router'
import { fetchPrices } from './api'
import { YEARS_WITH_QUARTERS_OPTIONS } from '../../common/constants/date'
import {
  CHART_OPTIONS,
  CHART_TYPE_OPTIONS,
  HOUSE_TYPE_OPTIONS,
} from './constants'

import { getSelectedRange, parsedChartData } from './utils'

import Select from '../../common/components/Select'
import QuarterRange from '../../common/components/QuarterRange'
import ChartWrapper from '../../common/components/ChartWrapper'
import useStorage from '../../common/hooks/useStorage'

const Houses: NextPage = () => {
  const router = useRouter()
  const { setItem } = useStorage()

  const [crtOptions, setCrtOptions] = useState(CHART_OPTIONS)

  const [state, setState] = useState({
    houseType: HOUSE_TYPE_OPTIONS[0].value,
    chartType: CHART_TYPE_OPTIONS[0].value,
    from: YEARS_WITH_QUARTERS_OPTIONS[0].value,
    to: YEARS_WITH_QUARTERS_OPTIONS[3].value,
  })

  const selectedRange = useMemo(
    () => getSelectedRange(state.from, state.to),
    [state.from, state.to]
  )

  useEffect(() => {
    const handleRouteChange = (url: string) => {
      const urlParams = new URLSearchParams(url.replace('/', ''))

      setState((state) => ({
        ...state,
        houseType: urlParams.get('houseType'),
        from: urlParams.get('from'),
        to: urlParams.get('to'),
      }))
    }

    router.events.on('routeChangeStart', handleRouteChange)

    return () => {
      router.events.off('routeChangeStart', handleRouteChange)
    }
  }, [router.events])

  const updateSeries = ({ label, series, categories }) => {
    setCrtOptions({
      title: {
        text: label,
      },
      xAxis: [
        {
          categories,
        },
      ],
      series,
    })
  }

  const updateStateWithRoute = (key: string, value: string): void => {
    setState((state) => ({ ...state, [key]: value }))
    router.push({ query: { ...router.query, [key]: value } })
    setItem('search', window.location.search, 'local')
  }

  const updateHouseType = (houseType: string): void =>
    updateStateWithRoute('houseType', houseType)
  const updateFrom = (from: string) => updateStateWithRoute('from', from)
  const updateTo = (to: string) => updateStateWithRoute('to', to)

  const updateChartType = (type: string): void => {
    setCrtOptions({ chart: { type } })
    setState((state) => ({ ...state, chartType: type }))
  }

  const fetchData = useCallback(async () => {
    try {
      const data = await fetchPrices({
        houseType: state.houseType,
        selectedRange,
      })
      updateSeries(parsedChartData(data))
    } catch (e) {
      console.error(e)
    }
  }, [state.houseType, selectedRange])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <>
      <div className='flex items-center justify-between py-8'>
        <span className='flex flex-1'>
          <Select
            options={HOUSE_TYPE_OPTIONS}
            value={state.houseType}
            onChange={updateHouseType}
          />

          <QuarterRange
            from={state.from}
            to={state.to}
            options={YEARS_WITH_QUARTERS_OPTIONS}
            handleFromChange={updateFrom}
            handleToChange={updateTo}
          />
        </span>
        <Select
          options={CHART_TYPE_OPTIONS}
          value={state.chartType}
          onChange={updateChartType}
        />
      </div>
      <ChartWrapper options={crtOptions} />
    </>
  )
}

export default Houses
