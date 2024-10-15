import ApexCharts from 'apexcharts'
import React, { useEffect } from 'react'

export default function ReactApexCharts(props: { options: Record<string, any> }) {
  useEffect(() => {
    const chart = new ApexCharts(document.querySelector('#chart'), props.options)
    chart.render()
  }, [])

  return <div id="chart"></div>
}
